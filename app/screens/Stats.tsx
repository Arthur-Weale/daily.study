import { View, Text, TouchableOpacity, FlatList } from 'react-native'
import React from 'react'
import Ionicons from '@expo/vector-icons/Ionicons';
import Feather from '@expo/vector-icons/Feather';
import { SafeAreaView } from 'react-native-safe-area-context';
import FontAwesome6 from '@expo/vector-icons/FontAwesome6';

interface Card{
    id: number,
    title: string, 
    cards: number,
    accuracy: number
}

const cards: Card[] = [
    {
        id: 1,
        title: "Spanish Vocabulary",
        cards: 3,
        accuracy: 100
    },
    {
        id: 2,
        title:"Spanish Vocabulary",
        cards: 3,
        accuracy: 33  
    },
    {
        id: 3,
        title: "Spanish Vocabulary",
        cards: 3,
        accuracy: 60
    },
    {
        id: 4,
        title: "Spanish Vocabulary",
        cards: 3,
        accuracy: 100
    },
    {
        id: 5,
        title: "Spanish Vocabulary",
        cards: 3,
        accuracy: 10
    },
]

const DeckDetails = () => {
    
    return (
        <SafeAreaView className="flex flex-col p-5 gap-2 relative">
            <FlatList
            data={cards}
            keyExtractor={(item)=> item.id.toString()}
            contentContainerStyle={{paddingBottom: 10, paddingHorizontal: 3}}
            showsVerticalScrollIndicator={false}
            ItemSeparatorComponent={()=> <View style={{height: 12,}}/>}
            renderItem={({item})=> (
                <View className='flex flex-row gap-4 justify-between bg-white rounded-xl p-5 shadow-sm shadow-slate-400 ' style={{ elevation: 2,shadowColor: '#000',
                    shadowOpacity: 0.1,
                    shadowRadius: 4,
                    shadowOffset: { width: 0, height: 2 }, }}>
                    <View className='flex gap-2 justify-center'>
                        <Text>{item.title}</Text>
                        <View className='flex flex-row gap-2'>
                            <Text className='text-gray-500 text-sm'>{item.cards} cards</Text>
                            <Text>·</Text>
                            <Text className='text-gray-500 text-sm'>{item.accuracy}% accuracy</Text>
                        </View>
                    </View>
                    <View className="bg-greenBrand-400 w-20 h-20 rounded-full flex items-center justify-center">
                        <Text className="text-white">{item.accuracy}%</Text>
                    </View>
                </View>
            )}
            ListHeaderComponent={()=> <>
            <TouchableOpacity className='mb-5'>
                <Ionicons name="arrow-back-sharp" size={24} color="gray" />
            </TouchableOpacity>

            <Text className='text-lg text-blue-500'>Statistics</Text>

            <View className='flex gap-5 mt-5 mb-4'>
                <View className='flex flex-row w-full bg-white gap-3 rounded-3xl p-6' style={{elevation: 3}}>
                    <View className='bg-twitterblue-100 p-3 rounded-[100px]'>
                        <Feather name="book-open" size={28} color="white"/>
                    </View>
                    <View>
                        <Text className='align-middle text-gray-500'>Total Cards</Text>
                        <Text className='text-2xl'>5</Text>
                    </View>
                </View>

                <View className='flex flex-row w-full bg-white gap-3 rounded-3xl p-6' style={{elevation: 3}}>
                    <View className='bg-pink-400 p-3 rounded-[100px]'>
                        <FontAwesome6 name="arrow-trend-up" size={24} color="white" />
                    </View>
                    <View>
                        <Text className='align-middle text-gray-500'>Cards Studied</Text>
                        <Text className='text-2xl'>20</Text>
                    </View>
                </View>

                <View className='flex flex-row w-full bg-white gap-3 rounded-3xl p-6' style={{elevation: 3}}>
                    <View className='bg-greenBrand-400 p-3 rounded-[100px] h-14'>
                        <Feather name="target" color="white" size={28}/>
                    </View>
                    <View>
                        <Text className='align-middle text-gray-500'>Overrall Accuracy</Text>
                        <Text className='text-2xl'>80%</Text>
                        <Text className='align-middle text-gray-500'>16 / 20 correct</Text>
                    </View>
                </View>

            </View>

            <Text className='text-lg my-3'>Recent Activity</Text>
        </>}
            />
        </SafeAreaView>
    )
}

export default DeckDetails