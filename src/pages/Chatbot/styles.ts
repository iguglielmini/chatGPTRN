import { View, Text, TextInput, TouchableOpacity } from "react-native";
import styled from "styled-components/native";

export const Container = styled(View)`
  flex: 1;
  align-items: center;
  justify-content: center;
  background-color: white;
`;

export const ContentChat = styled(View)`
  flex: 1;
  justify-content: center;
`;

export const Title = styled(Text)`
  font-size: 32px;
  line-height: 38px;
  text-align: center;
  font-weight: 400;
  color: black;
`;

export const TextOutput = styled(Text)`
  font-size: 14px;
  line-height: 21px;
  text-align: left;
  font-weight: 400;
  padding-left: 24px;
  padding-right: 24px;
`;

export const ContentInput = styled(View)`
  width: 100%;
  flex-direction: row;
  justify-content: flex-start;
`;

export const Box = styled(View)`
  flex: 1;
`;
export const Input = styled(TextInput)`
  height: 50px;
  padding: 16px;
  background-color: #e1e1e1;
`;

export const ButtonSend = styled(TouchableOpacity)`
  padding: 16px;
  color: #fff;
  border-color: #0343da;
  background-color: #0343da;
`;

export const ButtonText = styled(Text)`
  text-align: center;
  color: white;
`;
