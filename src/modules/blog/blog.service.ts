import { Blog, Prisma } from "@prisma/client";
import { prisma } from "../../config/db";

const createBlog = async (payload: Prisma.BlogCreateInput): Promise<Blog> => {
    return prisma.blog.create({
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
};

const getAllBlogs = async ({
    page = 1,
    limit = 10,
    search,
    isFeatured,
    tags,
    sortBy = "createdAt",
    sortOrder = "desc"
}: {
    page?: number;
    limit?: number;
    search?: string;
    isFeatured?: boolean;
    tags?: string[];
    sortBy?: string;
    sortOrder?: "asc" | "desc";
}) => {
    const skip = (page - 1) * limit;

    const where: any = {
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

    const result = await prisma.blog.findMany({
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

    const total = await prisma.blog.count({ where });

    return {
        data: result,
        pagination: {
            page,
            limit,
            total,
            totalPages: Math.ceil(total / limit),
        },
    };
};

const getBlogById = async (id: number): Promise<Blog | null> => {
    return prisma.$transaction(async (tx) => {
        await tx.blog.update({
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
    });
};

const updateBlog = async (id: number, updates: Prisma.BlogUpdateInput): Promise<Blog> => {
    return prisma.blog.update({
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
};

const deleteBlog = async (id: number): Promise<Blog> => {
    return prisma.blog.delete({
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
};

export const BlogService = {
    createBlog,
    getAllBlogs,
    getBlogById,
    updateBlog,
    deleteBlog,
};
