import React, { useState } from "react";
import { GiftedChat, IMessage } from "react-native-gifted-chat";
import * as S from "./styles";
import { fetchChatIaApi } from "../../services/apiServiceChat";
import { fetchImageIaApi } from "../../services/apiServiceImages";
import { CustomInputToolbar } from "../../components";

const ChatBot: React.FC = () => {
  const [messages, setMessages] = useState<IMessage[]>([]);
  const [inputMessage, setInputMessage] = useState("");
  const [outputMessage, setoutputMessage] = useState("");

  const handleButtonClick = () => {
    if (inputMessage.toLocaleLowerCase().startsWith("foto")) {
      generateImages();
    } else {
      generateText();
    }
    setInputMessage("");
  };

  const generateText = () => {
    fetchChatIaApi(
      inputMessage,
      setMessages,
      setInputMessage,
      setoutputMessage
    );
  };

  const generateImages = (): void => {
    fetchImageIaApi(
      inputMessage,
      setMessages,
      setInputMessage,
      setoutputMessage
    );
  };

  const handleTextInput = (text: string) => {
    setInputMessage(text);
    console.log(text);
  };

  return (
    <S.Container>
        <GiftedChat
          messages={messages}
          user={{ _id: 1 }}
          renderInputToolbar={() => (
            <CustomInputToolbar
              text={inputMessage}
              onSend={handleButtonClick}
              placeholder="Pergunte-me..."
              onTextChange={handleTextInput}
            />
          )}
        />
    </S.Container>
  );
};

export default ChatBot;
