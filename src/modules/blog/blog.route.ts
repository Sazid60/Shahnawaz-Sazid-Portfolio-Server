import express from "express";
import { multerUpload } from "../../config/multer.config";
import { BlogController } from "./blog.controller";

const router = express.Router();

router.post("/", multerUpload.single("file"), BlogController.createBlog);
router.get("/", BlogController.getAllBlogs);
router.get("/:id", BlogController.getBlogById);
router.patch("/:id", multerUpload.single("file"), BlogController.updateBlog);
router.delete("/:id", BlogController.deleteBlog);

export const BlogRouter = router;
