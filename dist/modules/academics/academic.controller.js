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
exports.AcademicController = void 0;
const academic_service_1 = require("./academic.service");
const createAcademic = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { degree, institution, startYear, gradYear, achievements, userId } = req.body;
        const result = yield academic_service_1.AcademicService.createAcademic({
            degree,
            institution,
            startYear: new Date(startYear),
            gradYear: gradYear ? new Date(gradYear) : null,
            achievements,
            user: { connect: { id: userId } },
        });
        res.status(201).json({
            success: true,
            message: "Academic record created successfully",
            data: result,
        });
    }
    catch (error) {
        res.status(500).json({
            success: false,
            message: "Failed to create academic record",
            error: error.message,
        });
    }
});
const getAllAcademics = (_req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const result = yield academic_service_1.AcademicService.getAllAcademics();
        res.status(200).json({
            success: true,
            message: "Academics fetched successfully",
            data: result,
        });
    }
    catch (error) {
        res.status(500).json({
            success: false,
            message: "Failed to fetch academics",
            error: error.message,
        });
    }
});
const getAcademicById = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const id = parseInt(req.params.id);
        const result = yield academic_service_1.AcademicService.getAcademicById(id);
        if (!result) {
            return res.status(404).json({
                success: false,
                message: "Academic record not found",
            });
        }
        res.status(200).json({
            success: true,
            message: "Academic record fetched successfully",
            data: result,
        });
    }
    catch (error) {
        res.status(500).json({
            success: false,
            message: "Failed to fetch academic record",
            error: error.message,
        });
    }
});
const updateAcademic = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const id = parseInt(req.params.id);
        const updates = req.body;
        if (updates.startYear)
            updates.startYear = new Date(updates.startYear);
        if (updates.gradYear)
            updates.gradYear = new Date(updates.gradYear);
        const result = yield academic_service_1.AcademicService.updateAcademic(id, updates);
        res.status(200).json({
            success: true,
            message: "Academic record updated successfully",
            data: result,
        });
    }
    catch (error) {
        res.status(500).json({
            success: false,
            message: "Failed to update academic record",
            error: error.message,
        });
    }
});
const deleteAcademic = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const id = parseInt(req.params.id);
        const result = yield academic_service_1.AcademicService.deleteAcademic(id);
        res.status(200).json({
            success: true,
            message: "Academic record deleted successfully",
            data: result,
        });
    }
    catch (error) {
        res.status(500).json({
            success: false,
            message: "Failed to delete academic record",
            error: error.message,
        });
    }
});
exports.AcademicController = {
    createAcademic,
    getAllAcademics,
    getAcademicById,
    updateAcademic,
    deleteAcademic,
};
