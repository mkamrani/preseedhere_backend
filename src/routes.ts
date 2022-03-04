import { Router } from 'express';
import newsRouter from './controllers/news/routes';
import productRouter from './controllers/products/routes';

const router = Router();
router.use('/news', newsRouter);
router.use('/product', productRouter);

export default router;
