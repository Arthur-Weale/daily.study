import { View, Text, TouchableOpacity, FlatList } from 'react-native'
import React from 'react'
import Ionicons from '@expo/vector-icons/Ionicons';
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import Feather from '@expo/vector-icons/Feather';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useLocalSearchParams, useRouter } from 'expo-router';
import safeNavigate from '../utils/safeNavigate';
import { dummyDecks } from '../data/dummydata';

const DeckDetails = () => {
    const params = useLocalSearchParams()
    const route = useRouter();

    const deck = dummyDecks.find(deck => deck.id.toString() === params.id)

    return (
        <SafeAreaView className="flex flex-col p-5 gap-2 relative">
            <FlatList
            data={deck?.cards}
            keyExtractor={(item)=> item.id.toString()}
            contentContainerStyle={{paddingBottom: 10}}
            showsVerticalScrollIndicator={false}
            ItemSeparatorComponent={()=> <View style={{height: 12,}}/>}
            renderItem={({item})=> (
                <View className='flex gap-2 bg-white rounded-xl p-3 shadow-sm shadow-slate-400 ' style={{ elevation: 2,shadowColor: '#000',
                    shadowOpacity: 0.1,
                    shadowRadius: 4,
                    shadowOffset: { width: 0, height: 2 }, }}>
                    <Text>{item.front}</Text>
                    <Text className='text-gray-500'>{item.back}</Text>
                </View>
            )}
            ListHeaderComponent={()=> <>
            <TouchableOpacity className='mb-5'>
                <Ionicons name="arrow-back-sharp" size={24} color="gray" onPress={()=> safeNavigate(()=>route.replace(`/screens/HomeScreen`))}/>
            </TouchableOpacity>
            <View className='flex flex-col gap-2'>
                <Text className='text-lg text-blue-500'>{params.title}</Text>
                <Text className='text-gray-600'>{deck?.cards.length} cards</Text>
                <Text className='text-gray-600 text-sm'>{deck?.description ? deck.description : " "}</Text>
            </View>
            <View className='flex gap-5 mt-5 mb-4'>
                <TouchableOpacity className='flex flex-row w-full bg-cyan-400 gap-3 align-middle rounded-3xl py-4 justify-center' onPress={()=>safeNavigate(()=>route.push(`/screens/AddCardScreen`)) }>
                    <MaterialCommunityIcons name="plus" size={24} color="white" />
                    <Text className='text-bg-white align-middle'>Add Card</Text>
                </TouchableOpacity>

                <TouchableOpacity  className='flex flex-row w-full bg-indigo-500 gap-3 align-middle rounded-3xl  py-4 justify-center' onPress={()=>safeNavigate(()=>route.push(`/screens/FlashCards?id=${deck?.id}&title=${params.title}`)) }>
                    <Feather name="book-open" size={24} color="white"/>
                    <Text className='text-bg-white align-middle '>Study</Text>
                </TouchableOpacity>

                <TouchableOpacity  className='flex flex-row w-full bg-green-400 gap-3 align-middle rounded-3xl py-4 justify-center' onPress={()=>safeNavigate(()=>route.push(`/screens/Stats`)) }>
                    <Ionicons name="stats-chart" size={24} color="white"/>
                    <Text className='text-bg-white align-middle'>View Stats</Text>
                </TouchableOpacity>
            </View>

            <Text className='text-lg my-3'>Cards Preview</Text>
        </>}
            />
        </SafeAreaView>
    )
}

export default DeckDetails