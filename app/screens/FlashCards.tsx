import { View, Text, TouchableOpacity } from 'react-native'
import React from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import Ionicons from '@expo/vector-icons/Ionicons';
import Feather from '@expo/vector-icons/Feather';

const FlashCards = () => {
  return (
    <SafeAreaView className="flex-1 flex flex-col p-5 gap-2 relative ">
        <TouchableOpacity className='mb-4'>
            <Ionicons name="arrow-back-sharp" size={24} color="gray" />
        </TouchableOpacity>
        <View className='mb-5'>
            <Text className='text-lg text-blue-500'>Spanish Vocabulary</Text>
            <Text className='text-gray-600'>Card 1 of 3</Text>
        </View>

        <View className='w-full bg-twitterblue-100  rounded-2xl mb-20' style={{height: 15, backgroundColor: "#1DA1F2" }}>
        </View>

        <View className="bg-white rounded-2xl p-5 justify-center items-center h-72 gap-4 mb-20"
        style={{
            elevation: 20,
            shadowColor: "fff",
            shadowOffset: {width: 0, height: 2},
            shadowOpacity: 0.25,
            shadowRadius: 16
        }}>
            <Text className="text-lg">Hello</Text>
            <Text className='text-gray-500 text-sm'>Tap to flip</Text>
        </View>

        <View className='flex-row w-full gap-4'> {/* flex-row for horizontal "columns", gap-4 for spacing */}
            <TouchableOpacity className='flex-1 flex-row items-center justify-center bg-redBrand-500 p-3 rounded-xl'> {/* flex-1 for equal width, flex-row for icon+text */}
                <Feather name="x" size={22} color="white" />
                <Text className="text-white font-bold ml-2">Don&apos;t Know</Text> {/* ml-2 for icon-text gap */}
            </TouchableOpacity>
            <TouchableOpacity className='flex-1 flex-row items-center justify-center bg-greenBrand-400 p-3 rounded-xl '>
                <Feather name="check" size={22} color="white" />
                <Text className="text-white font-bold ml-2">Know It</Text>
            </TouchableOpacity>
        </View>

    </SafeAreaView>
  )
}

export default FlashCards