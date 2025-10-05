"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const compression_1 = __importDefault(require("compression"));
const cors_1 = __importDefault(require("cors"));
const user_route_1 = require("./modules/user/user.route");
const auth_route_1 = require("./modules/auth/auth.route");
const blog_route_1 = require("./modules/blog/blog.route");
const project_route_1 = require("./modules/project/project.route");
const resume_route_1 = require("./modules/resume/resume.route");
const academics_route_1 = require("./modules/academics/academics.route");
const skill_route_1 = require("./modules/skills/skill.route");
const experience_route_1 = require("./modules/experience/experience.route");
const contact_route_1 = require("./modules/contact/contact.route");
const app = (0, express_1.default)();
app.use((0, cors_1.default)());
app.use((0, compression_1.default)());
app.use(express_1.default.json());
app.use((0, cors_1.default)({
    origin: "https://shahnawaz-sazid.vercel.app",
    credentials: true,
}));
app.use("/api/v1/user", user_route_1.UserRouter);
app.use("/api/v1/auth", auth_route_1.AuthRouter);
app.use("/api/v1/blog", blog_route_1.BlogRouter);
app.use("/api/v1/project", project_route_1.ProjectRouter);
app.use("/api/v1/resume", resume_route_1.ResumeRouter);
app.use("/api/v1/academic", academics_route_1.AcademicRouter);
app.use("/api/v1/skill", skill_route_1.SkillRouter);
app.use("/api/v1/experience", experience_route_1.ExperienceRouter);
app.use("/api/v1/contact", contact_route_1.ContactRouter);
app.get("/", (req, res) => {
    res.status(200).json({
        message: "Welcome To The App"
    });
});
app.use((req, res) => {
    res.status(404).json({
        success: false,
        message: "Route Not Found",
    });
});
exports.default = app;
