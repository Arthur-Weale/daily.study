import { View, Text, TouchableOpacity, TextInput, FlatList, TouchableWithoutFeedback } from 'react-native'
import React from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import Ionicons from '@expo/vector-icons/Ionicons';
import { LinearGradient }  from "expo-linear-gradient";


interface color{
    id: number,
    name: string, 
    color: [string, string]
}

const colorPicker: color[] = [
    {
        id: 1,
        name: "blue",
        color: ['#60A5FA', '#3B82F6'], // Blue
    },
    {
        id: 2,
        name: "pink",
        color: ['#F472B6', '#EC4899'], // Pink
    },
    {
        id: 3,
        name: "yellow",
        color: ['#FDE047', '#FACC15'], // Yellow
    },
    {
        id: 4,
        name: "purple",
        color: ['#C084FC', '#A855F7'], // Purple
    },
    {
        id: 5,
        name: "green",
        color: ['#4ADE80', '#22C55E']
    },
]

const CreateDeck = () => {
    return (
    <SafeAreaView className="flex flex-col p-5 gap-2 relative">
        <TouchableOpacity className='mb-4'>
            <Ionicons name="arrow-back-sharp" size={24} color="gray" />
        </TouchableOpacity>
        <Text className='text-lg text-blue-500 mb-8'>Create Deck</Text>

        <View className='flex gap-6'>
            <View className='flex gap-2'>
                <Text className='text-gray-600'>Deck Name</Text>
                <TextInput
                placeholder='Enter deck name' 
                className='border border-none border-gray-300 p-3 rounded-xl bg-white shadow-sm  focus:border-twitterblue-100' style={{elevation: 2}}/>
            </View>
            <View className='flex gap-2'>
                <Text className='text-gray-600'>Description (Optional)</Text>
                <TextInput 
                placeholder='Add a description'
                className='border border-none border-gray-300 p-3 rounded-xl bg-white shadow-sm  focus:border-twitterblue-100' style={{elevation: 2}}/>
            </View>
            <View className='flex gap-2'>
                <Text className='text-gray-600'>Deck Color</Text>
                <FlatList
                horizontal={true}
                className='w-full'
                contentContainerStyle={{gap: 15, display: "flex", justifyContent: "space-between"}}
                data={colorPicker}
                keyExtractor={(item)=>(item.id.toString())}
                renderItem={({item})=> <TouchableWithoutFeedback>
                    <LinearGradient
                    colors={item.color}
                    start={{x: 0, y: 0}}
                    end={{x: 0, y: 0}}
                    className='w-[52px] h-[52px] rounded-[28px]'
                    style={{borderRadius: 28}}>    
                    </LinearGradient>
                </TouchableWithoutFeedback>}
                />
            </View>

            <TouchableOpacity> 
                <LinearGradient
                colors={["#1DA1F2", "#1DA1F2"]}
                start={{x: 0, y: 0}}
                end={{x: 0.1, y: 1}}
                style={{
                    paddingHorizontal: 5,
                    paddingVertical: 20,
                    borderRadius: 24,
                    alignItems: 'center',
                    justifyContent: 'center'
                }}>
                <Text className='text-white'>Create Deck</Text>
                </LinearGradient>
            </TouchableOpacity>
        </View>
    </SafeAreaView>
    )
}

export default CreateDeck