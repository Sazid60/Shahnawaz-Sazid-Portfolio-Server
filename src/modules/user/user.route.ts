import express from 'express';
import { UserController } from './user.controller';
import { multerUpload } from '../../config/multer.config';

const router = express.Router();


router.post("/register", multerUpload.single("file"), UserController.createUser);
router.get("/:email", UserController.getMe);
router.patch("/:id", multerUpload.single("file"), UserController.updateUser);

export const UserRouter = router;
