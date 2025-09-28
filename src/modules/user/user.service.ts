/* eslint-disable no-console */
import { Prisma, User } from "@prisma/client"
import { prisma } from "../../config/db"



const createUser = async (payload: Prisma.UserCreateInput): Promise<User> => {
    console.log(payload)
    console.log("Create User!")
    const createdUser = await prisma.user.create({
        data: payload
    })
    return createdUser
}


export const UserService = {
    createUser,
}
