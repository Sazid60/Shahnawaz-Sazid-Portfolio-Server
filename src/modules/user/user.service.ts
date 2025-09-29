/* eslint-disable no-console */
import { Prisma, User } from "@prisma/client";
import { prisma } from "../../config/db";


const createUser = async (payload: Prisma.UserCreateInput): Promise<Omit<User, "password">> => {
    const user = await prisma.user.create({
        data: payload,
        select: {
            id: true,
            name: true,
            email: true,
            phone: true,
            image: true,
            role: true,
            createdAt: true,
            updatedAt: true,
        },
    });
    return user;
};


const getMe = async (email: string): Promise<Omit<User, "password"> | null> => {
    return prisma.user.findUnique({
        where: { email },
        select: {
            id: true,
            name: true,
            email: true,
            phone: true,
            image: true,
            role: true,
            createdAt: true,
            updatedAt: true,
        },
    });
};


const updateUser = async (id: number, updates: Prisma.UserUpdateInput): Promise<Omit<User, "password">> => {
    return prisma.user.update({
        where: { id },
        data: updates,
        select: {
            id: true,
            name: true,
            email: true,
            phone: true,
            image: true,
            role: true,
            createdAt: true,
            updatedAt: true,
        },
    });
};

export const UserService = {
    createUser,
    getMe,
    updateUser,
};
