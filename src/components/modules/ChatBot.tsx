import { useState, type ChangeEvent, type KeyboardEvent } from "react";
import { IoSend } from "react-icons/io5";
import styles from "@/components/modules/css/chatBot/route.module.css";
import { geminiChatBot } from "@/services/geminiApi";
import type { MarketType } from "@/types/marketTypes";
import Loader from "../loader/Loader";

interface ChatBotProps {
  data: MarketType["data"];
}
const ChatBot = ({ data }: ChatBotProps) => {
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState<string[]>([]);
  const [response, setResponse] = useState<string | null>("");
  const [loading, setLoading] = useState(false);

  const sendHandler = async () => {
    if (!message.trim()) return;
    setLoading(true);
    setMessages((prev) => [...prev, message]);
    setMessage("");

    const res = await geminiChatBot(message, data, setLoading);

    setResponse(res);
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
          <p className={styles.messages__user} key={index}>
            <span>user</span>
            {currentMessage}
          </p>
        ))}
        {!!response?.length &&
          (!response.includes("Failed") ? (
            <span className={styles["chat__ai-response-success"]}>
              <span>bot</span>
              {response}
            </span>
          ) : (
            <span className={styles["chat__ai-response-failed"]}>
              <span>bot</span>
              {response}
            </span>
          ))}
        {loading && (
          <div className="bg-blue-500 flex justify-center items-center mt-2  rounded-md w-[30%] h-8">
            {<Loader small={true} />}
          </div>
        )}
      </div>

      <div className={styles.chat__message}>
        <textarea
          className={styles.message__content}
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
