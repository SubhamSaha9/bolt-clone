import {
    GoogleGenerativeAI
} from "@google/generative-ai";

const apiKey = import.meta.env.VITE_GEMINI_API_KEY;
const genAI = new GoogleGenerativeAI(apiKey!);

const model = genAI.getGenerativeModel({
    model: "gemini-2.0-flash-exp",
});

const chatGenerationConfig = {
    temperature: 1,
    topP: 0.95,
    topK: 40,
    maxOutputTokens: 8192,
    responseMimeType: "text/plain",
};
const generationConfig = {
    temperature: 1,
    topP: 0.95,
    topK: 40,
    maxOutputTokens: 8192,
    responseMimeType: "application/json",
};

export const aiChatSession = model.startChat({
    generationConfig: chatGenerationConfig,
    history: [
    ],
});
export const aiCodeSession = model.startChat({
    generationConfig,
    history: [
    ],
});