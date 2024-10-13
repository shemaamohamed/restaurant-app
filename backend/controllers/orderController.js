import Stripe from 'stripe';
import orderModel from '../models/orderModel.js';
import userModel from '../models/userModel.js';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

// Placing a user order
const placeOrder = async (req, res) => {
    const frontend_url = 'http://localhost:3000';
    const { userId, items, amount, address } = req.body;

    try {
        // Creating a new order
        const newOrder = new orderModel({ userId, items, amount, address });
        await newOrder.save();

        // Clearing user's cart after order placement
        await userModel.findByIdAndUpdate(userId, { cartData: {} });

        // Creating Stripe line items
        const line_items = items.map((item) => ({
            price_data: {
                currency: 'usd',
                product_data: {
                    name: item.name
                },
                unit_amount: item.price * 100
            },
            quantity: item.quantity
        }));

        // Adding delivery charge
        line_items.push({
            price_data: {
                currency: 'usd',
                product_data: {
                    name: 'Delivery Charges'
                },
                unit_amount: 2 * 100 // $2 delivery charge
            },
            quantity: 1
        });

        // Creating a Stripe session
        const session = await stripe.checkout.sessions.create({
            line_items,
            mode: 'payment',
            success_url: `${frontend_url}/verify?success=true&orderId=${newOrder._id}`,
            cancel_url: `${frontend_url}/verify?success=false&orderId=${newOrder._id}`
        });

        res.status(200).json({ success: true, session_url: session.url });
    } catch (error) {
        console.error('Error placing order:', error);
        res.status(500).json({ success: false, message: 'Internal Server Error' });
    }
};

// Verifying the order payment status
const verifyOrder = async (req, res) => {
    const { orderId, success } = req.body;

    try {
        if (success === 'true') {
            await orderModel.findByIdAndUpdate(orderId, { payment: true });
            res.status(200).json({ success: true, message: 'Payment Successful' });
        } else {
            await orderModel.findByIdAndDelete(orderId); // Delete order on failed payment
            res.status(400).json({ success: false, message: 'Payment Not Successful' });
        }
    } catch (error) {
        console.error('Error verifying order:', error);
        res.status(500).json({ success: false, message: 'Internal Server Error' });
    }
};

// Fetching all orders for a specific user
const userOrders = async (req, res) => {
    const { userId } = req.body;

    try {
        const orders = await orderModel.find({ userId });
        res.status(200).json({ success: true, data: orders });
    } catch (error) {
        console.error('Error fetching user orders:', error);
        res.status(500).json({ success: false, message: 'Internal Server Error' });
    }
};

// Listing all orders for the admin panel
const listOrders = async (req, res) => {
    try {
        const orders = await orderModel.find({});
        res.status(200).json({ success: true, data: orders });
    } catch (error) {
        console.error('Error listing orders:', error);
        res.status(500).json({ success: false, message: 'Internal Server Error' });
    }
};

// Updating the status of an order (for admin panel)
const updateStatus = async (req, res) => {
    const { orderId, status } = req.body;

    if (!orderId || !status) {
        return res.status(400).json({ success: false, message: 'Order ID and Status are required' });
    }

    try {
        await orderModel.findByIdAndUpdate(orderId, { status });
        res.status(200).json({ success: true, message: 'Status Updated' });
    } catch (error) {
        console.error('Error updating order status:', error);
        res.status(500).json({ success: false, message: 'Internal Server Error' });
    }
};

export { placeOrder, verifyOrder, userOrders, listOrders, updateStatus };
