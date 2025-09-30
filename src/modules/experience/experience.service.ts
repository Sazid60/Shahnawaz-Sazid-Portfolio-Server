import { Experience, Prisma } from "@prisma/client";
import { prisma } from "../../config/db";

const createExperience = async (
  payload: Prisma.ExperienceCreateInput
): Promise<Experience> => {
  return prisma.experience.create({ data: payload });
};

const getAllExperiences = async (): Promise<Experience[]> => {
  return prisma.experience.findMany({
    orderBy: { createdAt: "desc" }
  });
};

const getExperienceById = async (id: number): Promise<Experience | null> => {
  return prisma.experience.findUnique({
    where: { id }
  });
};

const updateExperience = async (
  id: number,
  updates: Prisma.ExperienceUpdateInput
): Promise<Experience> => {
  return prisma.experience.update({
    where: { id },
    data: updates
  });
};

const deleteExperience = async (id: number): Promise<Experience> => {
  return prisma.experience.delete({ where: { id } });
};

export const ExperienceService = {
  createExperience,
  getAllExperiences,
  getExperienceById,
  updateExperience,
  deleteExperience,
};
