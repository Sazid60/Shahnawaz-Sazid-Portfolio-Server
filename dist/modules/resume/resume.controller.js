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
exports.ResumeController = void 0;
const resume_service_1 = require("./resume.service");
const cloudinary_config_1 = require("../../config/cloudinary.config");
const uploadResume = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    try {
        const resumeUrl = ((_a = req.file) === null || _a === void 0 ? void 0 : _a.path) || "";
        const { userId } = JSON.parse(req.body.data);
        if (!resumeUrl || !userId) {
            return res.status(400).json({ success: false, message: "Resume file and userId are required" });
        }
        const existingResume = yield resume_service_1.ResumeService.getFirstResume();
        let resume;
        if (existingResume) {
            yield (0, cloudinary_config_1.deleteImageFromCloudinary)(existingResume.resumeUrl);
            resume = yield resume_service_1.ResumeService.updateResume(existingResume.id, { resumeUrl });
        }
        else {
            resume = yield resume_service_1.ResumeService.createResume({
                resumeUrl,
                user: { connect: { id: Number(userId) } },
            });
        }
        res.status(200).json({
            success: true,
            message: existingResume ? "Resume updated successfully" : "Resume uploaded successfully",
            data: resume,
        });
    }
    catch (error) {
        res.status(500).json({ success: false, message: "Failed to upload resume", error: String(error) });
    }
});
const getResume = (_req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const resume = yield resume_service_1.ResumeService.getFirstResume();
        if (!resume) {
            return res.status(404).json({ success: false, message: "No resume found" });
        }
        res.status(200).json({ success: true, message: "Resume fetched successfully", data: resume });
    }
    catch (error) {
        res.status(500).json({ success: false, message: "Failed to fetch resume", error: String(error) });
    }
});
const downloadResume = (_req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const resume = yield resume_service_1.ResumeService.getFirstResume();
        if (!resume) {
            return res.status(404).json({ success: false, message: "No resume found" });
        }
        const fileStream = yield resume_service_1.ResumeService.getResumeFileStream(resume.resumeUrl);
        res.setHeader("Content-Disposition", "attachment; filename=My_Resume.pdf");
        res.setHeader("Content-Type", "application/pdf");
        fileStream.pipe(res);
    }
    catch (error) {
        res.status(500).json({ success: false, message: "Failed to download resume", error: error.message });
    }
});
const deleteResume = (_req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const existingResume = yield resume_service_1.ResumeService.getFirstResume();
        if (!existingResume) {
            return res.status(404).json({ success: false, message: "No resume to delete" });
        }
        yield (0, cloudinary_config_1.deleteImageFromCloudinary)(existingResume.resumeUrl);
        yield resume_service_1.ResumeService.deleteResume(existingResume.id);
        res.status(200).json({ success: true, message: "Resume deleted successfully" });
    }
    catch (error) {
        res.status(500).json({ success: false, message: "Failed to delete resume", error: String(error) });
    }
});
exports.ResumeController = {
    uploadResume,
    getResume,
    downloadResume,
    deleteResume,
};
