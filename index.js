import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import dotenv from 'dotenv';

// Middlewares
import { loggerMiddleware } from './middlewares/logger.middleware.js';
import rateLimiterMiddleware from './middlewares/rateLimiter.middleware.js';
import { notFoundMiddleware } from './middlewares/notFound.middleware.js';

// Routes
import userRoutes from './routes/user.routes.js';
import vehicleRoutes from './routes/vehicle.routes.js';
import tripRoutes from './routes/trip.routes.js';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

// Security & parsing middleware
app.use(helmet());
app.use(cors());
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true }));

// Custom middlewares
app.use(loggerMiddleware);
app.use(rateLimiterMiddleware);

// Routes
app.use('/users', userRoutes);
app.use('/vehicles', vehicleRoutes);
app.use('/trips', tripRoutes);
app.use('/analytics', tripRoutes); // Analytics will be in trip routes

// 404 handler
app.use(notFoundMiddleware);

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
  console.log(` Analytics: http://localhost:${PORT}/analytics`);
});