import { GiftedChat, IMessage } from "react-native-gifted-chat";
import { ChatGPTKey } from "../config/env";
import { ImageGenerationResponse } from "../types/message";

const API_URL = "https://api.openai.com/v1/images/generations";

export const fetchImageIaApi = async (
  inputMessage: string,
  setMessages: React.Dispatch<React.SetStateAction<IMessage[]>>,
  setInputMessage: React.Dispatch<React.SetStateAction<string>>,
  setOutputMessage: React.Dispatch<React.SetStateAction<string>>
): Promise<void> => {
  try {
    const message = {
      _id: Math.random().toString(36).substring(7),
      text: inputMessage,
      createdAt: new Date(),
      user: { _id: 1 },
    };

    setMessages((previousMessages) => {
      return GiftedChat.append(previousMessages, [message]);
    });

    const response = await fetch(API_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${ChatGPTKey}`,
      },
      body: JSON.stringify({
        "prompt": inputMessage,
        "n": 2,
        "size": "1024x1024",
      }),
    });

    console.log('aqui', response)

    if (!response.ok) {
      throw new Error("Erro na solicitação à API");
    }

    const data: ImageGenerationResponse = await response.json();

    setInputMessage("");
    setOutputMessage(data.data[0].url);

    data.data.forEach((item) => {
      const message = {
        _id: Math.random().toString(36).substring(7),
        text: "Image",
        createdAt: new Date(),
        user: { _id: 2, name: "Open IA" },
        image: item.url,
      };

      setMessages((previousMessages) => {
        return GiftedChat.append(previousMessages, [message]);
      });
    });
  } catch (error) {
    console.error("API Fetch Error:", error);
  }
};
