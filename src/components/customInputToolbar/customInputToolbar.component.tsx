import React from "react";
import { MaterialIcons } from "@expo/vector-icons";

import * as S from "./styles";

interface ICustomInput {
  onSend: () => void;
  placeholder?: string;
  text: string;
  onTextChange: (text: string) => void;
}

const CustomInputToolbar: React.FC<ICustomInput> = ({
  onSend,
  placeholder,
  text, 
  onTextChange
}) => {
  return (
    <S.ContentInput>
      <S.Box>
        <S.Input
          value={text}
          onChangeText={onTextChange}
          placeholder={placeholder}
        />
      </S.Box>
      <S.ButtonSend onPress={onSend}>
        <MaterialIcons name="send" size={24} color="#fff" />
      </S.ButtonSend>
    </S.ContentInput>
  );
};

export default CustomInputToolbar;
