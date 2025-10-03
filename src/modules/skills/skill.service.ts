import { Skill, Prisma } from "@prisma/client";
import { prisma } from "../../config/db";

const createSkill = async (payload: Prisma.SkillCreateInput): Promise<Skill> => {
  console.log(payload)
  return prisma.skill.create({ data: payload });
};

const getAllSkills = async (userId?: number): Promise<Skill[]> => {
  return prisma.skill.findMany({
    where: userId ? { userId } : {},
    orderBy: { createdAt: "desc" }
  });
};

const getSkillById = async (id: number): Promise<Skill | null> => {
  return prisma.skill.findUnique({
    where: { id }
  });
};

const updateSkill = async (id: number, updates: Prisma.SkillUpdateInput): Promise<Skill> => {
  
  return prisma.skill.update({
    where: { id },
    data: updates
  });
};

const deleteSkill = async (id: number): Promise<Skill> => {
  return prisma.skill.delete({
    where: { id }
  });
};

export const SkillService = {
  createSkill,
  getAllSkills,
  getSkillById,
  updateSkill,
  deleteSkill,
};
