import { Request, Response, Router } from "express";
import getAiResponse from "../services/googleAi";
import * as ts from "typescript";

const router = Router();

router.post('/review', async (request: Request, response: Response) => {
    try {
        const code = request.body.code;

        if (!code || typeof code !== "string") {
            response.status(400).json({ error: "Invalid input. Please provide code as a string." });
        }

        const aiRes = await getAiResponse(code);
        response.status(200).json({message: aiRes.text});
    } catch (error) {
        response.status(500).json({ error: "Error while receiving feedback from AI."});
    }
});

export default router;