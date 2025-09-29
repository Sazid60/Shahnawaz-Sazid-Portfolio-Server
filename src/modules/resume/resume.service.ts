import { Prisma, Resume } from "@prisma/client";
import { prisma } from "../../config/db";
import axios from "axios";
import { Readable } from "stream";

const createResume = async (data: Prisma.ResumeCreateInput): Promise<Resume> => {
    return prisma.resume.create({ data });
};

const getFirstResume = async (): Promise<Resume | null> => {
    return prisma.resume.findFirst({});
};

const updateResume = async (id: number, updates: Prisma.ResumeUpdateInput): Promise<Resume> => {
    return prisma.resume.update({
        where: { id },
        data: updates,
        include: { user: true },
    });
};

const deleteResume = async (id: number): Promise<Resume> => {
    return prisma.resume.delete({ where: { id } });
};


const getResumeFileStream = async (url: string): Promise<Readable> => {
    const response = await axios.get(url, { responseType: "stream" });
    return response.data;
};

export const ResumeService = {
    createResume,
    getFirstResume,
    updateResume,
    deleteResume,
    getResumeFileStream,
};
