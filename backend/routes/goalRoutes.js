import express from 'express';
import { getGoals, createGoal, updateGoal, deleteGoal } from '../controllers/goalController.js';
import { protect } from '../middleware/authMiddleware.js';

const goalRouter = express.Router();

goalRouter.route('/').get(protect, getGoals).post(protect, createGoal);
goalRouter.route('/:id').put(protect, updateGoal).delete(protect, deleteGoal);

export default goalRouter;
