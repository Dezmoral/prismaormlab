import { Router } from 'express';
import {
  addCategoryToPost,
  createCategory,
  getPostsFull
} from '../controllers/postController.js';

const router = Router();

router.get('/', getPostsFull);
router.post('/category', addCategoryToPost);
router.post('/categories', createCategory);

export default router;
