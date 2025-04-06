import express, { Application, Request, Response } from 'express';
import cors from 'cors';
import apiController from "./controllers/apiController";
// import { errorHandler } from './middlewares/errorHandler';

const app: Application = express();

app.use(express.json());
app.use(cors({ origin: 'http://localhost:5173' }));

app.use("/api", apiController);

// app.use(errorHandler);

export default app;