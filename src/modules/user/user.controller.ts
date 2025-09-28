/* eslint-disable no-console */
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

        res.status(201).json(result);
    } catch (error) {
        console.log(error);
        if (imageUrl) {
            await deleteImageFromCloudinary(imageUrl);
        }
        res.status(500).send(error);
    }
};

const getMe = async (req: Request, res: Response) => {
    try {
        const result = await UserService.getMe(req.params.email);
        res.status(200).json(result);
    } catch (error) {
        res.status(500).send(error);
    }
};

const updateUser = async (req: Request, res: Response) => {
    let newImageUrl: string = "";

    try {
        const id = parseInt(req.params.id);
        const updates = req.body.data ? JSON.parse(req.body.data) : {};

        console.log(updates)

        if (updates.password) {
            updates.password = await bcrypt.hash(updates.password, 10);
        }

        if (req.file) {
            newImageUrl = req.file.path;
            updates.image = newImageUrl;
        }

        const result = await UserService.updateUser(id, updates);

        res.status(200).json(result);
    } catch (error) {
        console.log(error);

        if (newImageUrl) {
            await deleteImageFromCloudinary(newImageUrl);
        }
        res.status(500).send(error);
    }
};

export const UserController = {
    createUser,
    getMe,
    updateUser,
};
