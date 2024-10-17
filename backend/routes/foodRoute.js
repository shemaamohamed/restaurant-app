import express from 'express';
import upload from '../utils/multerConfig.js';  
import { addFood, listFood, removeFood ,editFood } from '../controllers/foodController.js';

const foodRouter = express.Router();

// Routes
foodRouter.post('/add', upload.single('image'), addFood); // Use the upload middleware
foodRouter.get('/list', listFood);
foodRouter.delete('/remove', removeFood);
foodRouter.put('/update', upload.single('image'),editFood );

export default foodRouter;
