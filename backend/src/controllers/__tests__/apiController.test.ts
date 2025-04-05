import request from "supertest";
import app from "../../app";
import getAiResponse from "../../services/googleAi";

jest.mock("../../services/googleAi", () => jest.fn());

describe("/api/review endpoint", () => {
    it("should return 400 if no code is provided", async () => {
        const response = await request(app).post("/api/review").send({});
        expect(response.status).toBe(400);
        expect(response.body.error).toBe("Invalid input. Please provide code as a string.");
    });

    it("should return AI feedback for valid code", async () => {
        (getAiResponse as jest.Mock).mockResolvedValue({ text: "This is a mock AI response." });

        const response = await request(app).post("/api/review").send({ code: "const x = 42;" });
        expect(response.body.message).toBe("This is a mock AI response.");
        expect(response.status).toBe(200);
        
        
        expect(getAiResponse).toHaveBeenCalledWith("const x = 42;");
    });
});