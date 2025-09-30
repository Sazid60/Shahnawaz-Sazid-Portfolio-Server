import { Request, Response } from "express";
import { ExperienceService } from "./experience.service";
import { deleteImageFromCloudinary } from "../../config/cloudinary.config";

const createExperience = async (req: Request, res: Response) => {
  let companyLogoUrl = "";

  try {
    const { designation, company, startDate, endDate, serviceDuration, description, userId } =
      JSON.parse(req.body.data);

    companyLogoUrl = req.file?.path || "";

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

    const result = await ExperienceService.createExperience(payload);

    res.status(201).json({
      success: true,
      message: "Experience created successfully",
      data: result,
    });
  } catch (error: any) {
    if (companyLogoUrl) await deleteImageFromCloudinary(companyLogoUrl);

    res.status(500).json({
      success: false,
      message: "Failed to create experience",
      error: error.message,
    });
  }
};

const getAllExperiences = async (_req: Request, res: Response) => {
  try {
    const result = await ExperienceService.getAllExperiences();
    res.status(200).json({
      success: true,
      message: "Experiences fetched successfully",
      data: result,
    });
  } catch (error: any) {
    res.status(500).json({
      success: false,
      message: "Failed to fetch experiences",
      error: error.message,
    });
  }
};

const getExperienceById = async (req: Request, res: Response) => {
  try {
    const id = parseInt(req.params.id);
    const result = await ExperienceService.getExperienceById(id);

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
  } catch (error: any) {
    res.status(500).json({
      success: false,
      message: "Failed to fetch experience",
      error: error.message,
    });
  }
};

const updateExperience = async (req: Request, res: Response) => {
  let newLogoUrl = "";

  try {
    const id = parseInt(req.params.id);
    const updates = req.body.data ? JSON.parse(req.body.data) : {};

    const experience = await ExperienceService.getExperienceById(id);

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

    const result = await ExperienceService.updateExperience(id, {
      ...updates,
      startDate: updates.startDate ? new Date(updates.startDate) : experience.startDate,
      endDate: updates.endDate ? new Date(updates.endDate) : experience.endDate,
    });

    if (newLogoUrl && result) await deleteImageFromCloudinary(experience.companyLogo);

    res.status(200).json({
      success: true,
      message: "Experience updated successfully",
      data: result,
    });
  } catch (error: any) {
    if (newLogoUrl) await deleteImageFromCloudinary(newLogoUrl);

    res.status(500).json({
      success: false,
      message: "Failed to update experience",
      error: error.message,
    });
  }
};

const deleteExperience = async (req: Request, res: Response) => {
  try {
    const id = parseInt(req.params.id);
    const experience = await ExperienceService.getExperienceById(id);

    if (!experience) {
      return res.status(404).json({
        success: false,
        message: "Experience not found",
      });
    }

    const result = await ExperienceService.deleteExperience(id);

    if (result) await deleteImageFromCloudinary(experience.companyLogo);

    res.status(200).json({
      success: true,
      message: "Experience deleted successfully",
      data: result,
    });
  } catch (error: any) {
    res.status(500).json({
      success: false,
      message: "Failed to delete experience",
      error: error.message,
    });
  }
};

export const ExperienceController = {
  createExperience,
  getAllExperiences,
  getExperienceById,
  updateExperience,
  deleteExperience,
};
