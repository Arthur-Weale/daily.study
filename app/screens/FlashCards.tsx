import { View, Text, TouchableOpacity, Pressable, Animated } from 'react-native'
import React, { useEffect, useRef, useState } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import Ionicons from '@expo/vector-icons/Ionicons';
import Feather from '@expo/vector-icons/Feather';


interface Card{
    id: number,
    front: string, 
    back: string
}

const cards: Card[] = [
    {
        id: 1,
        front: "Hello Arthur",
        back: "Hola Arthur"
    },
    {
        id: 2,
        front: "Goodbye",
        back: "Adios"
    },
    {
        id: 3,
        front: "Thank You",
        back: "Gracias"
    },
    {
        id: 4,
        front: "Thank You",
        back: "Gracias"
    },
    {
        id: 5,
        front: "Thank You",
        back: "Gracias"
    },
]

const FlashCards = () => {
    const [ currentIndex, setCurrentIndex ] = useState(0);
    const [ showBack, setShowBack ] = useState(false);

    const progressAnimation = useRef(new Animated.Value(0)).current;

    useEffect(()=>{
        Animated.timing(progressAnimation, {
            toValue: (currentIndex + 1)/cards.length,
            duration: 500,
            useNativeDriver: false,
        }).start();
    }, [currentIndex]);

    function handleNextCard(){
        setShowBack(false);
        setCurrentIndex(index => index + 1);
    }

    return (
        <SafeAreaView className="flex-1 flex flex-col p-5 gap-2 relative ">
            <TouchableOpacity className='mb-4'>
                <Ionicons name="arrow-back-sharp" size={24} color="gray" />
            </TouchableOpacity>
            <View className='mb-5'>
                <Text className='text-lg text-blue-500'>Spanish Vocabulary</Text>
                <Text className='text-gray-600'>Card {currentIndex + 1} of {cards.length}</Text>
            </View>

            <View className='w-full bg-twitterblue-100  rounded-2xl mb-20' style={{height: 15, backgroundColor: "gray" }}>
                <Animated.View style={{backgroundColor: "#1DA1F2",
                    borderRadius: 16,
                    height: 15, 
                    width: progressAnimation.interpolate({
                    inputRange: [0, 1],
                    outputRange: ['0%', '100%']
                })}}/>
            </View>

            <Pressable className="bg-white rounded-2xl p-5 justify-center items-center h-72 gap-4 mb-20"
            style={{
                elevation: 20,
                shadowColor: "fff",
                shadowOffset: {width: 0, height: 2},
                shadowOpacity: 0.25,
                shadowRadius: 16
            }}
            onPress={()=> setShowBack(!showBack)}>
                <Text className="text-lg">
                    {showBack ? cards[currentIndex].back : cards[currentIndex].front}
                </Text>
                <Text className='text-gray-500 text-sm'>{showBack ? "Tap to see front" : "Tap to flip"}</Text>
            </Pressable>

            <View className='flex-row w-full gap-4'> {/* flex-row for horizontal "columns", gap-4 for spacing */}
                <TouchableOpacity className='flex-1 flex-row items-center justify-center bg-redBrand-500 p-3 rounded-xl'
                onPress={handleNextCard}> 
                    <Feather name="x" size={22} color="white" />
                    <Text className="text-white font-bold ml-2">Don&apos;t Know</Text> {/* ml-2 for icon-text gap */}
                </TouchableOpacity>
                <TouchableOpacity className='flex-1 flex-row items-center justify-center bg-greenBrand-400 p-3 rounded-xl '
                onPress={handleNextCard}>
                    <Feather name="check" size={22} color="white" />
                    <Text className="text-white font-bold ml-2">Know It</Text>
                </TouchableOpacity>
            </View>

        </SafeAreaView>
    )
}

export default FlashCards