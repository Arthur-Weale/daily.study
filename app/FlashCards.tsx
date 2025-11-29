import Feather from '@expo/vector-icons/Feather';
import Ionicons from '@expo/vector-icons/Ionicons';
import { useFocusEffect, useLocalSearchParams, useRouter } from 'expo-router';
import React, { useCallback, useEffect, useRef, useState } from 'react';
import { Animated, Pressable, Text, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { dummyDecks } from './data/dummydata';
import safeNavigate from './utils/safeNavigate';

const FlashCards = () => {
    const [ currentIndex, setCurrentIndex ] = useState(0);
    const [ showBack, setShowBack ] = useState(false);

    const [ answer , setAnswer ] = useState<("know" | "dontknow")[]>([]);

    const route = useRouter()
    const progressAnimation = useRef(new Animated.Value(0)).current;

    const params = useLocalSearchParams()
    //const cards = params.cards;

    const deck = dummyDecks.find(deck => deck.id.toString() === params.id)
    const cards = deck?.cards

    useFocusEffect(
        useCallback(()=>{
            setCurrentIndex(0)
            setShowBack(false)
            setAnswer([])
        }, [])
    )

    useEffect(()=>{
        Animated.timing(progressAnimation, {
            toValue: (currentIndex + 1)/cards!.length,
            duration: 500,
            useNativeDriver: false,
        }).start();
    }, [currentIndex]);

    function handleNextCard(score : number){
        setShowBack(false);
        if(currentIndex + 1 >= cards!.length ){
        safeNavigate(()=>route.push(`/Session?score=${score}&total=${cards!.length}&title=${params.title}`)) 
        return;
    }
        setCurrentIndex(index => index + 1);
    }

    function getText(){
        if(currentIndex + 1 > cards!.length){
            return
        } 
        return showBack ? cards![currentIndex].back : cards![currentIndex].front;          
    }

    function handleAnswer(isCorrect: boolean){
        setAnswer(prev => {
            const newAnswers = [...prev, (isCorrect ? "know" : "dontknow") as "know" | "dontknow"];
            const score = newAnswers.filter(a => a === "know").length;
            console.log("Current score:", score);
            handleNextCard(score);
            return newAnswers;
        });
}
    return (
        <SafeAreaView className="flex-1 flex flex-col p-5 gap-2 relative ">
            <TouchableOpacity className='mb-4'>
                <Ionicons name="arrow-back-sharp" size={24} color="gray" onPress={()=> route.back()}/>
            </TouchableOpacity>
            <View className='mb-5'>
                <Text className='text-lg text-blue-500'>{params.title}</Text>
                <Text className='text-gray-600'>Card {currentIndex + 1} of {cards!.length}</Text>
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
                    {getText()}
                </Text>
                <Text className='text-gray-500 text-sm'>{showBack ? "Tap to see front" : "Tap to flip"}</Text>
            </Pressable>

            <View className='flex-row w-full gap-4'> 
                <TouchableOpacity className='flex-1 flex-row items-center justify-center bg-redBrand-500 p-3 rounded-xl'
                    onPress={()=> handleAnswer(false)}> 
                    <Feather name="x" size={22} color="white" />
                    <Text className="text-white font-bold ml-2">Don&apos;t Know</Text>
                </TouchableOpacity>
                <TouchableOpacity className='flex-1 flex-row items-center justify-center bg-greenBrand-400 p-3 rounded-xl '
                onPress={()=> handleAnswer(true)}>
                    <Feather name="check" size={22} color="white"/>
                    <Text className="text-white font-bold ml-2">Know It</Text>
                </TouchableOpacity>
            </View>
        </SafeAreaView>
    )
}

export default FlashCards