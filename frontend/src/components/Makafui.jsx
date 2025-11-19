import React, { useState } from "react";

import { askMentor } from "@/lib/ai-assistant";
import { BotMessageSquare, Ellipsis } from "lucide-react";
import { useUser } from "@/utils/UserProvider";
import Loading from "./Loading";
import ReactMarkdown from "react-markdown";

const Makafui = ({}) => {
  const { loggedUser, userProfile, isLoading } = useUser();
  const [input, setInput] = useState();
  const [messages, setMessages] = useState([]);
  const [isQuerying, setIsQuerying] = useState(false);

  const handleQuery = async () => {
    if (!input?.trim()) return;

    const userMessage = { role: "user", content: input };

    const newHistory = [...messages, userMessage];

    setMessages(newHistory); // add user message immediately
    setInput("");
    setIsQuerying(true);

    const response = await askMentor(
      input,
      userProfile.skill_path,
      loggedUser.user_metadata.display_name,
      newHistory // send full history INCLUDING this message
    );

    setIsQuerying(false);

    const assistantMessage = {
      role: "assistant",
      content: response,
    };

    // Add assistant message using functional update (correct)
    setMessages((prev) => [...prev, assistantMessage]);
  };

  const handleChange = (value) => {
    setInput(value);
  };

  if (isLoading) {
    return <Loading />;
  }

  return (
    <div className="w-full h-full relative rounded-xl pt-17">
      <div className="w-full h-15 shadow-sm px-3 absolute left-0 top-0 flex items-center rounded-xl z-20">
        <div className="flex gap-2 items-center">
          <div className="grid rounded-full aspect-square w-8 bg-primary place-items-center">
            <BotMessageSquare size={14} className="text-white" />
          </div>
          <p className="font-bold text-lg">Makafui</p>
        </div>
        {isQuerying ? (
          <div className="animate-bounce">
            <div className="flex items-end ml-4 mt-3 text-foreground/30 animate-pulse">
              <p className="text-sm">typing</p>
              <Ellipsis className="" size={14} />
            </div>
          </div>
        ) : (
          <></>
        )}
      </div>
      <div className="w-full h-20 px-3 absolute left-0 bottom-0 bg-background flex items-center border rounded-bl-xl rounded-br-xl z-20 border-border gap-2">
        <input
          type="text"
          className="rounded-xl bg-foreground/3 py-3 w-3/4 focus:outline-0 px-2"
          onChange={(e) => {
            handleChange(e.target.value);
          }}
          value={input}
        />
        <button
          className="bg-primary rounded-xl text-white w-1/4 py-3 cursor-pointer hover:bg-primary/80 duration-300 text-xs"
          onClick={handleQuery}
          type="submit"
        >
          Ask Makafui
        </button>
      </div>
      <div className="overflow-y-scroll h-9/10 py-10 px-8">
        {messages.map((message, index) =>
          message.role === "user" ? (
            <div className="flex w-full justify-end mt-3" key={index}>
              <div className="px-3 py-2 bg-accent rounded-2xl rounded-br-none w-fit max-w-2/3 leading-6">
                {message.content}
              </div>
            </div>
          ) : (
            <div className="flex w-full mt-3" key={index}>
              <div className="px-8 py-3 bg-primary/5 text-accent-dark rounded-3xl rounded-bl-sm w-fit max-w-4/5 leading-6">
                <ReactMarkdown>{message.content}</ReactMarkdown>
              </div>
            </div>
          )
        )}
      </div>
    </div>
  );
};

export default Makafui;
