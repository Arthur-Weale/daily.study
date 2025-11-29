import Feather from '@expo/vector-icons/Feather';
import Ionicons from '@expo/vector-icons/Ionicons';
import { useFocusEffect, useLocalSearchParams, useRouter } from 'expo-router';
import React, { useCallback, useEffect, useRef, useState } from 'react';
import { Animated, Pressable, Text, TouchableOpacity, View, Alert } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { getCardsByDeck, initDb } from '@/app/data/database';
import safeNavigate from '@/app/utils/safeNavigate';

type Card = {
  id: number;
  front: string;
  back: string;
};

const FlashCards = () => {
  const router = useRouter();
  const params = useLocalSearchParams<{ id: string; title: string }>();

  const [cards, setCards] = useState<Card[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [showBack, setShowBack] = useState(false);
  const [answers, setAnswers] = useState<('know' | 'dontknow')[]>([]);
  const [loading, setLoading] = useState(true);

  const progressAnim = useRef(new Animated.Value(0)).current;
  const deckId = Number(params.id);
  const title = params.title || 'Flashcards';

  useEffect(() => {
    const loadCards = async () => {
      if (!deckId || isNaN(deckId)) {
        Alert.alert('Error', 'Invalid deck');
        router.back();
        return;
      }

      try {
        await initDb();
        const result = await getCardsByDeck(deckId);
        setCards(result as Card[]);
      } catch (error) {
        Alert.alert('Error', 'Failed to load cards');
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    loadCards();
  }, [deckId]);

  useFocusEffect(
    useCallback(() => {
      setCurrentIndex(0);
      setShowBack(false);
      setAnswers([]);
      progressAnim.setValue(0);
    }, [progressAnim])
  );

  useEffect(() => {
    if (cards.length === 0) return;

    Animated.timing(progressAnim, {
      toValue: (currentIndex + 1) / cards.length,
      duration: 400,
      useNativeDriver: false,
    }).start();
  }, [currentIndex, cards.length, progressAnim]);

  const handleAnswer = (isCorrect: boolean) => {
    const newAnswer: 'know' | 'dontknow' = isCorrect ? 'know' : 'dontknow';
    const newAnswers = [...answers, newAnswer];
    setAnswers(newAnswers);
    const score = newAnswers.filter(a => a === 'know').length;

    setShowBack(false);

    if (currentIndex + 1 >= cards.length) {
      safeNavigate(() =>
        router.replace({
          pathname: '/Session',
          params: {
            score,
            total: cards.length,
            title,
            accuracy: Math.round((score / cards.length) * 100),
          },
        })
      );
    } else {
      setTimeout(() => setCurrentIndex(prev => prev + 1), 300);
    }
  };

  const currentCard = cards[currentIndex];

  if (loading) {
    return (
      <SafeAreaView className="flex-1 bg-white justify-center items-center">
        <Text className="text-lg text-gray-600">Loading cards...</Text>
      </SafeAreaView>
    );
  }

  if (cards.length === 0) {
    return (
      <SafeAreaView className="flex-1 bg-white justify-center items-center px-8">
        <Text className="text-2xl font-bold text-gray-800 mb-4">No Cards</Text>
        <Text className="text-center text-gray-600">Add some cards to this deck first!</Text>
        <TouchableOpacity onPress={() => router.back()} className="mt-8 bg-blue-500 py-4 px-8 rounded-2xl">
          <Text className="text-white font-bold">Go Back</Text>
        </TouchableOpacity>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView className="flex-1 bg-white">
      <View className="flex-1 px-5 pt-4">

        <TouchableOpacity onPress={() => router.back()} className="mb-4">
          <Ionicons name="arrow-back" size={28} color="#1DA1F2" />
        </TouchableOpacity>

        <View className="mb-6">
          <Text className="text-2xl font-bold text-gray-800">{title}</Text>
          <Text className="text-gray-600 mt-1">
            Card {currentIndex + 1} of {cards.length}
          </Text>
        </View>

        <View className="w-full h-4 bg-gray-200 rounded-full overflow-hidden mb-8">
          <Animated.View
            style={{
              height: '100%',
              width: progressAnim.interpolate({
                inputRange: [0, 1],
                outputRange: ['0%', '100%'],
              }),
              backgroundColor: '#1DA1F2',
              borderRadius: 8,
            }}
          />
        </View>

        <Pressable
          onPress={() => setShowBack(prev => !prev)}
          className="flex-1 bg-white rounded-3xl p-8 justify-center items-center shadow-2xl mb-10"
          style={{
            elevation: 20,
            shadowColor: '#000',
            shadowOpacity: 0.15,
            shadowRadius: 20,
            shadowOffset: { width: 0, height: 10 },
          }}
        >
          <Text className="text-2xl font-medium text-center text-gray-900 leading-10">
            {showBack ? currentCard.back : currentCard.front}
          </Text>
          <Text className="text-gray-500 text-sm mt-6">
            {showBack ? 'Tap to see question' : 'Tap to reveal answer'}
          </Text>
        </Pressable>

        <View className="flex-row gap-4 pb-6">
          <TouchableOpacity
            onPress={() => handleAnswer(false)}
            className="flex-1 flex-row items-center justify-center bg-red-500 py-5 rounded-2xl"
          >
            <Feather name="x" size={28} color="white" />
            <Text className="text-white font-bold text-lg ml-3">Don&apos;t Know</Text>
          </TouchableOpacity>

          <TouchableOpacity
            onPress={() => handleAnswer(true)}
            className="flex-1 flex-row items-center justify-center bg-green-500 py-5 rounded-2xl"
          >
            <Feather name="check" size={28} color="white" />
            <Text className="text-white font-bold text-lg ml-3">Know It</Text>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default FlashCards;