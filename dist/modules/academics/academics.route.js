"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AcademicRouter = void 0;
const express_1 = __importDefault(require("express"));
const academic_controller_1 = require("./academic.controller");
const router = express_1.default.Router();
router.post("/", academic_controller_1.AcademicController.createAcademic);
router.get("/", academic_controller_1.AcademicController.getAllAcademics);
router.get("/:id", academic_controller_1.AcademicController.getAcademicById);
router.patch("/:id", academic_controller_1.AcademicController.updateAcademic);
router.delete("/:id", academic_controller_1.AcademicController.deleteAcademic);
exports.AcademicRouter = router;
