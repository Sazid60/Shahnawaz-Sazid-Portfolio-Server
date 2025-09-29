
import { Request, Response } from "express";
import bcrypt from "bcryptjs";
import { UserService } from "./user.service";
import { deleteImageFromCloudinary } from "../../config/cloudinary.config";

const createUser = async (req: Request, res: Response) => {
    let imageUrl: string = "";

    try {
        const { name, email, password, phone } = JSON.parse(req.body.data);
        const hashedPassword = await bcrypt.hash(password, 10);

        imageUrl = req.file?.path || "";

        const result = await UserService.createUser({
            name,
            email,
            password: hashedPassword,
            phone,
            image: imageUrl,
        });

        res.status(201).json({
            success: true,
            message: "User created successfully",
            data: result,
        });
    } catch (error: any) {
        console.log(error);
        if (imageUrl) {
            await deleteImageFromCloudinary(imageUrl);
        }
        res.status(500).json({
            success: false,
            message: "Failed to create user",
            error: error.message,
        });
    }
};

const getMe = async (req: Request, res: Response) => {
    try {
        const result = await UserService.getMe(Number(req.params.id));
        if (!result) {
            return res.status(404).json({
                success: false,
                message: "User not found",
            });
        }
        res.status(200).json({
            success: true,
            message: "User fetched successfully",
            data: result,
        });
    } catch (error: any) {
        res.status(500).json({
            success: false,
            message: "Failed to fetch user",
            error: error.message,
        });
    }
};

const updateUser = async (req: Request, res: Response) => {
    let newImageUrl: string = "";

    try {
        const id = parseInt(req.params.id);
        const updates = req.body.data ? JSON.parse(req.body.data) : {};


        if (updates.password) {
            updates.password = await bcrypt.hash(updates.password, 10);
        }

        const userInfo = await UserService.getMe(Number(req.params.id));
        if (!userInfo) {
            return res.status(404).json({
                success: false,
                message: "User not found",
            })
        }

        if (req.file) {
            newImageUrl = req.file.path;
            updates.image = newImageUrl;
        }

        const result = await UserService.updateUser(id, updates);
        if (newImageUrl && result) await deleteImageFromCloudinary(userInfo.image);

        res.status(200).json({
            success: true,
            message: "User updated successfully",
            data: result,
        });
    } catch (error: any) {
        console.log(error);
        if (newImageUrl) {
            await deleteImageFromCloudinary(newImageUrl);
        }
        res.status(500).json({
            success: false,
            message: "Failed to update user",
            error: error.message,
        });
    }
};

export const UserController = {
    createUser,
    getMe,
    updateUser,
};
