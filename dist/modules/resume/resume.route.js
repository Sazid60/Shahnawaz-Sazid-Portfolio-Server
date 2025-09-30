"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ResumeRouter = void 0;
const express_1 = __importDefault(require("express"));
const resume_controller_1 = require("./resume.controller");
const multer_config_1 = require("../../config/multer.config");
const router = express_1.default.Router();
router.post("/", multer_config_1.multerUpload.single("file"), resume_controller_1.ResumeController.uploadResume);
router.get("/", resume_controller_1.ResumeController.getResume);
router.get("/download", resume_controller_1.ResumeController.downloadResume);
router.delete("/", resume_controller_1.ResumeController.deleteResume);
exports.ResumeRouter = router;
