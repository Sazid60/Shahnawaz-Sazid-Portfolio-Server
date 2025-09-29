import { Request, Response } from "express";
import { AcademicService } from "./academic.service";


const createAcademic = async (req: Request, res: Response) => {
  try {
    const { degree, institution, startYear, gradYear, achievements, userId } = req.body;

    const result = await AcademicService.createAcademic({
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
  } catch (error: any) {
    res.status(500).json({
      success: false,
      message: "Failed to create academic record",
      error: error.message,
    });
  }
};

const getAllAcademics = async (_req: Request, res: Response) => {
  try {
    const result = await AcademicService.getAllAcademics();
    res.status(200).json({
      success: true,
      message: "Academics fetched successfully",
      data: result,
    });
  } catch (error: any) {
    res.status(500).json({
      success: false,
      message: "Failed to fetch academics",
      error: error.message,
    });
  }
};

const getAcademicById = async (req: Request, res: Response) => {
  try {
    const id = parseInt(req.params.id);
    const result = await AcademicService.getAcademicById(id);

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
  } catch (error: any) {
    res.status(500).json({
      success: false,
      message: "Failed to fetch academic record",
      error: error.message,
    });
  }
};

const updateAcademic = async (req: Request, res: Response) => {
  try {
    const id = parseInt(req.params.id);
    const updates = req.body;

    if (updates.startYear) updates.startYear = new Date(updates.startYear);
    if (updates.gradYear) updates.gradYear = new Date(updates.gradYear);

    const result = await AcademicService.updateAcademic(id, updates);

    res.status(200).json({
      success: true,
      message: "Academic record updated successfully",
      data: result,
    });
  } catch (error: any) {
    res.status(500).json({
      success: false,
      message: "Failed to update academic record",
      error: error.message,
    });
  }
};

const deleteAcademic = async (req: Request, res: Response) => {
  try {
    const id = parseInt(req.params.id);
    const result = await AcademicService.deleteAcademic(id);

    res.status(200).json({
      success: true,
      message: "Academic record deleted successfully",
      data: result,
    });
  } catch (error: any) {
    res.status(500).json({
      success: false,
      message: "Failed to delete academic record",
      error: error.message,
    });
  }
};

export const AcademicController = {
  createAcademic,
  getAllAcademics,
  getAcademicById,
  updateAcademic,
  deleteAcademic,
};
