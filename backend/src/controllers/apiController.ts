import { Request, Response, Router } from "express";
import getAiResponse from "../services/googleAi";
import { history, HistoryEntry } from "../services/inMemoryDatabase";

const router = Router();

router.post('/review', async (request: Request, response: Response) => {
    try {
        const code = request.body.code;

        if (!code || typeof code !== "string") {
            response.status(400).json({ error: "Invalid input. Please provide code as a string." });
        }

        const aiRes = await getAiResponse(code);
        const entry: HistoryEntry = {
            id: aiRes.responseId,
            prompt: code,
            response: aiRes.text,
            timestamp: new Date().toISOString(),
        };

        history.push(entry);
        response.status(200).json({message: aiRes.text});
    } catch (error) {
        response.status(500).json({ error: "Error while receiving feedback from AI."});
    }
});

router.get('/history', async (request: Request, response: Response) => {
    response.json(history);
});

export default router;