"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ExperienceRouter = void 0;
const express_1 = __importDefault(require("express"));
const multer_config_1 = require("../../config/multer.config");
const experience_controller_1 = require("./experience.controller");
const router = express_1.default.Router();
router.post("/", multer_config_1.multerUpload.single("file"), experience_controller_1.ExperienceController.createExperience);
router.get("/", experience_controller_1.ExperienceController.getAllExperiences);
router.get("/:id", experience_controller_1.ExperienceController.getExperienceById);
router.patch("/:id", multer_config_1.multerUpload.single("file"), experience_controller_1.ExperienceController.updateExperience);
router.delete("/:id", experience_controller_1.ExperienceController.deleteExperience);
exports.ExperienceRouter = router;
