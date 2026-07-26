import { useState, type ChangeEvent, type KeyboardEvent } from "react";
import { IoSend } from "react-icons/io5";
import styles from "@/components/modules/css/chatBot/route.module.css";

import type { MarketType } from "@/types/marketTypes";
import Loader from "../loader/Loader";
import { ChatMessageHandler } from "@/helper/chatBot/ChatMessageHandler";
import { IoIosArrowDown } from "react-icons/io";
import { IoIosArrowUp } from "react-icons/io";
interface ChatBotProps {
  data: MarketType["data"];
}

export type Message = {
  role: "USER" | "BOT";
  text: string;
};

const ChatBot = ({ data }: ChatBotProps) => {
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState<Message[]>([
    { role: "BOT", text: "Hey, I'm coinzed assistance how can i help you ? " },
  ]);
  const [loading, setLoading] = useState(false);
  const [chatIcon, setChatIcon] = useState(false);

  const sendHandler = async () => {
    await ChatMessageHandler({
      message,
      setLoading,
      setMessages,
      data,
      setMessage,
    });
  };

  const chatIconHandler = () => {
    setChatIcon(!chatIcon);
  };

  const enterClickHandler = (e: KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Enter") {
      e.preventDefault();
      sendHandler();
    }
  };

  return (
    <section className={styles.chat}>
      <h3 className={styles.chat__header}>Chat</h3>

      <div
        className={`${styles.chat__messages} ${messages.length ? "block" : "hidden"}`}
      >
        {messages.map((currentMessage, index) => (
          <p
            className={
              currentMessage.role === "BOT"
                ? styles["chat__ai-response-success"]
                : styles.messages__user
            }
            key={index}
          >
            <span>{currentMessage.role === "BOT" ? "bot" : "user"}</span>

            {currentMessage.text}
          </p>
        ))}

        {loading && (
          <div className={styles.chat}>{<Loader small={true} />}</div>
        )}
      </div>

      <div className={styles.chat__message}>
        <div
          className="flex h-3 overflow-hidden justify-center items-center cursor-pointer"
          onClick={chatIconHandler}
        >
          {chatIcon ? (
            <IoIosArrowUp className="w-40 h-6 " />
          ) : (
            <IoIosArrowDown className="w-40 h-6 " />
          )}
        </div>
        <textarea
          className={`${styles.message__content} overflow-hidden transition-all duration-300 ${
            chatIcon ? "max-h-0 opacity-0" : "max-h-40 opacity-100"
          }`}
          onChange={(e: ChangeEvent<HTMLTextAreaElement>) =>
            setMessage(e.target.value)
          }
          onKeyDown={enterClickHandler}
          value={message}
        />
        <div
          className={`${loading ? styles["chat__send--disabled"] : styles.chat__send}`}
          onClick={sendHandler}
        >
          <IoSend />
        </div>
      </div>
    </section>
  );
};

export default ChatBot;
