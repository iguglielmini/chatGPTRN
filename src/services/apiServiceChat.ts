import { ChatGPTKey } from "../config/env";
import * as Speech from "expo-speech";

import { GiftedChat, IMessage } from "react-native-gifted-chat";

const API_URL = "https://api.openai.com/v1/chat/completions";

export const fetchChatIaApi = (
  inputMessage: string,
  setMessages: React.Dispatch<React.SetStateAction<IMessage[]>>,
  setInputMessage: React.Dispatch<React.SetStateAction<string>>,
  setOutputMessage: React.Dispatch<React.SetStateAction<string>>
): void => {
  console.log("Button Clicado", inputMessage);

  const userMessage = {
    _id: Math.random().toString(36).substring(7),
    text: inputMessage,
    createdAt: new Date(),
    user: { _id: 1 },
  };

  setMessages((previousMessages) => {
    return GiftedChat.append(previousMessages, [userMessage]);
  });

  fetch(API_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${ChatGPTKey.apiKey}`,
    },
    body: JSON.stringify({
      messages: [{ role: "user", content: inputMessage }],
      model: "gpt-3.5-turbo",
    }),
  })
    .then((response) => response.json())
    .then((data) => {
      console.log("data", data.choices[0].message.content.trim());
      setInputMessage("");
      setOutputMessage(data.choices[0].message.content.trim());

      const responseMessage = {
        _id: Math.random().toString(36).substring(7),
        text: data.choices[0].message.content.trim(),
        createdAt: new Date(),
        user: { _id: 2, name: "Open AI" },
      };

      setMessages((previousMessages) => {
        return GiftedChat.append(previousMessages, [responseMessage]);
      });

      const options = {};
      Speech.speak(data.choices[0].message.content.trim(), options);
    })
    .catch((error) => console.error("API Fetch Error:", error));
};
