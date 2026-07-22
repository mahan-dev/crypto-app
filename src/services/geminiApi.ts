import type { MarketType } from "@/types/marketTypes";
import { GoogleGenAI } from "@google/genai";
import type { Dispatch, SetStateAction } from "react";

const genAiApiKey = import.meta.env.VITE_GEN_AI_API_KEY;

const ai = new GoogleGenAI({
  apiKey: genAiApiKey,
});

const prompt = `
You are CryptoGPT, a concise cryptocurrency assistant.

Rules:
- You are the assistance of the websocket-crypto.
- Answer only cryptocurrency-related questions.
- Keep answers short and clear.
- Do not use markdown headings.
- Do not use bullet points unless the user asks for a list.
- Avoid long explanations.
- Answer in 3-5 sentences maximum.
- Use the provided crypto data only.
- Never invent prices.
- Do not give guaranteed investment advice.
`;
export const geminiChatBot = async (
  question: string,
  cryptoData: MarketType["data"],
  setLoading: Dispatch<SetStateAction<boolean>>,
): Promise<string | null> => {
  const convertedData = JSON.stringify(cryptoData);

  try {
    const response = await ai.models.generateContent({
      model: "models/gemini-3.5-flash",
      contents: `${prompt} Current cryptoData : ${convertedData}  User : ${question}`,
    });
    return response.text || null;
  } catch (error) {
    console.log(error);
    return "Failed";
  } finally {
    setLoading(false);
  }
};
