import express from 'express';
import { protect } from '../middlewares/authMiddleware.js';

import upload from '../middlewares/uploadMiddleware.js';
import {
  createUser,
  deleteMe,
  getMe,
  updateMe,
} from '../controllers/userController.js';
import { updatePassword } from '../controllers/authController.js';

const router = express.Router();

router.use(protect);

router.patch('/updateMyPassword', updatePassword);
router.get('/me', getMe);
router.patch('/updateMe', upload.single('profileImageUrl'), updateMe);
router.delete('/deleteMe', deleteMe);

// not implemented in frontend
router.post('/createUser', createUser);

export default router;
