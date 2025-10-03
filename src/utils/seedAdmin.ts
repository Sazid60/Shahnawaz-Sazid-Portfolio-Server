
import bcrypt from "bcryptjs";
import { prisma } from "../config/db";

export const seedAdmin = async () => {
    try {
        const adminEmail = process.env.ADMIN_EMAIL as string;
        const adminPassword = process.env.ADMIN_PASSWORD as string;
        const bcryptSalt = 10;

        const existingAdmin = await prisma.user.findUnique({
            where: { email: adminEmail },
        });

        if (existingAdmin) {
            console.log("Admin already exists");
            return;
        }

        console.log("Creating admin...");

        const hashedPassword = await bcrypt.hash(adminPassword, bcryptSalt);

        await prisma.user.create({
            data: {
                name: "Shahnawaz Sazid",
                email: adminEmail,
                password: hashedPassword,
                phone: "+8801639768727",
                image: "https://res.cloudinary.com/dosvjludu/image/upload/v1759246773/6xpy6rva0lo-1759246773033-sazid-jpg.jpg.jpg",
                role: "ADMIN",
            },
        });
        console.log("Admin created successfully!");
    } catch (error) {
        console.error("Failed to create admin:", error);
    } finally {
        await prisma.$disconnect();
    }
};

if (require.main === module) {
    seedAdmin();
}
