import { Prisma } from "@prisma/client"
import { prisma } from "../../config/db"
import bcrypt from "bcryptjs"

/* eslint-disable no-console */
const loginWithEmailAndPassword = async ({ email, password }: { email: string, password: string }) => {
    console.log({ email, password })
    const user = await prisma.user.findUnique({
        where: { email }
    })

    if (!user) {
        throw new Error("User Not Found!")
    }
    const isPasswordMatch = await bcrypt.compare(password, user.password)

    if (!isPasswordMatch) {
        throw new Error("Password Incorrect!")
    }

    return user
}


export const AuthServices = {
    loginWithEmailAndPassword,

}
