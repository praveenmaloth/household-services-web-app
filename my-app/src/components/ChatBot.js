import { useEffect } from "react";

const ChatBot = () => {
  useEffect(() => {
    import("https://cdn.jsdelivr.net/npm/@denserai/embed-chat@1/dist/web.min.js").then((Chatbot) => {
      Chatbot.default.init({
        chatbotId: "6402dd66-7fdd-4e5d-9c8b-14664d65f7bc",
      });
    });
  }, []);

  return null;
};

export default ChatBot;