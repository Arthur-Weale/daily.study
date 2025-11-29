import { useRouter } from "expo-router";
import React from 'react';
import { SafeAreaView } from "react-native-safe-area-context";
import { View, Text } from "react-native";
import Header from "./components/ui/Header";
import Ionicons from "@expo/vector-icons/Ionicons";
import safeNavigate from "./utils/safeNavigate";
import Deck from "./components/ui/Deck";
import CreateButton from "./components/ui/CreateButton";

const HomeScreen = () => {
  const route = useRouter()
  
  return (
    <SafeAreaView style={{ flex: 1, padding: 20 }}>
      {/* Header */}
      <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginBottom: 10 }}>
        <Header/>
        <Ionicons name="stats-chart" size={23} color="gray" onPress={() => safeNavigate(() => route.push('/Stats'))}/>
      </View>

      <Text style={{ color: '#4B5563', marginBottom: 20 }}>Pick a deck to study</Text>

      {/* Deck list scrollable */}
      
      <Deck/>

      {/* Floating button */}
      <CreateButton/>
    </SafeAreaView>
  )
}

export default HomeScreen;
