import { View, Text, TouchableOpacity } from "react-native";
import styled from "styled-components/native";

export const Container = styled(View)`
  flex: 1;
  flex-direction: column;
  justify-content: center;
  padding-left: 24px;
  padding-right: 24px;
`;

export const Title = styled(Text)`
  font-size: 32px;
  line-height: 38px;
  text-align: center;
  font-weight: 400;
  color: black;
  padding-bottom: 24px;
`;

export const ButtonSend = styled(TouchableOpacity)`
  width: 100%;
  padding: 16px;
  color: #fff;
  border-color: #0343da;
  background-color: #0343da;
  margin-bottom: 16px;
`;

export const ButtonText = styled(Text)`
  text-align: center;
  color: white;
`;
