
import express, { Request, Response } from "express"
import compression from "compression";
import cors from "cors";


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

app.get("/", (req: Request, res: Response) => {
    res.status(200).json({
        message: "Welcome To The App"
    })
})

app.use((req: Request, res:Response) => {
  res.status(404).json({
    success: false,
    message: "Route Not Found",
  });
});

export default app