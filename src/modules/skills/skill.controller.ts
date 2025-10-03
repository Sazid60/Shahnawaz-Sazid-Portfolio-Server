import { Request, Response } from "express";
import { SkillService } from "./skill.service";
import { deleteImageFromCloudinary } from "../../config/cloudinary.config";

const createSkill = async (req: Request, res: Response) => {
  let imageUrl = "";

  try {
    const { skill, expertise, userId } = req.body;

    imageUrl = req.file?.path || "";

    const payload = {
      skill,
      expertise,
      image: imageUrl,
      user: { connect: { id: Number(userId) } }, 
    };


    const result = await SkillService.createSkill(payload);

    res.status(201).json({
      success: true,
      message: "Skill created successfully",
      data: result,
    });
  } catch (error: any) {
    if (imageUrl) await deleteImageFromCloudinary(imageUrl);

    res.status(500).json({
      success: false,
      message: "Failed to create skill",
      error: error.message,
    });
  }
};

const getAllSkills = async (req: Request, res: Response) => {
  try {
    const userId = req.query.userId ? Number(req.query.userId) : undefined;
    const result = await SkillService.getAllSkills(userId);

    res.status(200).json({
      success: true,
      message: "Skills fetched successfully",
      data: result,
    });
  } catch (error: any) {
    res.status(500).json({
      success: false,
      message: "Failed to fetch skills",
      error: error.message,
    });
  }
};

const getSkillById = async (req: Request, res: Response) => {
  try {
    const id = parseInt(req.params.id);
    const result = await SkillService.getSkillById(id);

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
  } catch (error: any) {
    res.status(500).json({
      success: false,
      message: "Failed to fetch skill",
      error: error.message,
    });
  }
};

const updateSkill = async (req: Request, res: Response) => {
  let newImageUrl = "";

  try {
    const id = parseInt(req.params.id);
    const updates = req.body.data ? JSON.parse(req.body.data) : {};
    console.log(updates)
    
    if (updates.image === null) delete updates.image;

    const skill = await SkillService.getSkillById(id);
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

    const result = await SkillService.updateSkill(id, updates);

    if (newImageUrl && skill.image) {
      await deleteImageFromCloudinary(skill.image);
    }

    res.status(200).json({
      success: true,
      message: "Skill updated successfully",
      data: result,
    });
  } catch (error: any) {
    if (newImageUrl) await deleteImageFromCloudinary(newImageUrl);

    res.status(500).json({
      success: false,
      message: "Failed to update skill",
      error: error.message,
    });
  }
};

const deleteSkill = async (req: Request, res: Response) => {
  try {
    const id = parseInt(req.params.id);

    const skill = await SkillService.getSkillById(id);
    if (!skill) {
      return res.status(404).json({
        success: false,
        message: "Skill not found",
      });
    }

    const result = await SkillService.deleteSkill(id);

    if (result.image) {
      await deleteImageFromCloudinary(result.image);
    }

    res.status(200).json({
      success: true,
      message: "Skill deleted successfully",
      data: result,
    });
  } catch (error: any) {
    res.status(500).json({
      success: false,
      message: "Failed to delete skill",
      error: error.message,
    });
  }
};

export const SkillController = {
  createSkill,
  getAllSkills,
  getSkillById,
  updateSkill,
  deleteSkill,
};
