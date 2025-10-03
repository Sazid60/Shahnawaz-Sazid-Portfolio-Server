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
exports.ExperienceController = void 0;
const experience_service_1 = require("./experience.service");
const cloudinary_config_1 = require("../../config/cloudinary.config");
const createExperience = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    let companyLogoUrl = "";
    try {
        const { designation, company, startDate, endDate, serviceDuration, description, userId } = JSON.parse(req.body.data);
        companyLogoUrl = ((_a = req.file) === null || _a === void 0 ? void 0 : _a.path) || "";
        const payload = {
            designation,
            company,
            companyLogo: companyLogoUrl,
            startDate: new Date(startDate),
            endDate: endDate ? new Date(endDate) : null,
            serviceDuration,
            description,
            user: { connect: { id: userId } },
        };
        const result = yield experience_service_1.ExperienceService.createExperience(payload);
        res.status(201).json({
            success: true,
            message: "Experience created successfully",
            data: result,
        });
    }
    catch (error) {
        if (companyLogoUrl)
            yield (0, cloudinary_config_1.deleteImageFromCloudinary)(companyLogoUrl);
        res.status(500).json({
            success: false,
            message: "Failed to create experience",
            error: error.message,
        });
    }
});
const getAllExperiences = (_req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const result = yield experience_service_1.ExperienceService.getAllExperiences();
        res.status(200).json({
            success: true,
            message: "Experiences fetched successfully",
            data: result,
        });
    }
    catch (error) {
        res.status(500).json({
            success: false,
            message: "Failed to fetch experiences",
            error: error.message,
        });
    }
});
const getExperienceById = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const id = parseInt(req.params.id);
        const result = yield experience_service_1.ExperienceService.getExperienceById(id);
        if (!result) {
            return res.status(404).json({
                success: false,
                message: "Experience not found",
            });
        }
        res.status(200).json({
            success: true,
            message: "Experience fetched successfully",
            data: result,
        });
    }
    catch (error) {
        res.status(500).json({
            success: false,
            message: "Failed to fetch experience",
            error: error.message,
        });
    }
});
const updateExperience = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    let newLogoUrl = "";
    try {
        const id = parseInt(req.params.id);
        const updates = req.body.data ? JSON.parse(req.body.data) : {};
        console.log(updates);
        if (updates.companyLogo === null)
            delete updates.companyLogo;
        const experience = yield experience_service_1.ExperienceService.getExperienceById(id);
        if (!experience) {
            return res.status(404).json({
                success: false,
                message: "Experience not found",
            });
        }
        if (req.file) {
            newLogoUrl = req.file.path;
            updates.companyLogo = newLogoUrl;
        }
        const result = yield experience_service_1.ExperienceService.updateExperience(id, Object.assign(Object.assign({}, updates), { startDate: updates.startDate ? new Date(updates.startDate) : experience.startDate, endDate: updates.endDate ? new Date(updates.endDate) : experience.endDate }));
        if (newLogoUrl && result)
            yield (0, cloudinary_config_1.deleteImageFromCloudinary)(experience.companyLogo);
        res.status(200).json({
            success: true,
            message: "Experience updated successfully",
            data: result,
        });
    }
    catch (error) {
        if (newLogoUrl)
            yield (0, cloudinary_config_1.deleteImageFromCloudinary)(newLogoUrl);
        res.status(500).json({
            success: false,
            message: "Failed to update experience",
            error: error.message,
        });
    }
});
const deleteExperience = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const id = parseInt(req.params.id);
        const experience = yield experience_service_1.ExperienceService.getExperienceById(id);
        if (!experience) {
            return res.status(404).json({
                success: false,
                message: "Experience not found",
            });
        }
        const result = yield experience_service_1.ExperienceService.deleteExperience(id);
        if (result)
            yield (0, cloudinary_config_1.deleteImageFromCloudinary)(experience.companyLogo);
        res.status(200).json({
            success: true,
            message: "Experience deleted successfully",
            data: result,
        });
    }
    catch (error) {
        res.status(500).json({
            success: false,
            message: "Failed to delete experience",
            error: error.message,
        });
    }
});
exports.ExperienceController = {
    createExperience,
    getAllExperiences,
    getExperienceById,
    updateExperience,
    deleteExperience,
};
