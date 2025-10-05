import { Request, Response } from "express";
import { BlogService } from "./blog.service";
import { deleteImageFromCloudinary } from "../../config/cloudinary.config";

const createBlog = async (req: Request, res: Response) => {
    let thumbnailUrl: string = "";

    try {
        thumbnailUrl = req.file?.path || "";

        const { title, content, tags, authorId, featured } = JSON.parse(req.body.data);

        const payload = {
            title,
            content,
            tags: Array.isArray(tags) ? tags : (tags ? tags.split(",").map((t: string) => t.trim()) : []),
            featured: featured ?? false,
            author: { connect: { id: authorId } },
            thumbnail: thumbnailUrl,
        };

        console.log(payload)

        const result = await BlogService.createBlog(payload);

        res.status(201).json({
            success: true,
            message: "Blog created successfully",
            data: result,
        });
    } catch (error: any) {
        if (thumbnailUrl) await deleteImageFromCloudinary(thumbnailUrl);
        console.log(error)
        res.status(500).json({
            success: false,
            message: "Failed to create blog",
            error: error.message,
        });
    }
};

const getAllBlogs = async (req: Request, res: Response) => {
    try {
        const page = Number(req.query.page) || 1;
        const limit = Number(req.query.limit) || 10;
        const search = (req.query.search as string) || "";
        const isFeatured = req.query.isFeatured ? req.query.isFeatured === "true" : undefined;
        const tags = req.query.tags ? (req.query.tags as string).split(",") : [];
        const sortBy = (req.query.sortBy as string) || "createdAt";
        const sortOrder = (req.query.sortOrder as string) === "asc" ? "asc" : "desc";

        const result = await BlogService.getAllBlogs({
            page,
            limit,
            search,
            isFeatured,
            tags,
            sortBy,
            sortOrder,
        });

        res.status(200).json({
            success: true,
            message: "Blogs fetched successfully",
            data: result.data,
            pagination: result.pagination,
        });
    } catch (error: any) {
        res.status(500).json({
            success: false,
            message: "Failed to fetch blogs",
            error: error.message,
        });
    }
};

const getBlogById = async (req: Request, res: Response) => {
    try {
        const id = parseInt(req.params.id);
        const result = await BlogService.getBlogById(id);

        if (!result) {
            return res.status(404).json({
                success: false,
                message: "Blog not found",
            });
        }

        res.status(200).json({
            success: true,
            message: "Blog fetched successfully",
            data: result,
        });
    } catch (error: any) {
        res.status(500).json({
            success: false,
            message: "Failed to fetch blog",
            error: error.message,
        });
    }
};

const updateBlog = async (req: Request, res: Response) => {
    let newThumbnailUrl: string = "";

    try {
        const id = parseInt(req.params.id);
        const updates = req.body.data ? JSON.parse(req.body.data) : {};

        if (updates.thumbnail === null) delete updates.thumbnail;

        const blog = await BlogService.getBlogById(id);

        if (!blog) {
            return res.status(404).json({
                success: false,
                message: "Blog not found",
            });
        }


        if (req.file) {
            newThumbnailUrl = req.file.path;
            updates.thumbnail = newThumbnailUrl;
        }


        const result = await BlogService.updateBlog(id, updates);
        if (newThumbnailUrl && result) await deleteImageFromCloudinary(blog.thumbnail);

        res.status(200).json({
            success: true,
            message: "Blog updated successfully",
            data: result,
        });
    } catch (error: any) {
        if (newThumbnailUrl) await deleteImageFromCloudinary(newThumbnailUrl);
        console.log(error)
        res.status(500).json({
            success: false,
            message: "Failed to update blog",
            error: error.message,
        });
    }
};

const deleteBlog = async (req: Request, res: Response) => {
    try {
        const id = parseInt(req.params.id);


        const blog = await BlogService.getBlogById(id);

        if (!blog) {
            return res.status(404).json({
                success: false,
                message: "Blog not found",
            });
        }

        const result = await BlogService.deleteBlog(id);

        if (result) await deleteImageFromCloudinary(blog.thumbnail);

        res.status(200).json({
            success: true,
            message: "Blog deleted successfully",
            data: result,
        });
    } catch (error: any) {
        res.status(500).json({
            success: false,
            message: "Failed to delete blog",
            error: error.message,
        });
    }
};

export const BlogController = {
    createBlog,
    getAllBlogs,
    getBlogById,
    updateBlog,
    deleteBlog,
};
