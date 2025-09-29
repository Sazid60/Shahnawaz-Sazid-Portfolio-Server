import { Request, Response } from "express";
import { ProjectService } from "./project.service";
import { deleteImageFromCloudinary } from "../../config/cloudinary.config";

const createProject = async (req: Request, res: Response) => {
    let thumbnailUrl = "";

    try {
        const { title, description, features, category, frontendTechs, backendTechs, liveUrl, backendRepo, frontendRepo, userId } = JSON.parse(req.body.data);

        thumbnailUrl = req.file?.path || "";

        const result = await ProjectService.createProject({
            title,
            description,
            features,
            category,
            frontendTechs,
            backendTechs,
            liveUrl,
            backendRepo,
            frontendRepo,
            thumbnail: thumbnailUrl,
            user: { connect: { id: userId } },
        });

        res.status(201).json({
            success: true,
            message: "Project created successfully",
            data: result,
        });
    } catch (error: any) {
        if (thumbnailUrl) await deleteImageFromCloudinary(thumbnailUrl);

        res.status(500).json({
            success: false,
            message: "Failed to create project",
            error: error.message,
        });
    }
};

const getAllProjects = async (_req: Request, res: Response) => {
    try {
        const result = await ProjectService.getAllProjects();
        res.status(200).json({
            success: true,
            message: "Projects fetched successfully",
            data: result,
        });
    } catch (error: any) {
        res.status(500).json({
            success: false,
            message: "Failed to fetch projects",
            error: error.message,
        });
    }
};

const getProjectById = async (req: Request, res: Response) => {
    try {
        const id = parseInt(req.params.id);
        const result = await ProjectService.getProjectById(id);

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
    } catch (error: any) {
        res.status(500).json({
            success: false,
            message: "Failed to fetch project",
            error: error.message,
        });
    }
};

const updateProject = async (req: Request, res: Response) => {
    let newThumbnailUrl = "";

    try {
        const id = parseInt(req.params.id);
        const updates = req.body.data ? JSON.parse(req.body.data) : {};

        if (req.file) {
            newThumbnailUrl = req.file.path;
            updates.thumbnail = newThumbnailUrl;
        }

        const result = await ProjectService.updateProject(id, updates);

        res.status(200).json({
            success: true,
            message: "Project updated successfully",
            data: result,
        });
    } catch (error: any) {
        if (newThumbnailUrl) await deleteImageFromCloudinary(newThumbnailUrl);

        res.status(500).json({
            success: false,
            message: "Failed to update project",
            error: error.message,
        });
    }
};

const deleteProject = async (req: Request, res: Response) => {
    try {
        const id = parseInt(req.params.id);
        const result = await ProjectService.deleteProject(id);

        res.status(200).json({
            success: true,
            message: "Project deleted successfully",
            data: result,
        });
    } catch (error: any) {
        res.status(500).json({
            success: false,
            message: "Failed to delete project",
            error: error.message,
        });
    }
};

export const ProjectController = {
    createProject,
    getAllProjects,
    getProjectById,
    updateProject,
    deleteProject,
};
