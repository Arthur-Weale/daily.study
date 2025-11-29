import Ionicons from '@expo/vector-icons/Ionicons';
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import Feather from '@expo/vector-icons/Feather';
import { useLocalSearchParams, useRouter, useFocusEffect } from 'expo-router';
import React, { useCallback, useState } from 'react';
import { Alert, FlatList, Text, TouchableOpacity, View, ActivityIndicator } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { getCardsByDeck, initDb } from '@/app/data/database';
import safeNavigate from '@/app/utils/safeNavigate';

type Card = {
  id: number;
  front: string;
  back: string;
};

type DeckParams = {
  id: string;
  title: string;
  description?: string;
  color?: string;
};

const DeckDetails = () => {
  const router = useRouter();
  const params = useLocalSearchParams<DeckParams>();

  const [cards, setCards] = useState<Card[]>([]);
  const [loading, setLoading] = useState(true);

  const deckId = Number(params.id);
  const title = params.title || 'Deck';
  const description = params.description || '';

  const loadCards = async () => {
    if (!deckId || isNaN(deckId)) {
      setLoading(false);
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

  useFocusEffect(
    useCallback(() => {
      loadCards();
    }, [deckId])
  );

  if (loading) {
    return (
      <SafeAreaView className="flex-1 bg-white justify-center items-center">
        <ActivityIndicator size="large" color="#1DA1F2" />
        <Text className="mt-4 text-gray-600">Loading cards...</Text>
      </SafeAreaView>
    );
  }

  const cardCount = cards.length;

  return (
    <SafeAreaView className="flex-1 bg-white">
      <FlatList
        data={cards}
        keyExtractor={(item) => item.id.toString()}
        contentContainerStyle={{ padding: 20, paddingBottom: 100 }}
        showsVerticalScrollIndicator={false}
        ItemSeparatorComponent={() => <View style={{ height: 12 }} />}
        ListEmptyComponent={() => (
          <View className="py-10 items-center">
            <Text className="text-gray-500 text-center">
              No cards yet. Tap {'"Add Card"'} to get started!
            </Text>
          </View>
        )}
        renderItem={({ item }) => (
          <View
            className="bg-white rounded-2xl p-5 border border-gray-100"
            style={{
              elevation: 3,
              shadowColor: '#000',
              shadowOpacity: 0.08,
              shadowRadius: 6,
              shadowOffset: { width: 0, height: 2 },
            }}
          >
            <Text className="text-lg font-medium text-gray-900">{item.front}</Text>
            <Text className="text-gray-500 mt-2">{item.back}</Text>
          </View>
        )}
        ListHeaderComponent={() => (
          <>
            <TouchableOpacity onPress={() => router.back()} className="mb-6">
              <Ionicons name="arrow-back" size={28} color="#1DA1F2" />
            </TouchableOpacity>

            <View className="mb-8">
              <Text className="text-3xl font-bold text-gray-800">{title}</Text>
              <Text className="text-lg text-gray-600 mt-2">
                {cardCount} {cardCount === 1 ? 'card' : 'cards'}
              </Text>
              {description ? <Text className="text-gray-500 mt-2 text-base">{description}</Text> : null}
            </View>

            <View className="gap-4 mb-8">
              <TouchableOpacity
                onPress={() => safeNavigate(() => router.push(`/AddCardScreen?id=${deckId}`))}
                className="flex-row items-center justify-center bg-cyan-500 py-5 rounded-3xl gap-3"
              >
                <MaterialCommunityIcons name="plus" size={26} color="white" />
                <Text className="text-white font-semibold text-lg">Add Card</Text>
              </TouchableOpacity>

              <TouchableOpacity
                onPress={() => safeNavigate(() => router.push(`/FlashCards?id=${deckId}&title=${title}`))}
                className="flex-row items-center justify-center bg-indigo-600 py-5 rounded-3xl gap-3"
                disabled={cardCount === 0}
              >
                <Feather name="book-open" size={26} color="white" />
                <Text className="text-white font-semibold text-lg">
                  {cardCount === 0 ? 'No Cards to Study' : 'Start Studying'}
                </Text>
              </TouchableOpacity>

              <TouchableOpacity
                onPress={() => safeNavigate(() => router.push(`/Stats?id=${deckId}`))}
                className="flex-row items-center justify-center bg-green-500 py-5 rounded-3xl gap-3"
              >
                <Ionicons name="stats-chart" size={26} color="white" />
                <Text className="text-white font-semibold text-lg">View Stats</Text>
              </TouchableOpacity>
            </View>

            <Text className="text-xl font-semibold text-gray-800 mb-4">
              {cardCount === 0 ? 'No Cards Yet' : 'Cards Preview'}
            </Text>
          </>
        )}
      />
    </SafeAreaView>
  );
};

export default DeckDetails;