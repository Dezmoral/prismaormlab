import { Router } from 'express';
import {
  createUserWithPost,
  getAuthorsWithItCategory,
  getUsersWithPostCount
} from '../controllers/userController.js';

const router = Router();

router.post('/', createUserWithPost);
router.get('/with-post-count', getUsersWithPostCount);
router.get('/with-it-category', getAuthorsWithItCategory);

export default router;
