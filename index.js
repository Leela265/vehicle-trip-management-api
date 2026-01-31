import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import dotenv from 'dotenv';
import { loggerMiddleware } from './middlewares/logger.middleware.js';
import rateLimiterMiddleware from './middlewares/rateLimiter.middleware.js';
import { notFoundMiddleware } from './middlewares/notFound.middleware.js';
import userRoutes from './routes/user.routes.js';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

app.use(helmet());
app.use(cors());
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true }));

app.use(loggerMiddleware);
app.use(rateLimiterMiddleware);

app.use('/users', userRoutes);
app.use(notFoundMiddleware);

app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});