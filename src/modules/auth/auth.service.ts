
import { prisma } from "../../config/db";
import bcrypt from "bcryptjs";


const loginWithEmailAndPassword = async ({ email, password }: { email: string, password: string }) => {
    const user = await prisma.user.findUnique({
        where: { email },
    });

    if (!user) {
        throw new Error("User Not Found!");
    }

    const isPasswordMatch = await bcrypt.compare(password, user.password);

    if (!isPasswordMatch) {
        throw new Error("Password Incorrect!");
    }

    const { password: _pw, ...userWithoutPassword } = user;
    return userWithoutPassword;
};

export const AuthServices = {
    loginWithEmailAndPassword,
};
