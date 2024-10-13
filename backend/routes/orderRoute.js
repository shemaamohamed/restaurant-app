import express from 'express';
import authMiddleWare from '../middleware/auth.js';
import { placeOrder, verifyOrder, userOrders, listOrders, updateStatus } from '../controllers/orderController.js';

const orderRouter = express.Router();

// Placing an order, requires authentication
orderRouter.post('/place', authMiddleWare, placeOrder);

// Verifying payment after order placement
orderRouter.post('/verify', verifyOrder);

// Getting orders for a specific user, requires authentication (changed to GET)
orderRouter.get('/userorders', authMiddleWare, userOrders);

// Listing all orders for admin panel (admin-only route)
orderRouter.get('/list', listOrders);

// Updating order status
orderRouter.put('/status', updateStatus);

export default orderRouter;

