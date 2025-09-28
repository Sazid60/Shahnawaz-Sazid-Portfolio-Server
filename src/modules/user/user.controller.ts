/* eslint-disable no-console */
import { Request, Response } from "express";
import { UserService } from "./user.service";
import bcrypt from "bcryptjs";
import { deleteImageFromCloudinary } from "../../config/cloudinary.config";

const createUser = async (req: Request, res: Response) => {
    let imageUrl: string = "";

    try {
        const { name, email, password, phone } = JSON.parse(req.body.data);
        // console.log("req.body:", req.body);
        // console.log("req.file:", req.file);

        const hashedPassword = await bcrypt.hash(password, 10);

        imageUrl = req.file?.path || "";

        const result = await UserService.createUser({
            name,
            email,
            password: hashedPassword,
            phone,
            image: imageUrl,
        });

        res.status(201).json(result)
    } catch (error) {
        console.log(error);
        if (imageUrl) {
            await deleteImageFromCloudinary(imageUrl);
        }
        res.status(500).send(error);
    }

}

export const UserController = {
    createUser,
}