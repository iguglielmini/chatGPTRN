import React, { useState } from "react";

import * as S from "./styles";
import { fetchChatIaApi } from "../../services/apiServiceChat";
import { fetchImageIaApi } from "../../services/apiServiceImages";

const ChatBot: React.FC = () => {
  const [inputMessage, setInputMessage] = useState<string>("");
  const [outputMessage, setoutputMessage] = useState<string>("");

  const handleButtonClick = (): void => {
    fetchChatIaApi(inputMessage, setoutputMessage);
  };

  const generateImages = (): void => {
    fetchImageIaApi(inputMessage, setoutputMessage);
  };

  const handleTextInput = (text: string) => {
    setInputMessage(text);
    console.log(text);
  };

  return (
    <S.Container>
      <S.ContentChat>
        <S.TextOutput>{outputMessage}</S.TextOutput>
      </S.ContentChat>
      <S.ContentInput>
        <S.Box>
          <S.Input
            placeholder="Pergunte me..."
            onChangeText={handleTextInput}
          />
        </S.Box>
        <S.ButtonSend onPress={handleButtonClick}>
          <S.ButtonText>Enviar</S.ButtonText>
        </S.ButtonSend>
      </S.ContentInput>
    </S.Container>
  );
};

export default ChatBot;
