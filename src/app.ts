
import express, { Request, Response } from "express"
import compression from "compression";
import cors from "cors";
import { UserRouter } from "./modules/user/user.route";
import { AuthRouter } from "./modules/auth/auth.route";
import { BlogRouter } from "./modules/blog/blog.route";
import { ProjectRouter } from "./modules/project/project.route";
import { ResumeRouter } from "./modules/resume/resume.route";
import { AcademicRouter } from "./modules/academics/academics.route";
import { SkillRouter } from "./modules/skills/skill.route";
import { ExperienceRouter } from "./modules/experience/experience.route";




const app = express()

app.use(cors());
app.use(compression());
app.use(express.json());

app.use(
  cors({
    origin: "http://localhost:3000",
    credentials: true,
  })
);

app.use("/api/v1/user", UserRouter);
app.use("/api/v1/auth", AuthRouter)
app.use("/api/v1/blog", BlogRouter)
app.use("/api/v1/project", ProjectRouter)
app.use("/api/v1/resume", ResumeRouter)
app.use("/api/v1/academic", AcademicRouter)
app.use("/api/v1/skill", SkillRouter)
app.use("/api/v1/experience", ExperienceRouter)

app.get("/", (req: Request, res: Response) => {
  res.status(200).json({
    message: "Welcome To The App"
  })
})

app.use((req: Request, res: Response) => {
  res.status(404).json({
    success: false,
    message: "Route Not Found",
  });
});

export default app