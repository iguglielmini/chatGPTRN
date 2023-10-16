import React, { useState } from "react";
import { GiftedChat, IMessage } from "react-native-gifted-chat";
import * as S from "./styles";
import { fetchChatIaApi } from "../../services/apiServiceChat";
import { CustomInputToolbar } from "../../components";

import { accordionJson } from "../../mocks/assimov";

const Assimov: React.FC = () => {
  const [messages, setMessages] = useState<IMessage[]>([]);
  const [inputMessage, setInputMessage] = useState("");
  const [outputMessage, setoutputMessage] = useState("");

  const handleButtonClick = () => {
    generateText(inputMessage);
    setInputMessage("");
  };

  const encontrarRespostaParaPergunta = (
    pergunta: string
  ): string | undefined => {
    const itemEncontrado = accordionJson.find((item) =>
      item.perguntas.includes(pergunta)
    );

    console.log("Pergunta:", pergunta);
    console.log("Item Encontrado:", itemEncontrado);
    // Se um item correspondente for encontrado, retorne o texto da resposta
    if (itemEncontrado) {
      return itemEncontrado.resposta;
    }

    return undefined;
  };

  const generateText = async (pergunta: string) => {
    // Primeiro, tente encontrar uma resposta no mapeamento de perguntas e respostas
    const resposta = encontrarRespostaParaPergunta(pergunta);

    if (resposta) {
      const respostaMessage = {
        _id: Math.random().toString(),
        text: resposta,
        createdAt: new Date(),
        user: { _id: 2, name: "Assimov Bot" },
      };

      setMessages((previousMessages) =>
        GiftedChat.append(previousMessages, [respostaMessage])
      );
    } else {
      // Se a resposta não for encontrada no mapeamento, consulte o ChatGPT
      const respostaDoChatGPT = await fetchChatIaApi(
        pergunta,
        setMessages,
        setInputMessage,
        setoutputMessage
      );

      if (respostaDoChatGPT) {
        const respostaMessage = {
          _id: Math.random().toString(36).substring(7),
          text: respostaDoChatGPT,
          createdAt: new Date(),
          user: { _id: 2, name: "Assimov Bot" },
        };

        setMessages((previousMessages) => {
          return GiftedChat.append(previousMessages, [respostaMessage]);
        });
      } else {
        // Se a resposta do ChatGPT também for vazia, você pode definir uma mensagem de erro
        const erroMessage: IMessage = {
          _id: Math.random().toString(36).substring(7),
          text: "Desculpe, não consegui encontrar uma resposta para sua pergunta.",
          createdAt: new Date(),
          user: { _id: 2, name: "Assimov Bot" },
        };

        setMessages((previousMessages) => {
          return GiftedChat.append(previousMessages, [erroMessage]);
        });
      }
    }
  };

  const handleTextInput = (text: string) => {
    setInputMessage(text);
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

export default Assimov;
