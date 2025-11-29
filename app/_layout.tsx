import { Stack } from "expo-router";
import "./global.css"
import { initDb } from "./data/database";

initDb();

export default function RootLayout() {
  return (
      <Stack screenOptions={{headerShown: false}}>
        <Stack.Screen name="index"/>
        <Stack.Screen name="DeckDetails"/>
        <Stack.Screen name="CreateDeck"/>
        <Stack.Screen name="AddCardScreen"/>
        <Stack.Screen name="FlashCards"/>
        <Stack.Screen name="Session"/>
        <Stack.Screen name="Stats"/>
      </Stack>
  );
}
