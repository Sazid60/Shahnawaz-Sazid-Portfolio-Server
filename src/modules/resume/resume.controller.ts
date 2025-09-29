import { Request, Response } from "express";
import { ResumeService } from "./resume.service";
import { deleteImageFromCloudinary } from "../../config/cloudinary.config";

const uploadResume = async (req: Request, res: Response) => {
    try {
        const resumeUrl = req.file?.path || "";
        const { userId } = JSON.parse(req.body.data);

        if (!resumeUrl || !userId) {
            return res.status(400).json({ success: false, message: "Resume file and userId are required" });
        }

        const existingResume = await ResumeService.getFirstResume();
        let resume;

        if (existingResume) {
            await deleteImageFromCloudinary(existingResume.resumeUrl);
            resume = await ResumeService.updateResume(existingResume.id, { resumeUrl });
        } else {
            resume = await ResumeService.createResume({
                resumeUrl,
                user: { connect: { id: Number(userId) } },
            });
        }

        res.status(200).json({
            success: true,
            message: existingResume ? "Resume updated successfully" : "Resume uploaded successfully",
            data: resume,
        });
    } catch (error: any) {
        res.status(500).json({ success: false, message: "Failed to upload resume", error: String(error) });
    }
};

const getResume = async (_req: Request, res: Response) => {
    try {
        const resume = await ResumeService.getFirstResume();
        if (!resume) {
            return res.status(404).json({ success: false, message: "No resume found" });
        }
        res.status(200).json({ success: true, message: "Resume fetched successfully", data: resume });
    } catch (error: any) {
        res.status(500).json({ success: false, message: "Failed to fetch resume", error: String(error) });
    }
};

const downloadResume = async (_req: Request, res: Response) => {
    try {
        const resume = await ResumeService.getFirstResume();
        if (!resume) {
            return res.status(404).json({ success: false, message: "No resume found" });
        }

        const fileStream = await ResumeService.getResumeFileStream(resume.resumeUrl);

        res.setHeader("Content-Disposition", "attachment; filename=My_Resume.pdf");
        res.setHeader("Content-Type", "application/pdf");

        fileStream.pipe(res);
    } catch (error: any) {
        res.status(500).json({ success: false, message: "Failed to download resume", error: error.message });
    }
};

const deleteResume = async (_req: Request, res: Response) => {
    try {
        const existingResume = await ResumeService.getFirstResume();
        if (!existingResume) {
            return res.status(404).json({ success: false, message: "No resume to delete" });
        }

        await deleteImageFromCloudinary(existingResume.resumeUrl);
        await ResumeService.deleteResume(existingResume.id);

        res.status(200).json({ success: true, message: "Resume deleted successfully" });
    } catch (error: any) {
        res.status(500).json({ success: false, message: "Failed to delete resume", error: String(error) });
    }
};

export const ResumeController = {
    uploadResume,
    getResume,
    downloadResume,
    deleteResume,
};
