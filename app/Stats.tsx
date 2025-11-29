import Ionicons from '@expo/vector-icons/Ionicons';
import Feather from '@expo/vector-icons/Feather';
import FontAwesome6 from '@expo/vector-icons/FontAwesome6';
import { useLocalSearchParams, useRouter } from 'expo-router';
import React, { useEffect, useState } from 'react';
import { FlatList, Text, TouchableOpacity, View, ActivityIndicator } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { getRecentActivity, getStats, getCardsByDeck, initDb } from '@/app/data/database';

type Session = {
  id: number;
  deck_id: number;
  deck_name: string;
  cards_studied: number;
  accuracy: number;
  created_at: string;
};

const StatsScreen = () => {
  const router = useRouter();
  const params = useLocalSearchParams<{ id?: string }>();
  const deckId = params.id ? Number(params.id) : null;

  const [sessions, setSessions] = useState<Session[]>([]);
  const [loading, setLoading] = useState(true);
  const [totalCards, setTotalCards] = useState(0);
  const [totalStudied, setTotalStudied] = useState(0);
  const [overallAccuracy, setOverallAccuracy] = useState(0);

  useEffect(() => {
    const loadStats = async () => {
      try {
        await initDb();

        // Load recent activity
        const recent = await getRecentActivity() as Session[];
        const filteredSessions = deckId
          ? recent.filter(s => s.deck_id === deckId)
          : recent;
        setSessions(filteredSessions);

        // Load overall stats
        const allStats = await getStats() as any[];

        let studied = 0;
        let correctWeighted = 0;

        allStats.forEach(stat => {
          if (!deckId || stat.deck_id === deckId) {
            const cards = stat.cards_studied || 0;
            const acc = stat.overall_accuracy || 0;
            studied += cards;
            correctWeighted += (acc / 100) * cards;
          }
        });

        setTotalStudied(studied);
        setOverallAccuracy(studied > 0 ? Math.round(correctWeighted) : 0);

        // Load total cards in deck (if viewing a specific deck)
        if (deckId) {
          const cards = await getCardsByDeck(deckId);
          setTotalCards((cards as any[]).length);
        } else {
          setTotalCards(0);
        }

      } catch (error) {
        console.error('Failed to load stats:', error);
      } finally {
        setLoading(false);
      }
    };

    loadStats();
  }, [deckId]);

  if (loading) {
    return (
      <SafeAreaView className="flex-1 bg-white justify-center items-center">
        <ActivityIndicator size="large" color="#1DA1F2" />
        <Text className="mt-4 text-gray-600">Loading stats...</Text>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView className="flex-1 bg-white">
      <FlatList
        data={sessions}
        keyExtractor={(item) => item.id.toString()}
        contentContainerStyle={{ padding: 20, paddingBottom: 100 }}
        showsVerticalScrollIndicator={false}
        ItemSeparatorComponent={() => <View style={{ height: 12 }} />}
        ListEmptyComponent={() => (
          <View className="py-10 items-center">
            <Text className="text-gray-500 text-center">No study sessions yet</Text>
          </View>
        )}
        renderItem={({ item }) => (
          <View className="flex-row justify-between items-center bg-white rounded-2xl p-5 shadow-sm border border-gray-100">
            <View>
              <Text className="font-semibold text-gray-800">{item.deck_name}</Text>
              <View className="flex-row gap-2 mt-1">
                <Text className="text-sm text-gray-500">{item.cards_studied} cards</Text>
                <Text className="text-sm text-gray-500">•</Text>
                <Text className="text-sm text-gray-500">{item.accuracy}% accuracy</Text>
              </View>
            </View>
            <View className="bg-green-500 w-20 h-20 rounded-full items-center justify-center">
              <Text className="text-white text-xl font-bold">{item.accuracy}%</Text>
            </View>
          </View>
        )}
        ListHeaderComponent={() => (
          <>
            <TouchableOpacity onPress={() => router.back()} className="mb-6">
              <Ionicons name="arrow-back" size={28} color="#1DA1F2" />
            </TouchableOpacity>

            <Text className="text-2xl font-bold text-gray-800 mb-8">Statistics</Text>

            <View className="gap-5 mb-8">
              <View className="flex-row bg-white rounded-3xl p-6 shadow-md">
                <View className="bg-blue-500 p-4 rounded-full">
                  <Feather name="book-open" size={28} color="white" />
                </View>
                <View className="ml-4 justify-center">
                  <Text className="text-gray-500">Total Cards</Text>
                  <Text className="text-3xl font-bold">{totalCards}</Text>
                </View>
              </View>

              <View className="flex-row bg-white rounded-3xl p-6 shadow-md">
                <View className="bg-pink-500 p-4 rounded-full">
                  <FontAwesome6 name="arrow-trend-up" size={28} color="white" />
                </View>
                <View className="ml-4 justify-center">
                  <Text className="text-gray-500">Cards Studied</Text>
                  <Text className="text-3xl font-bold">{totalStudied}</Text>
                </View>
              </View>

              <View className="flex-row bg-white rounded-3xl p-6 shadow-md">
                <View className="bg-green-500 p-4 rounded-full">
                  <Feather name="target" size={28} color="white" />
                </View>
                <View className="ml-4 justify-center">
                  <Text className="text-gray-500">Overall Accuracy</Text>
                  <Text className="text-3xl font-bold">{overallAccuracy}%</Text>
                  <Text className="text-gray-500">
                    {Math.round((overallAccuracy / 100) * totalStudied)} / {totalStudied} correct
                  </Text>
                </View>
              </View>
            </View>

            <Text className="text-xl font-semibold text-gray-800 mb-4">
              Recent Activity
            </Text>
          </>
        )}
      />
    </SafeAreaView>
  );
};

export default StatsScreen;