import { View, Text, FlatList, TouchableOpacity, ActivityIndicator } from 'react-native'
import React, { useEffect, useState } from 'react'
import { LinearGradient } from "expo-linear-gradient";
import { useRouter } from 'expo-router';
import safeNavigate from '@/app/utils/safeNavigate';
import { getAllDecks, getCardsByDeck, initDb } from '@/app/data/database'; // Use existing functions

interface DeckItem {
  id: number;
  name: string;
  description: string;
  color: string;
  created_at: string;
}

interface TransformedDeck {
  id: number;
  title: string;
  description: string;
  color: [string, string];
  cardCount: number;
}

const Deck = () => {
  const router = useRouter();
  const [decks, setDecks] = useState<TransformedDeck[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const loadDecks = async () => {
    try {
      setLoading(true);
      setError(null);
      
      // Initialize database first
      await initDb();
      
      // Get all decks
      const decksData = await getAllDecks() as DeckItem[];
      console.log('Raw decks data:', decksData); // Debug log

      if (!decksData || decksData.length === 0) {
        setDecks([]);
        return;
      }

      // Get card count for each deck and transform data
      const transformedDecks = await Promise.all(
        decksData.map(async (deck) => {
          try {
            const cards = await getCardsByDeck(deck.id);
            const cardCount = cards?.length || 0;
            
            // Parse color with error handling
            let colors: [string, string] = ['#6a11cb', '#2575fc'];
            try {
              if (deck.color) {
                const parsedColors = JSON.parse(deck.color);
                if (Array.isArray(parsedColors) && parsedColors.length >= 2) {
                  colors = [parsedColors[0], parsedColors[1]];
                }
              }
            } catch (colorError) {
              console.warn('Error parsing deck color for deck', deck.id, colorError);
            }

            return {
              id: deck.id,
              title: deck.name,
              description: deck.description || '',
              color: colors,
              cardCount: cardCount
            };
          } catch (cardError) {
            console.error('Error loading cards for deck', deck.id, cardError);
            return {
              id: deck.id,
              title: deck.name,
              description: deck.description || '',
              color: ['#6a11cb', '#2575fc'] as [string, string],
              cardCount: 0
            };
          }
        })
      );

      console.log('Transformed decks:', transformedDecks); // Debug log
      setDecks(transformedDecks);
    } catch (error) {
      console.error('Error loading decks:', error);
      setError('Failed to load decks');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadDecks();
  }, []);

  // Add pull to refresh
  const onRefresh = () => {
    loadDecks();
  };

  if (loading) {
    return (
      <View className="flex-1 justify-center items-center bg-gray-50">
        <ActivityIndicator size="large" color="#6a11cb" />
        <Text className="mt-4 text-gray-600">Loading decks...</Text>
      </View>
    );
  }

  if (error) {
    return (
      <View className="flex-1 justify-center items-center bg-gray-50 px-8">
        <Text className="text-red-500 text-lg text-center font-medium">{error}</Text>
        <TouchableOpacity 
          className="mt-4 bg-blue-500 px-6 py-3 rounded-lg"
          onPress={loadDecks}
        >
          <Text className="text-white font-medium">Try Again</Text>
        </TouchableOpacity>
      </View>
    );
  }

  if (decks.length === 0) {
    return (
      <View className="flex-1 justify-center items-center bg-gray-50 px-8">
        <Text className="text-gray-600 text-lg text-center font-medium">No decks found</Text>
        <Text className="text-gray-500 mt-2 text-center">Create your first deck to get started!</Text>
        <TouchableOpacity 
          className="mt-6 bg-blue-500 px-6 py-3 rounded-lg"
          onPress={loadDecks}
        >
          <Text className="text-white font-medium">Refresh</Text>
        </TouchableOpacity>
      </View>
    );
  }

  return (
    <View className="flex-1 bg-gray-50">
      <FlatList
        data={decks}
        keyExtractor={(item) => item.id.toString()}
        numColumns={2}
        showsVerticalScrollIndicator={false}
        refreshing={loading}
        onRefresh={onRefresh}
        contentContainerStyle={{
          padding: 16,
        }}
        columnWrapperStyle={{
          justifyContent: 'space-between',
          marginBottom: 16,
        }}
        renderItem={({ item }) => (
          <TouchableOpacity 
            className="w-[48%] min-h-[160px] rounded-2xl overflow-hidden shadow-lg"
            onPress={() => safeNavigate(() => router.push(`/DeckDetails?id=${item.id}&title=${item.title}`))}
          >
            <LinearGradient
              colors={item.color}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 1 }}
              className="flex-1 p-4 justify-between"
            >
              {/* Background decorative elements */}
              <View style={{ position:'absolute', top:-20, right:-20, width:80, height:80, borderRadius:40, backgroundColor:'#93C5FD', opacity:0.3 }} />
              <View style={{ position:'absolute', bottom:-10, left:-10, width:60, height:60, borderRadius:30, backgroundColor:'#60A5FA', opacity:0.15 }} />
              <View style={{ position:'absolute', top:-15, right:-15, width:40, height:40, borderRadius:20, backgroundColor:'#FBCFE8', opacity:0.25 }} />
              <View style={{ position:'absolute', bottom:-10, left:-10, width:30, height:30, borderRadius:15, backgroundColor:'#FECFEF', opacity:0.2 }} />
              <View style={{ position: 'absolute', bottom: 20, left: 105, width: 50, height: 50, borderRadius: 25, backgroundColor: '#FBCFE8', opacity:0.25 }}/>

              {/* Deck content */}
              <View className="flex-1">
                <Text 
                  className="text-white font-bold text-lg mb-2"
                  numberOfLines={2}
                >
                  {item.title}
                </Text>
              </View>
              <Text className="text-white font-medium text-base">
                {item.cardCount} {item.cardCount === 1 ? 'Card' : 'Cards'}
              </Text>
            </LinearGradient>
          </TouchableOpacity>
        )}
      />
    </View>
  );
}

export default Deck;