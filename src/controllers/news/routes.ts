import { Router } from 'express';
import createUpdateNews from './create_update_news';
import getNews from './get_news';
import deleteNews from './delete_news';

const router = Router();
router.get('/id/:id', getNews);
router.post('/', createUpdateNews);
router.put('/id/:id', createUpdateNews);
router.delete('/id/:id', deleteNews);

export default router;
