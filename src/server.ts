import http, { Server } from "http";
import app from "./app";
import dotenv from "dotenv";
import { prisma } from "./config/db";
import { seedAdmin } from "./utils/seedAdmin";

dotenv.config();

let server: Server | null = null;

async function connectToDB() {
  try {
    await prisma.$connect();
    console.log(" Database is connected");
  } catch (error) {
    console.error(" Database connection failed", error);
    if (process.env.VERCEL) return;
    process.exit(1);
  }
}

async function startServer() {
  await connectToDB();

  if (!process.env.VERCEL) {
    const PORT = process.env.PORT || 5000;
    server = http.createServer(app);
    server.listen(PORT, () => {
      console.log(` Server running on port ${PORT}`);
    });

    handleProcessEvents();
  }
}

async function gracefulShutdown(signal: string) {
  console.warn(`Received ${signal}, shutting down gracefully...`);

  if (server) {
    server.close(() => {
      console.log("HTTP server closed.");
      process.exit(0);
    });
  } else {
    process.exit(0);
  }
}

function handleProcessEvents() {
  process.on("SIGTERM", () => gracefulShutdown("SIGTERM"));
  process.on("SIGINT", () => gracefulShutdown("SIGINT"));
  process.on("uncaughtException", (error) => {
    console.error("Uncaught Exception:", error);
    gracefulShutdown("uncaughtException");
  });
  process.on("unhandledRejection", (reason) => {
    console.error("Unhandled Rejection:", reason);
    gracefulShutdown("unhandledRejection");
  });
}


(async () => {
  await startServer();

  const admin = await prisma.user.findFirst({ where: { role: "ADMIN" } });
  if (!admin) {
    await seedAdmin();
  }
})();


export default app;
