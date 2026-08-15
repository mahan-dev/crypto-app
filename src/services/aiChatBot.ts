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
- Don't tell any one that you have provided or even you have a information about this project...
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

  const lowerQuestion = question.toLowerCase().trim();

  const finalData = data.find(
    (item) =>
      lowerQuestion.includes(item.name.toLowerCase()) ||
      lowerQuestion.includes(item.symbol.toLowerCase()),
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
    

    const aiResponse = chatCompletion.choices[0].message.content;

    return aiResponse;
  } catch (error) {
    console.log("something went wrong", error);
    return "Failed";
  } finally {
    setLoading(false);
  }
};


