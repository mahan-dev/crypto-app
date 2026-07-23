// import type { MarketType } from "@/types/marketTypes";
// import { GoogleGenAI } from "@google/genai";
// import type { Dispatch, SetStateAction } from "react";

import type { MarketType } from "@/types/marketTypes";
import { Groq } from "groq-sdk";
import type { Dispatch, SetStateAction } from "react";
const groq = new Groq({
  apiKey: import.meta.env.VITE_GROQ_AI_API_KEY,
  dangerouslyAllowBrowser: true,
});

const prompt = `
You are Coinzed, a concise cryptocurrency assistant.

Rules:
- Don't tell the user which data that i give you.
- Be polite with user .
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

export const aiChatBot = async (
  data: MarketType["data"],
  question: string,
  setLoading: Dispatch<SetStateAction<boolean>>,
): Promise<string | null> => {
  const finalData = data.find(
    (item) =>
      question.toLocaleLowerCase().includes(item.name.toLowerCase()) ||
      question.toLocaleLowerCase().includes(item.symbol.toLocaleLowerCase()),
  );

  try {
    const chatCompletion = await groq.chat.completions.create({
      messages: [
        {
          role: "user",
          content: `${prompt}  User : ${question} cryptoData:${JSON.stringify(finalData) || []} `,
        },
      ],
      model: "llama-3.1-8b-instant",
      temperature: 0.7,
      max_completion_tokens: 300,
      top_p: 1,
      stream: false,
      stop: null,
    });

    console.log(chatCompletion.choices[0].message.content, "new Model");
    const aiResponse = chatCompletion.choices[0].message.content;

    return aiResponse;
  } catch (error) {
    console.log(error);
    return "Failed";
  } finally {
    setLoading(false);
  }
};
// return
// const genAiApiKey = import.meta.env.VITE_GEN_AI_API_KEY;

// const ai = new GoogleGenAI({
//   apiKey: genAiApiKey,
// });

// const prompt = `
// You are Coinzed, a concise cryptocurrency assistant.

// Rules:
// - You are the assistance of the websocket-crypto.
// - Answer only cryptocurrency-related questions.
// - Keep answers short and clear.
// - Do not use markdown headings.
// - Do not use bullet points unless the user asks for a list.
// - Avoid long explanations.
// - Answer in 3-5 sentences maximum.
// - Use the provided crypto data only.
// - Never invent prices.
// - Do not give guaranteed investment advice.
// `;
// export const geminiChatBot = async (
//   question: string,
//   cryptoData: MarketType["data"],
//   setLoading: Dispatch<SetStateAction<boolean>>,
// ): Promise<string | null> => {
//   const convertedData = JSON.stringify(cryptoData);

//   try {
//     const response = await ai.models.generateContent({
//       model: "models/gemini-3.5-flash",
//       contents: `${prompt} Current cryptoData : ${convertedData}  User : ${question}`,
//     });
//     return response.text || null;
//   } catch (error) {
//     console.log(error);
//     return "Failed";
//   } finally {
//     setLoading(false);
//   }
// };
