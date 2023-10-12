import React, { useState } from "react";
import { StatusBar } from "expo-status-bar";
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
} from "react-native";

export default function App() {
  const [inputMessage, setInputMessage] = useState("");
  const [outputMessage, setoutputMessage] = useState(null);

  const handleButtonClick = () => {
    console.log("Button Clicado", inputMessage);
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
        "prompt": inputMessage,
        "n": 1,
        "size": "256x256", 
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
      </View>
      <View style={styles.content}>
        <View style={{ flex: 1 }}>
          <TextInput
            style={styles.input}
            placeholder="Pergunte me"
            onChangeText={handleTextInput}
          />
        </View>
        <TouchableOpacity style={styles.button} onPress={generateImages}>
          <Text style={{ color: "white", textAlign: "center" }}>Enviar</Text>
        </TouchableOpacity>
      </View>
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
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
    padding: 16,
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
