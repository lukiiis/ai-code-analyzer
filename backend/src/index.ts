import { GoogleGenAI } from "@google/genai";
import app from "./app";
import dotenv from "dotenv";
// import { connectToDatabase, closeDatabaseConnection } from "./db/connection";

dotenv.config();
export const googleAiKey = new GoogleGenAI({ apiKey: process.env.GOOGLE_AI_KEY });
const port = process.env.PORT || 3000;

const server = app.listen(port, async () => {
  console.log(`Server running on port ${port}`);
});

// Graceful shutdown
const onCloseSignal = () => {
  console.log("SIGINT received, shutting down");
  server.close(async () => {
    console.log("Server closed");
    process.exit();
  });
  setTimeout(() => process.exit(1), 10000).unref();
};

process.on("SIGINT", onCloseSignal);
process.on("SIGTERM", onCloseSignal);