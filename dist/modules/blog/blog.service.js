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
exports.BlogService = void 0;
const db_1 = require("../../config/db");
const createBlog = (payload) => __awaiter(void 0, void 0, void 0, function* () {
    return db_1.prisma.blog.create({
        data: payload,
        include: {
            author: {
                select: {
                    id: true,
                    name: true,
                    image: true,
                },
            },
        },
    });
});
const getAllBlogs = (_a) => __awaiter(void 0, [_a], void 0, function* ({ page = 1, limit = 10, search, isFeatured, tags, sortBy = "createdAt", sortOrder = "desc" }) {
    const skip = (page - 1) * limit;
    const where = {
        AND: [
            search && {
                OR: [
                    { title: { contains: search, mode: "insensitive" } },
                    { content: { path: ["intro"], string_contains: search } },
                    { content: { path: ["details"], string_contains: search } },
                ],
            },
            typeof isFeatured === "boolean" && { featured: isFeatured },
            tags && tags.length > 0 && { tags: { hasEvery: tags } },
        ].filter(Boolean),
    };
    const result = yield db_1.prisma.blog.findMany({
        skip,
        take: limit,
        where,
        orderBy: {
            [sortBy]: sortOrder,
        },
        include: {
            author: {
                select: {
                    id: true,
                    name: true,
                    image: true,
                },
            },
        },
    });
    const total = yield db_1.prisma.blog.count({ where });
    return {
        data: result,
        pagination: {
            page,
            limit,
            total,
            totalPages: Math.ceil(total / limit),
        },
    };
});
const getBlogById = (id) => __awaiter(void 0, void 0, void 0, function* () {
    return db_1.prisma.$transaction((tx) => __awaiter(void 0, void 0, void 0, function* () {
        yield tx.blog.update({
            where: { id },
            data: { views: { increment: 1 } },
        });
        return tx.blog.findUnique({
            where: { id },
            include: {
                author: {
                    select: {
                        id: true,
                        name: true,
                        image: true,
                    },
                },
            },
        });
    }));
});
const updateBlog = (id, updates) => __awaiter(void 0, void 0, void 0, function* () {
    return db_1.prisma.blog.update({
        where: { id },
        data: updates,
        include: {
            author: {
                select: {
                    id: true,
                    name: true,
                    image: true,
                },
            },
        },
    });
});
const deleteBlog = (id) => __awaiter(void 0, void 0, void 0, function* () {
    return db_1.prisma.blog.delete({
        where: { id },
        include: {
            author: {
                select: {
                    id: true,
                    name: true,
                    image: true,
                },
            },
        },
    });
});
exports.BlogService = {
    createBlog,
    getAllBlogs,
    getBlogById,
    updateBlog,
    deleteBlog,
};
