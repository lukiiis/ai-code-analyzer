import { googleAiKey } from "../..";
import getAiResponse from "../googleAi";

jest.mock("../..", () => ({
  googleAiKey: {
    models: {
      generateContent: jest.fn(),
    },
  },
}));

describe("getAiResponse", () => {
  it("should return AI feedback for valid code", async () => {
    const mockResponse = { text: "This is a mock AI response." };
    (googleAiKey.models.generateContent as jest.Mock).mockResolvedValue(mockResponse);

    const code = "const x = 42;";
    const result = await getAiResponse(code);

    expect(googleAiKey.models.generateContent).toHaveBeenCalledWith({
      model: "gemini-2.0-flash",
      contents: expect.stringContaining(code),
    });
    expect(result).toEqual(mockResponse);
  });

  it("should throw an error if AI service fails", async () => {
    (googleAiKey.models.generateContent as jest.Mock).mockRejectedValue(new Error("AI service error"));

    const code = "const x = 42;";
    await expect(getAiResponse(code)).rejects.toThrow("AI service error");
  });
});