import { Project, Prisma } from "@prisma/client";
import { prisma } from "../../config/db";

const createProject = async (payload: Prisma.ProjectCreateInput): Promise<Project> => {
    return prisma.project.create({data: payload});
};

const getAllProjects = async (): Promise<Project[]> => {
    return prisma.project.findMany({orderBy: { createdAt: "desc" }});
};

const getProjectById = async (id: number): Promise<Project | null> => {
    return prisma.project.findUnique({where: { id }});
};

const updateProject = async (id: number, updates: Prisma.ProjectUpdateInput): Promise<Project> => {
    return prisma.project.update({where: { id },data: updates});
};

const deleteProject = async (id: number): Promise<Project> => {
    return prisma.project.delete({where: { id }});
};

export const ProjectService = {
    createProject,
    getAllProjects,
    getProjectById,
    updateProject,
    deleteProject,
};
