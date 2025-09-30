"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserController = void 0;
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const user_service_1 = require("./user.service");
const cloudinary_config_1 = require("../../config/cloudinary.config");
const createUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    let imageUrl = "";
    try {
        const { name, email, password, phone } = JSON.parse(req.body.data);
        const hashedPassword = yield bcryptjs_1.default.hash(password, 10);
        imageUrl = ((_a = req.file) === null || _a === void 0 ? void 0 : _a.path) || "";
        const result = yield user_service_1.UserService.createUser({
            name,
            email,
            password: hashedPassword,
            phone,
            image: imageUrl,
        });
        res.status(201).json({
            success: true,
            message: "User created successfully",
            data: result,
        });
    }
    catch (error) {
        console.log(error);
        if (imageUrl) {
            yield (0, cloudinary_config_1.deleteImageFromCloudinary)(imageUrl);
        }
        res.status(500).json({
            success: false,
            message: "Failed to create user",
            error: error.message,
        });
    }
});
const getMe = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const result = yield user_service_1.UserService.getMe(Number(req.params.id));
        if (!result) {
            return res.status(404).json({
                success: false,
                message: "User not found",
            });
        }
        res.status(200).json({
            success: true,
            message: "User fetched successfully",
            data: result,
        });
    }
    catch (error) {
        res.status(500).json({
            success: false,
            message: "Failed to fetch user",
            error: error.message,
        });
    }
});
const updateUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    let newImageUrl = "";
    try {
        const id = parseInt(req.params.id);
        const updates = req.body.data ? JSON.parse(req.body.data) : {};
        if (updates.password) {
            updates.password = yield bcryptjs_1.default.hash(updates.password, 10);
        }
        const userInfo = yield user_service_1.UserService.getMe(Number(req.params.id));
        if (!userInfo) {
            return res.status(404).json({
                success: false,
                message: "User not found",
            });
        }
        if (req.file) {
            newImageUrl = req.file.path;
            updates.image = newImageUrl;
        }
        const result = yield user_service_1.UserService.updateUser(id, updates);
        if (newImageUrl && result)
            yield (0, cloudinary_config_1.deleteImageFromCloudinary)(userInfo.image);
        res.status(200).json({
            success: true,
            message: "User updated successfully",
            data: result,
        });
    }
    catch (error) {
        console.log(error);
        if (newImageUrl) {
            yield (0, cloudinary_config_1.deleteImageFromCloudinary)(newImageUrl);
        }
        res.status(500).json({
            success: false,
            message: "Failed to update user",
            error: error.message,
        });
    }
});
exports.UserController = {
    createUser,
    getMe,
    updateUser,
};
