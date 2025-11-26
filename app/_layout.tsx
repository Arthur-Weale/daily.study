import { Stack } from "expo-router";
import "./global.css"

export default function RootLayout() {
  return (
      <Stack screenOptions={{headerShown: false}}>
        <Stack.Screen name="index"/>
        <Stack.Screen name="screens/DeckDetails"/>
        <Stack.Screen name="screens/CreateDeck"/>
        <Stack.Screen name="screens/AddCardScreen"/>
        <Stack.Screen name="screens/FlashCards"/>
        <Stack.Screen name="screens/Session"/>
        <Stack.Screen name="screens/Stats"/>
      </Stack>
  );
}
