import { Router } from 'express';
import createUpdateProduct from './create_update_product';
import {getProduct, getProductList} from './get_product';
import deleteProduct from './delete_product';

const router = Router();
router.get('/id/:id', getProduct);
router.get('/', getProductList);
router.post('/', createUpdateProduct);
router.put('/id/:id', createUpdateProduct);
router.delete('/id/:id', deleteProduct);

export default router;
