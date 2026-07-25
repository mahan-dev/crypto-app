import type { Message } from "@/components/modules/ChatBot";
import { aiChatBot } from "@/services/aiChatBot";
import type { MarketType } from "@/types/marketTypes";
import type { Dispatch, SetStateAction } from "react";

interface ChatProps {
  message: string;
  setLoading: Dispatch<SetStateAction<boolean>>;
  setMessages: Dispatch<SetStateAction<Message[]>>;
  setMessage: Dispatch<SetStateAction<string>>;
  data: MarketType["data"];
}

export const ChatMessageHandler = async ({
  message,
  setLoading,
  setMessages,
  data,
  setMessage,
}: ChatProps) => {
  if (!message.trim()) return;
  setLoading(true);
  setMessages((prev) => [
    ...prev,
    {
      role: "USER",
      text: message,
    },
  ]);

  setMessage("");
  const res = await aiChatBot(data, message, setLoading);

  if (!res) return;

  setMessages((prev) => [
    ...prev,
    {
      role: "BOT",
      text: res,
    },
  ]);
};
