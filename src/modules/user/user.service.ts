/* eslint-disable no-console */
import { Prisma, User } from "@prisma/client";
import { prisma } from "../../config/db";

const createUser = async (payload: Prisma.UserCreateInput): Promise<User> => {
    return prisma.user.create({ data: payload });
};

const getMe = async (email: string): Promise<User | null> => {
    return prisma.user.findUnique({ where: { email } });
};

const updateUser = async (id: number,updates: Prisma.UserUpdateInput): Promise<User> => {
    return prisma.user.update({
        where: { id },
        data: updates,
    });
};

export const UserService = {
    createUser,
    getMe,
    updateUser,
};
