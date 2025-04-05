import { googleAiKey } from "..";

const getAiResponse = async (code: string) => {
    const message = `Analyze this JavaScript/TypeScript code and provide feedback on best practices, performance, and possible errors: \n ${code}`;

    const response = await googleAiKey.models.generateContent({
        model: "gemini-2.0-flash",
        contents: message,
    });
    return response;
};

export default getAiResponse;