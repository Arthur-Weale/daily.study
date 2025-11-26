import {  Text, View } from "react-native";
import React from 'react'
import { Ionicons} from "@expo/vector-icons"
import Header from "../components/ui/Header";
import Deck from "../components/ui/Deck";
import CreateButton from "../components/ui/CreateButton";
import { SafeAreaView } from "react-native-safe-area-context";
import { useRouter } from "expo-router";

const HomeScreen = () => {
    const route = useRouter();
    return (
        <SafeAreaView className="flex flex-col p-5 gap-2 relative">
            {/* Heading and icon */}
            <View className="flex flex-row justify-between">
                <Header/>
                <Ionicons name="stats-chart" size={23} color="gray" onPress={()=> route.push('/screens/Stats')}/>
            </View>

            <Text className="text-gray-700 mb-7">Pick a deck to study</Text>

            <Deck/>
            <CreateButton/>
        </SafeAreaView>
    )
}

export default HomeScreen