import React from "react";

import * as S from "./styles";
import { useNavigation } from "@react-navigation/native";

const Initial: React.FC = () => {
  const { navigate } = useNavigation();
  return (
    <S.Container>
      <S.Title>Initial Page</S.Title>

      <S.ButtonSend onPress={() => {}}>
        <S.ButtonText>Intial</S.ButtonText>
      </S.ButtonSend>

      <S.ButtonSend onPress={() => navigate("Chatbot")}>
        <S.ButtonText>Chatbot</S.ButtonText>
      </S.ButtonSend>
    </S.Container>
  );
};

export default Initial;
