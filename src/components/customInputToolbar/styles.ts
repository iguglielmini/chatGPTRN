import { View, Text, TextInput, TouchableOpacity } from "react-native";
import styled from "styled-components/native";

export const ContentInput = styled(View)`
  width: 100%;
  flex-direction: row;
  justify-content: flex-start;
`;

export const Box = styled(View)`
  flex: 1;
`;

export const Input = styled(TextInput)`
  height: 60px;
  padding: 16px;
  background-color: #e1e1e1;
`;

export const ButtonSend = styled(TouchableOpacity)`
  padding: 16px;
  height: 60px;
  color: #fff;
  border-color: #0343da;
  justify-content: center;
  background-color: #0343da;
`;

export const ButtonText = styled(Text)`
  text-align: center;
  color: white;
`;
