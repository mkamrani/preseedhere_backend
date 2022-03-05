import { Router } from 'express';
import newsRouter from './controllers/news/routes';
import productRouter from './controllers/products/routes';
import authRouter from './controllers/auth/routes';

const router = Router();
router.use('/auth', authRouter);
router.use('/news', newsRouter);
router.use('/product', productRouter);

export default router;
