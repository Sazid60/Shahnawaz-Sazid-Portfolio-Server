import express from "express";
import { AcademicController } from "./academic.controller";


const router = express.Router();

router.post("/", AcademicController.createAcademic);
router.get("/", AcademicController.getAllAcademics);
router.get("/:id", AcademicController.getAcademicById);
router.patch("/:id", AcademicController.updateAcademic);
router.delete("/:id", AcademicController.deleteAcademic);

export const AcademicRouter = router;
