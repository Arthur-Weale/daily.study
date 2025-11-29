import Ionicons from '@expo/vector-icons/Ionicons';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import Octicons from '@expo/vector-icons/Octicons';
import { useLocalSearchParams, useRouter } from 'expo-router';
import React from 'react';
import { Text, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import safeNavigate from './utils/safeNavigate';

const Session = () => {
    const route = useRouter()
    const params = useLocalSearchParams()

    const score = parseInt(Array.isArray(params.score) ? params.score[0] : params.score );
    const total = parseInt(Array.isArray(params.total) ? params.total[0] : params.total );
    console.log(typeof(score))
    // const total: number = params.total;

    function calculateStats(){
        if(score <= 0) return 0;
        return Math.round(( score / total ) * 100);
    }
    return (
        <SafeAreaView className='flex flex-col p-5 gap-2 relative items-center'>
            <Text className='text-twitterblue-100 mb-5 text-center text-lg'>Session Complete</Text>
            <View className='bg-greenBrand-400 p-5 rounded-[240px] w-24 items-center'>
                <Octicons name="trophy" size={40} color="white" />
            </View>
            <Text>Great Job!</Text>
            <Text className='text-gray-500 mb-2'>You completed studying {params.title}</Text>

            <View className='flex flex-col gap-5 w-full bg-white p-5 rounded-2xl' style={{elevation: 5}}>
                <Text className=' text-gray-500'>Accuracy</Text>
                <View className='flex flex-row gap-2'>
                    <Text className='text-twitterblue-100 text-5xl'>{calculateStats()}</Text>
                    <Text className='text-gray-500 text-2xl align-bottom'>%</Text>
                </View>
                <Text className='text-gray-500'>{score <= 0 ? 0 : params.score } out of {total}  cards correct</Text>
            </View>

            <View className='flex flex-col gap-5 w-full bg-white p-5 rounded-2xl mb-5' style={{elevation: 5}}>
                <Text className='text-gray-500'>Cards Studied</Text>
                <View className='flex flex-row gap-2'>
                    <Text className='text-pinkBrand-400 text-5xl'>{params.total}</Text>
                    <Text className='text-gray-500 text-[22px] align-bottom'>cards</Text>
                </View>
            </View>
            <TouchableOpacity className='flex flex-row gap-3 w-full bg-twitterblue-100 p-5 rounded-3xl justify-center' onPress={() => route.back()}>
                <MaterialIcons name="restart-alt" size={24} color="white" />
                <Text className='text-white text-lg text-center'>Restart Session</Text>
            </TouchableOpacity>
            <TouchableOpacity className='flex flex-row gap-3 w-full bg-white p-5 rounded-3xl justify-center border border-twitterblue-100' onPress={()=>safeNavigate(()=>route.push(`/DeckDetails`))}>
                <Ionicons name="arrow-back-sharp" size={24} color="#1DA1F2" />
                <Text className='text-twitterblue-100'>Back to Deck</Text>
            </TouchableOpacity>
        </SafeAreaView>
    )
}

export default Session