import { Academic, Prisma } from "@prisma/client";
import { prisma } from "../../config/db";

const createAcademic = async (payload: Prisma.AcademicCreateInput): Promise<Academic> => {
  return prisma.academic.create({ data: payload });
};

const getAllAcademics = async (): Promise<Academic[]> => {
  return prisma.academic.findMany({ orderBy: { createdAt: "desc" } });
};

const getAcademicById = async (id: number): Promise<Academic | null> => {
  return prisma.academic.findUnique({ where: { id } });
};

const updateAcademic = async (id: number, updates: Prisma.AcademicUpdateInput): Promise<Academic> => {
  return prisma.academic.update({ where: { id }, data: updates });
};

const deleteAcademic = async (id: number): Promise<Academic> => {
  return prisma.academic.delete({ where: { id } });
};

export const AcademicService = {
  createAcademic,
  getAllAcademics,
  getAcademicById,
  updateAcademic,
  deleteAcademic,
};
