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
Object.defineProperty(exports, "__esModule", { value: true });
exports.SkillController = void 0;
const skill_service_1 = require("./skill.service");
const cloudinary_config_1 = require("../../config/cloudinary.config");
const createSkill = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    let imageUrl = "";
    try {
        const { skill, expertise, userId } = req.body;
        imageUrl = ((_a = req.file) === null || _a === void 0 ? void 0 : _a.path) || "";
        const payload = {
            skill,
            expertise,
            image: imageUrl,
            user: { connect: { id: Number(userId) } },
        };
        const result = yield skill_service_1.SkillService.createSkill(payload);
        res.status(201).json({
            success: true,
            message: "Skill created successfully",
            data: result,
        });
    }
    catch (error) {
        if (imageUrl)
            yield (0, cloudinary_config_1.deleteImageFromCloudinary)(imageUrl);
        res.status(500).json({
            success: false,
            message: "Failed to create skill",
            error: error.message,
        });
    }
});
const getAllSkills = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const userId = req.query.userId ? Number(req.query.userId) : undefined;
        const result = yield skill_service_1.SkillService.getAllSkills(userId);
        res.status(200).json({
            success: true,
            message: "Skills fetched successfully",
            data: result,
        });
    }
    catch (error) {
        res.status(500).json({
            success: false,
            message: "Failed to fetch skills",
            error: error.message,
        });
    }
});
const getSkillById = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const id = parseInt(req.params.id);
        const result = yield skill_service_1.SkillService.getSkillById(id);
        if (!result) {
            return res.status(404).json({
                success: false,
                message: "Skill not found",
            });
        }
        res.status(200).json({
            success: true,
            message: "Skill fetched successfully",
            data: result,
        });
    }
    catch (error) {
        res.status(500).json({
            success: false,
            message: "Failed to fetch skill",
            error: error.message,
        });
    }
});
const updateSkill = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    let newImageUrl = "";
    try {
        const id = parseInt(req.params.id);
        const updates = req.body.data ? JSON.parse(req.body.data) : {};
        console.log(updates);
        if (updates.image === null)
            delete updates.image;
        const skill = yield skill_service_1.SkillService.getSkillById(id);
        if (!skill) {
            return res.status(404).json({
                success: false,
                message: "Skill not found",
            });
        }
        if (req.file) {
            newImageUrl = req.file.path;
            updates.image = newImageUrl;
        }
        const result = yield skill_service_1.SkillService.updateSkill(id, updates);
        if (newImageUrl && skill.image) {
            yield (0, cloudinary_config_1.deleteImageFromCloudinary)(skill.image);
        }
        res.status(200).json({
            success: true,
            message: "Skill updated successfully",
            data: result,
        });
    }
    catch (error) {
        if (newImageUrl)
            yield (0, cloudinary_config_1.deleteImageFromCloudinary)(newImageUrl);
        res.status(500).json({
            success: false,
            message: "Failed to update skill",
            error: error.message,
        });
    }
});
const deleteSkill = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const id = parseInt(req.params.id);
        const skill = yield skill_service_1.SkillService.getSkillById(id);
        if (!skill) {
            return res.status(404).json({
                success: false,
                message: "Skill not found",
            });
        }
        const result = yield skill_service_1.SkillService.deleteSkill(id);
        if (result.image) {
            yield (0, cloudinary_config_1.deleteImageFromCloudinary)(result.image);
        }
        res.status(200).json({
            success: true,
            message: "Skill deleted successfully",
            data: result,
        });
    }
    catch (error) {
        res.status(500).json({
            success: false,
            message: "Failed to delete skill",
            error: error.message,
        });
    }
});
exports.SkillController = {
    createSkill,
    getAllSkills,
    getSkillById,
    updateSkill,
    deleteSkill,
};
