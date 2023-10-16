import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { Initial, ChatBot, Assimov } from "./src/pages";

const Stack = createStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{ headerShown: false }}
        initialRouteName="Initial"
      >
        <Stack.Screen name="Initial" component={Initial} />
        <Stack.Screen name="Chatbot" component={ChatBot} />
        <Stack.Screen name="Assimov" component={Assimov} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
