import React, { useState } from "react";
import { StatusBar } from "expo-status-bar";
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
} from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
import { GiftedChat, IMessage } from "react-native-gifted-chat";

export default function App() {
  const [messages, setMessages] = useState<IMessage[]>([]);
  const [inputMessage, setInputMessage] = useState("");
  const [outputMessage, setoutputMessage] = useState("");

  const handleButtonClick = () => {
    console.log("Button Clicado", inputMessage);

    const message = {
      _id: Math.random().toString(36).substring(7),
      text: inputMessage,
      createdAt: new Date(),
      user: { _id: 1 },
    };

    setMessages((previousMessages) => {
      return GiftedChat.append(previousMessages, [message]);
    });

    fetch("https://api.openai.com/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization:
          "Bearer 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", // trocar para sua key
      },
      body: JSON.stringify({
        messages: [
          {
            role: "user",
            content: inputMessage,
          },
        ],
        model: "gpt-3.5-turbo",
      }),
    })
      .then((responce) => responce.json())
      .then((data) => {
        console.log("data", data.choices[0].message.content.trim());
        setoutputMessage(data.choices[0].message.content.trim());
      });
  };

  const generateImages = () => {
    console.log("generateImages", inputMessage);
    fetch("https://api.openai.com/v1/images/generations", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization:
          "Bearer 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", // trocar para sua key
      },
      body: JSON.stringify({
        prompt: inputMessage,
        n: 1,
        size: "256x256",
      }),
    })
      .then((responce) => responce.json())
      .then((data) => {
        console.log("data", data.data[0].url);
        setoutputMessage(data.data[0].url);
      });
  };

  const handleTextInput = (text: string) => {
    setInputMessage(text);
    console.log(text);
  };

  return (
    <View style={styles.container}>
      <View style={{ flex: 1, justifyContent: "center" }}>
        <Text style={styles.textOutput}>{outputMessage}</Text>
        <GiftedChat
          messages={messages}
          renderInputToolbar={() => {}}
          user={{ _id: 1 }}
        />
      </View>
      <View style={styles.content}>
        <View style={{ flex: 1 }}>
          <TextInput
            style={styles.input}
            placeholder="Pergunte me"
            onChangeText={handleTextInput}
          />
        </View>
        <TouchableOpacity style={styles.button} onPress={handleButtonClick}>
          <MaterialIcons name="send" size={24} color="#fff" />
        </TouchableOpacity>
      </View>
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  input: {
    height: 50,
    padding: 16,
    backgroundColor: "#e1e1e1",
  },
  content: {
    width: "100%",
    flexDirection: "row",
    justifyContent: "flex-start",
  },
  button: {
    width: 70,
    alignItems: "center",
    justifyContent: "center",
    color: "#fff",
    borderColor: "#0343da",
    backgroundColor: "#0343da",
  },
  textOutput: {
    textAlign: "left",
    fontSize: 14,
    fontWeight: "400",
    lineHeight: 21,
    paddingHorizontal: 24,
  },
});
