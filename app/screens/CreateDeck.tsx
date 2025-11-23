import { View, Text, TouchableOpacity, TextInput } from 'react-native'
import React from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import Ionicons from '@expo/vector-icons/Ionicons';

const CreateDeck = () => {
    return (
    <SafeAreaView className="flex flex-col p-5 gap-2 relative">
        <TouchableOpacity className='mb-5'>
            <Ionicons name="arrow-back-sharp" size={24} color="gray" />
        </TouchableOpacity>
        <Text className='text-lg text-blue-500'>Create Deck</Text>
        <View>
            <View>
                <Text className='text-gray-600'>Deck Name</Text>
                <TextInput
                placeholder='Enter deck name' 
                className='border border-none border-gray-300 p-3 rounded-xl bg-white shadow-sm' style={{elevation: 2}}/>
            </View>
            <View>
                <Text className='text-gray-600'>Description (Optional)</Text>
                <TextInput 
                placeholder='Add a description'
                className='border border-none border-gray-300 p-3 rounded-xl bg-white shadow-sm' style={{elevation: 2}}/>
            </View>
            <View>
                <Text className='text-gray-600'>Deck Color</Text>
            </View>
        </View>
    </SafeAreaView>
    )
}

export default CreateDeck