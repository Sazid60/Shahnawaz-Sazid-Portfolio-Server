import express from "express";
import { ResumeController } from "./resume.controller";
import { multerUpload } from "../../config/multer.config";

const router = express.Router();


router.post("/", multerUpload.single("file"), ResumeController.uploadResume);

router.get("/", ResumeController.getResume);


router.delete("/", ResumeController.deleteResume);

export const ResumeRouter = router;
