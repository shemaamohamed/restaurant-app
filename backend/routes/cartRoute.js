import express from 'express';
import { addToCart, removeFromCart, getCart } from '../controllers/cartController.js';
import authMiddleware from '../middleware/auth.js';

const cartRouter = express.Router();

// POST to add an item to the cart
cartRouter.post('/add', authMiddleware, addToCart);

// DELETE to remove an item from the cart
cartRouter.delete('/remove', authMiddleware, removeFromCart);

// GET to fetch the user's cart data
cartRouter.get('/get', authMiddleware, getCart);

export default cartRouter;
