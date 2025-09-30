"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserRouter = void 0;
const express_1 = __importDefault(require("express"));
const user_controller_1 = require("./user.controller");
const multer_config_1 = require("../../config/multer.config");
const router = express_1.default.Router();
router.post("/register", multer_config_1.multerUpload.single("file"), user_controller_1.UserController.createUser);
router.get("/:id", user_controller_1.UserController.getMe);
router.patch("/:id", multer_config_1.multerUpload.single("file"), user_controller_1.UserController.updateUser);
exports.UserRouter = router;
