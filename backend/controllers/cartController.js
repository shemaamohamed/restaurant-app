import userModel from '../models/userModel.js';

const findUser = async (userId, res) => {
    try {
        const user = await userModel.findById(userId);
        if (!user) {
            res.status(404).json({ success: false, message: "User Not Found" });
            return null;
        }
        return user;
    } catch (error) {
        console.error('Error finding user:', error);
        res.status(500).json({ success: false, message: "Internal Server Error" });
        return null;
    }
};

// Add item to cart (POST request)
const addToCart = async (req, res) => {
    const { userId, itemId } = req.body;

    try {
        const user = await findUser(userId, res);
        if (!user) return;

        const cartData = user.cartData || {};

        // Add or update item in cart
        cartData[itemId] = (cartData[itemId] || 0) + 1;

        await userModel.findByIdAndUpdate(userId, { cartData }, { new: true });
        res.status(200).json({ success: true, message: "Added To Cart" });
    } catch (error) {
        console.error('Error adding to cart:', error);
        res.status(500).json({ success: false, message: "Internal Server Error" });
    }
};

// Remove item from cart (DELETE request)
const removeFromCart = async (req, res) => {
    const { userId, itemId } = req.body;

    try {
        const user = await findUser(userId, res);
        if (!user) return;

        const cartData = user.cartData || {};

        // Check if item is in the cart
        if (cartData[itemId]) {
            cartData[itemId] = Math.max(cartData[itemId] - 1, 0);

            // Remove item if quantity reaches zero
            if (cartData[itemId] === 0) {
                delete cartData[itemId];
            }

            await userModel.findByIdAndUpdate(userId, { cartData }, { new: true });
            res.status(200).json({ success: true, message: "Removed From Cart" });
        } else {
            res.status(404).json({ success: false, message: "Item Not Found In Cart" });
        }
    } catch (error) {
        console.error('Error removing from cart:', error);
        res.status(500).json({ success: false, message: "Internal Server Error" });
    }
};

// Get cart data (GET request)
const getCart = async (req, res) => {
    const { userId } = req.body;

    try {
        const user = await findUser(userId, res);
        if (!user) return;

        res.status(200).json({ success: true, cartData: user.cartData || {} });
    } catch (error) {
        console.error('Error fetching cart:', error);
        res.status(500).json({ success: false, message: "Internal Server Error" });
    }
};

export { addToCart, removeFromCart, getCart };
