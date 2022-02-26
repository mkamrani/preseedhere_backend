import { Router } from 'express';
import createUpdateNews from './create_update_news';

const router = Router();
router.get('/', createUpdateNews);
router.put('/id/:id', createUpdateNews);

export default router;
