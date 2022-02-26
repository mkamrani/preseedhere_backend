import { Router } from 'express';
import newsRouter from './controllers/news/routes';

const router = Router();
router.use('/news', newsRouter);

export default router;
