import React from "react";
import { StatusBar } from "expo-status-bar";
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
} from "react-native";

export default function App() {
  return (
    <View style={styles.container}>
      <View style={{ flex: 1, justifyContent: "center" }}>
        <Text>Results chats aqui</Text>
      </View>
      <View style={styles.content}>
        <View style={{ flex: 1 }}>
          <TextInput style={styles.input} placeholder="Pergunte me" />
        </View>
        <TouchableOpacity style={styles.button} onPress={() => {}}>
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
    backgroundColor: "#e1e1e1",
    paddingHorizontal: 8,
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
});
