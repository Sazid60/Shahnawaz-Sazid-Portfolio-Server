"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.BlogController = void 0;
const blog_service_1 = require("./blog.service");
const cloudinary_config_1 = require("../../config/cloudinary.config");
const createBlog = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    let thumbnailUrl = "";
    try {
        const { title, content, tags, authorId, featured } = JSON.parse(req.body.data);
        thumbnailUrl = ((_a = req.file) === null || _a === void 0 ? void 0 : _a.path) || "";
        const payload = {
            title,
            content,
            tags,
            featured: featured !== null && featured !== void 0 ? featured : false,
            thumbnail: thumbnailUrl,
            author: { connect: { id: authorId } },
        };
        const result = yield blog_service_1.BlogService.createBlog(payload);
        res.status(201).json({
            success: true,
            message: "Blog created successfully",
            data: result,
        });
    }
    catch (error) {
        if (thumbnailUrl)
            yield (0, cloudinary_config_1.deleteImageFromCloudinary)(thumbnailUrl);
        res.status(500).json({
            success: false,
            message: "Failed to create blog",
            error: error.message,
        });
    }
});
const getAllBlogs = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const page = Number(req.query.page) || 1;
        const limit = Number(req.query.limit) || 10;
        const search = req.query.search || "";
        const isFeatured = req.query.isFeatured ? req.query.isFeatured === "true" : undefined;
        const tags = req.query.tags ? req.query.tags.split(",") : [];
        const sortBy = req.query.sortBy || "createdAt";
        const sortOrder = req.query.sortOrder === "asc" ? "asc" : "desc";
        const result = yield blog_service_1.BlogService.getAllBlogs({
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
    }
    catch (error) {
        res.status(500).json({
            success: false,
            message: "Failed to fetch blogs",
            error: error.message,
        });
    }
});
const getBlogById = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const id = parseInt(req.params.id);
        const result = yield blog_service_1.BlogService.getBlogById(id);
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
    }
    catch (error) {
        res.status(500).json({
            success: false,
            message: "Failed to fetch blog",
            error: error.message,
        });
    }
});
const updateBlog = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    let newThumbnailUrl = "";
    try {
        const id = parseInt(req.params.id);
        const updates = req.body.data ? JSON.parse(req.body.data) : {};
        const blog = yield blog_service_1.BlogService.getBlogById(id);
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
        const result = yield blog_service_1.BlogService.updateBlog(id, updates);
        if (newThumbnailUrl && result)
            yield (0, cloudinary_config_1.deleteImageFromCloudinary)(blog.thumbnail);
        res.status(200).json({
            success: true,
            message: "Blog updated successfully",
            data: result,
        });
    }
    catch (error) {
        if (newThumbnailUrl)
            yield (0, cloudinary_config_1.deleteImageFromCloudinary)(newThumbnailUrl);
        res.status(500).json({
            success: false,
            message: "Failed to update blog",
            error: error.message,
        });
    }
});
const deleteBlog = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const id = parseInt(req.params.id);
        const blog = yield blog_service_1.BlogService.getBlogById(id);
        if (!blog) {
            return res.status(404).json({
                success: false,
                message: "Blog not found",
            });
        }
        const result = yield blog_service_1.BlogService.deleteBlog(id);
        if (result)
            yield (0, cloudinary_config_1.deleteImageFromCloudinary)(blog.thumbnail);
        res.status(200).json({
            success: true,
            message: "Blog deleted successfully",
            data: result,
        });
    }
    catch (error) {
        res.status(500).json({
            success: false,
            message: "Failed to delete blog",
            error: error.message,
        });
    }
});
exports.BlogController = {
    createBlog,
    getAllBlogs,
    getBlogById,
    updateBlog,
    deleteBlog,
};
