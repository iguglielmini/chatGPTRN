import { View, Text, TextInput, TouchableOpacity } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import styled from "styled-components/native";

export const Container = styled(SafeAreaView)`
  flex: 1;
  padding-bottom: 16px;
`;

export const ContentChat = styled(View)`
  flex: 1;
`;

export const Title = styled(Text)`
  font-size: 32px;
  line-height: 38px;
  text-align: center;
  font-weight: 400;
  color: black;
`;
