import express from 'express';
import 'dotenv/config';
import goalRouter from './routes/goalRoutes.js';
import userRouter from './routes/userRoutes.js';
import { errorHandler } from './middleware/errorMiddleware.js';
import connectDB from './config/db.js';

const port = process.env.PORT || 8000;

connectDB();

const app = express();

// Accept JSON and form payloads
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// Routes
app.use('/api/goals', goalRouter);
app.use('/api/users', userRouter);

// Error handler (must be last)
app.use(errorHandler);

app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});
