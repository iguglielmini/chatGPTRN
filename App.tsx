import React, { useState } from "react";
import { StatusBar } from "expo-status-bar";
import { StyleSheet, View, TextInput, TouchableOpacity } from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
import { GiftedChat, IMessage } from "react-native-gifted-chat";
import * as Speech from "expo-speech";

export default function App() {
  const [messages, setMessages] = useState<IMessage[]>([]);
  const [inputMessage, setInputMessage] = useState("");
  const [outputMessage, setoutputMessage] = useState("");

  const handleButtonClick = () => {
    console.log("Button Clicado", inputMessage);
    if (inputMessage.toLocaleLowerCase().startsWith("foto")) {
      generateImages();
    } else {
      generateText();
    }
  };

  const generateText = () => {
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
        setInputMessage("");
        setoutputMessage(data.choices[0].message.content.trim());
        const message = {
          _id: Math.random().toString(36).substring(7),
          text: data.choices[0].message.content.trim(),
          createdAt: new Date(),
          user: { _id: 2, name: "Open IA" },
        };

        setMessages((previousMessages) => {
          return GiftedChat.append(previousMessages, [message]);
        });
        const options = {};
        Speech.speak(data.choices[0].message.content.trim(), options);
      });
  };

  const generateImages = () => {
    console.log("generateImages", inputMessage);

    const message = {
      _id: Math.random().toString(36).substring(7),
      text: inputMessage,
      createdAt: new Date(),
      user: { _id: 1 },
    };

    setMessages((previousMessages) => {
      return GiftedChat.append(previousMessages, [message]);
    });

    fetch("https://api.openai.com/v1/images/generations", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization:
          "Bearer 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", // trocar para sua key
      },
      body: JSON.stringify({
        prompt: inputMessage,
        n: 2,
        size: "1024x1024",
      }),
    })
      .then((responce) => responce.json())
      .then((data) => {
        console.log("data", data.data[0].url);
        setInputMessage("");
        setoutputMessage(data.data[0].url);
        data.data.forEach((item: any) => {
          const message = {
            _id: Math.random().toString(36).substring(7),
            text: "Image",
            createdAt: new Date(),
            user: { _id: 2, name: "Open IA" },
            image: item.url,
          };

          setMessages((previousMessages) => {
            return GiftedChat.append(previousMessages, [message]);
          });
        });
      });
  };

  const handleTextInput = (text: string) => {
    setInputMessage(text);
    console.log(text);
  };

  return (
    <View style={styles.container}>
      <View style={{ flex: 1, justifyContent: "center" }}>
        {/* <Text style={styles.textOutput}>{outputMessage}</Text> */}
        <GiftedChat
          messages={messages}
          renderInputToolbar={() => {}}
          user={{ _id: 1, name: "Italo Giovanni" }}
          minInputToolbarHeight={0}
        />
      </View>
      <View style={styles.content}>
        <View style={{ flex: 1 }}>
          <TextInput
            style={styles.input}
            placeholder="Pergunte me"
            value={inputMessage}
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
