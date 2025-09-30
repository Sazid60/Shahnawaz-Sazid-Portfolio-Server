import express from "express";
import { multerUpload } from "../../config/multer.config";
import { SkillController } from "./skill.controller";

const router = express.Router();

router.post("/", multerUpload.single("file"), SkillController.createSkill);
router.get("/", SkillController.getAllSkills);
router.get("/:id", SkillController.getSkillById);
router.patch("/:id", multerUpload.single("file"), SkillController.updateSkill);
router.delete("/:id", SkillController.deleteSkill);

export const SkillRouter = router;
