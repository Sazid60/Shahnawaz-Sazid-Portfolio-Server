import express from "express";
import { multerUpload } from "../../config/multer.config";
import { ProjectController } from "./project.controller";

const router = express.Router();

router.post("/", multerUpload.single("file"), ProjectController.createProject);
router.get("/", ProjectController.getAllProjects);
router.get("/:id", ProjectController.getProjectById);
router.patch("/:id", multerUpload.single("file"), ProjectController.updateProject);
router.delete("/:id", ProjectController.deleteProject);

export const ProjectRouter = router;
