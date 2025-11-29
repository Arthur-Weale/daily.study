import { View, Text, TouchableOpacity, TextInput, Alert } from 'react-native';
import React, { useState } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import Ionicons from '@expo/vector-icons/Ionicons';
import { LinearGradient } from 'expo-linear-gradient';
import { useRouter, useLocalSearchParams } from 'expo-router';
import { createCard, initDb } from '@/app/data/database';

const CreateDeck = () => {
  const router = useRouter();
  const { id: deckId } = useLocalSearchParams<{ id: string }>();

  const [front, setFront] = useState('');
  const [back, setBack] = useState('');
  const [saving, setSaving] = useState(false);

  const handleSave = async () => {
    if (!front.trim() || !back.trim()) {
      Alert.alert('Missing fields', 'Please fill both front and back');
      return;
    }

    if (!deckId) {
      Alert.alert('Error', 'No deck selected');
      return;
    }

    setSaving(true);
    try {
      await initDb();
      await createCard(Number(deckId), front.trim(), back.trim());
      Alert.alert('Success', 'Card added!', [{ text: 'OK', onPress: () => router.back() }]);
    } catch (error) {
      Alert.alert('Error', 'Failed to save card');
    } finally {
      setSaving(false);
    }
  };

  return (
    <SafeAreaView className="flex-1 bg-white">
      <View className="flex-1 p-5">

        <TouchableOpacity onPress={() => router.back()} className="mb-6">
          <Ionicons name="arrow-back" size={28} color="#1DA1F2" />
        </TouchableOpacity>

        <Text className="text-2xl font-bold text-gray-800 mb-8">Add Flashcard</Text>

        <View className="flex-1 gap-6">

          <View className="gap-2">
            <Text className="text-gray-600 font-medium">Front (Question)</Text>
            <TextInput
              placeholder="e.g. What is the capital of France?"
              value={front}
              onChangeText={setFront}
              className="bg-gray-50 border border-gray-200 p-4 rounded-2xl text-base"
              style={{ elevation: 2 }}
            />
          </View>

          <View className="gap-2 flex-1">
            <Text className="text-gray-600 font-medium">Back (Answer)</Text>
            <TextInput
              placeholder="e.g. Paris"
              value={back}
              onChangeText={setBack}
              multiline
              textAlignVertical="top"
              className="bg-gray-50 border border-gray-200 p-4 rounded-2xl flex-1 text-base"
              style={{ elevation: 2 }}
            />
          </View>

          <TouchableOpacity onPress={handleSave} disabled={saving}>
            <LinearGradient
              colors={["#1DA1F2", "#0D8AE0"]}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 0 }}
              className="py-5 rounded-2xl items-center shadow-lg"
            >
              <Text className="text-white text-lg font-semibold">
                {saving ? 'Saving...' : 'Save Card'}
              </Text>
            </LinearGradient>
          </TouchableOpacity>

        </View>
      </View>
    </SafeAreaView>
  );
};

export default CreateDeck;