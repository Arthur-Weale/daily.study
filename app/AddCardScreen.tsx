import { View, Text, TouchableOpacity, TextInput, } from 'react-native'
import React, { useState } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import Ionicons from '@expo/vector-icons/Ionicons';
import { LinearGradient }  from "expo-linear-gradient";
import { useRouter } from 'expo-router'

interface card{
    front: string, 
    back: string
}

const CreateDeck = () => {
    const [form, setForm ] = useState<card>({
        front : "",
        back : ""
    })

    function handleChange(field: string , text: string){
        setForm(prev => ({
            ...prev, [field]: text
        }))
    }

    const route = useRouter()
    return (
    <SafeAreaView className="flex flex-col p-5 gap-2 relative">
        <TouchableOpacity className='mb-4'>
            <Ionicons name="arrow-back-sharp" size={24} color="gray" onPress={()=> route.back()} />
        </TouchableOpacity>
        <Text className='text-lg text-blue-500 mb-8'>Add Flashcard</Text>

        <View className='flex gap-6'>
            <View className='flex gap-2'>
                <Text className='text-gray-600'>Front</Text>
                <TextInput
                placeholder='Enter front text (e.g., question)' 
                value={form.front}
                onChangeText={text=>handleChange("front", text)}
                className='border border-none border-gray-300 p-3 rounded-xl bg-white shadow-sm  focus:border-twitterblue-100' style={{elevation: 2}}/>
            </View>
            <View className='flex gap-2'>
                <Text className='text-gray-600'>Back</Text>
                <TextInput 
                placeholder='Enter back text (e.g., answer)'
                value={form.back}
                onChangeText={text=>handleChange("back", text)}
                className='border border-none border-gray-300 p-3 rounded-xl bg-white shadow-sm h-48 focus:border-twitterblue-100' style={{elevation: 2, textAlignVertical: "top"}}
                multiline={true}
                numberOfLines={6}
                spellCheck={true} // Enables spellcheck with red underline
                autoCorrect={true}
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
                <Text className='text-white'>Save Card</Text>
                </LinearGradient>
            </TouchableOpacity>
        </View>
    </SafeAreaView>
    )
}

export default CreateDeck