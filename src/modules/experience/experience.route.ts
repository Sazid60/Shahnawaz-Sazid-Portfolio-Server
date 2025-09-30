import express from "express";
import { multerUpload } from "../../config/multer.config";
import { ExperienceController } from "./experience.controller";

const router = express.Router();

router.post("/", multerUpload.single("file"), ExperienceController.createExperience);
router.get("/", ExperienceController.getAllExperiences);
router.get("/:id", ExperienceController.getExperienceById);
router.patch("/:id", multerUpload.single("file"), ExperienceController.updateExperience);
router.delete("/:id", ExperienceController.deleteExperience);

export const ExperienceRouter = router;
