import express from 'express';
import { protect } from '../middlewares/authMiddleware.js';
import { uploadResumeImages } from '../controllers/uploadImage.js';
import {
  createResume,
  getUserResumes,
  getResumeById,
  updateResume,
  deleteResume,
} from '../controllers/resumeController.js';

const router = express.Router();

router.use(protect);

router.post('/', createResume);
router.get('/', getUserResumes);
router.get('/:id', getResumeById);
router.put('/:id', updateResume);
router.put('/:id/upload-images', uploadResumeImages);
router.delete('/:id', deleteResume);

export default router;
