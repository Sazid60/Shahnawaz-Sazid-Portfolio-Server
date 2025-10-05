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
exports.ProjectController = void 0;
const project_service_1 = require("./project.service");
const cloudinary_config_1 = require("../../config/cloudinary.config");
const createProject = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    let thumbnailUrl = "";
    try {
        const { title, description, category, frontendTechs, backendTechs, liveUrl, backendRepo, frontendRepo, userId, ieeeUrl, publishedOn } = JSON.parse(req.body.data);
        thumbnailUrl = ((_a = req.file) === null || _a === void 0 ? void 0 : _a.path) || "";
        const result = yield project_service_1.ProjectService.createProject({
            title,
            description,
            category,
            frontendTechs,
            backendTechs,
            liveUrl,
            backendRepo,
            frontendRepo,
            ieeeUrl,
            publishedOn,
            thumbnail: thumbnailUrl,
            user: { connect: { id: userId } },
        });
        res.status(201).json({
            success: true,
            message: "Project created successfully",
            data: result,
        });
    }
    catch (error) {
        if (thumbnailUrl)
            yield (0, cloudinary_config_1.deleteImageFromCloudinary)(thumbnailUrl);
        console.log(error);
        res.status(500).json({
            success: false,
            message: "Failed to create project",
            error: error.message,
        });
    }
});
const getAllProjects = (_req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const result = yield project_service_1.ProjectService.getAllProjects();
        res.status(200).json({
            success: true,
            message: "Projects fetched successfully",
            data: result,
        });
    }
    catch (error) {
        res.status(500).json({
            success: false,
            message: "Failed to fetch projects",
            error: error.message,
        });
    }
});
const getProjectById = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const id = parseInt(req.params.id);
        const result = yield project_service_1.ProjectService.getProjectById(id);
        if (!result) {
            return res.status(404).json({
                success: false,
                message: "Project not found",
            });
        }
        res.status(200).json({
            success: true,
            message: "Project fetched successfully",
            data: result,
        });
    }
    catch (error) {
        res.status(500).json({
            success: false,
            message: "Failed to fetch project",
            error: error.message,
        });
    }
});
const updateProject = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    let newThumbnailUrl = "";
    try {
        const id = parseInt(req.params.id);
        const updates = req.body.data ? JSON.parse(req.body.data) : {};
        console.log(updates);
        if (updates.thumbnail === null)
            delete updates.thumbnail;
        const project = yield project_service_1.ProjectService.getProjectById(id);
        if (!project) {
            return res.status(404).json({
                success: false,
                message: "Project not found",
            });
        }
        if (req.file) {
            newThumbnailUrl = req.file.path;
            updates.thumbnail = newThumbnailUrl;
        }
        const result = yield project_service_1.ProjectService.updateProject(id, updates);
        if (newThumbnailUrl && result)
            yield (0, cloudinary_config_1.deleteImageFromCloudinary)(project.thumbnail);
        res.status(200).json({
            success: true,
            message: "Project updated successfully",
            data: result,
        });
    }
    catch (error) {
        if (newThumbnailUrl)
            yield (0, cloudinary_config_1.deleteImageFromCloudinary)(newThumbnailUrl);
        console.log(error);
        res.status(500).json({
            success: false,
            message: "Failed to update project",
            error: error.message,
        });
    }
});
const deleteProject = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const id = parseInt(req.params.id);
        const project = yield project_service_1.ProjectService.getProjectById(id);
        if (!project) {
            return res.status(404).json({
                success: false,
                message: "Project not found",
            });
        }
        const result = yield project_service_1.ProjectService.deleteProject(id);
        if (result)
            yield (0, cloudinary_config_1.deleteImageFromCloudinary)(project.thumbnail);
        res.status(200).json({
            success: true,
            message: "Project deleted successfully",
            data: result,
        });
    }
    catch (error) {
        res.status(500).json({
            success: false,
            message: "Failed to delete project",
            error: error.message,
        });
    }
});
exports.ProjectController = {
    createProject,
    getAllProjects,
    getProjectById,
    updateProject,
    deleteProject,
};
