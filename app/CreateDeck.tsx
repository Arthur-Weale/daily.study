import FontAwesome5 from '@expo/vector-icons/FontAwesome5';
import Ionicons from '@expo/vector-icons/Ionicons';
import { LinearGradient } from 'expo-linear-gradient';
import { useRouter } from 'expo-router';
import React, { useState } from 'react';
import { Alert, FlatList, Text, TextInput, TouchableOpacity, TouchableWithoutFeedback, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { createDeck, initDb } from '@/app/data/database';
import safeNavigate from '@/app/utils/safeNavigate';

type ColorOption = {
  id: number;
  name: string;
  color: [string, string];
};

const colorPicker: ColorOption[] = [
  { id: 1, name: "blue", color: ['#60A5FA', '#3B82F6'] },
  { id: 2, name: "pink", color: ['#F472B6', '#EC4899'] },
  { id: 3, name: "yellow", color: ['#FDE047', '#FACC15'] },
  { id: 4, name: "purple", color: ['#C084FC', '#A855F7'] },
  { id: 5, name: "green", color: ['#4ADE80', '#22C55E'] },
];

const CreateDeckScreen = () => {
  const router = useRouter();
  const [selectedId, setSelectedId] = useState<number | null>(null);

  const [form, setForm] = useState({
    name: '',
    description: '',
    color: ['#60A5FA', '#3B82F6'] as [string, string],
  });

  const [saving, setSaving] = useState(false);

  const handleSelect = (item: ColorOption) => {
    setSelectedId(item.id);
    setForm(prev => ({ ...prev, color: item.color }));
  };

  const handleSave = async () => {
    if (!form.name.trim()) {
      Alert.alert('Error', 'Please enter a deck name');
      return;
    }

    setSaving(true);
    try {
      await initDb();
      const result = await createDeck(
        form.name.trim(),
        form.description.trim() || '', 
        form.color
      );

      const newDeckId = result.lastInsertRowId;

      Alert.alert('Success!', 'Deck created successfully', [
        {
          text: 'Go to Deck',
          onPress: () =>
            safeNavigate(() =>
              router.replace({
                pathname: '/DeckDetails',
                params: {
                  id: newDeckId.toString(),
                  title: form.name,
                  description: form.description.trim(),
                  color: JSON.stringify(form.color),
                },
              })
            ),
        },
        { text: 'Create Another', style: 'cancel', onPress: () => {
          setForm({ name: '', description: '', color: ['#60A5FA', '#3B82F6'] });
          setSelectedId(null);
        }},
      ]);
    } catch (error) {
      Alert.alert('Error', 'Failed to create deck');
      console.error(error);
    } finally {
      setSaving(false);
    }
  };

  return (
    <SafeAreaView className="flex-1 bg-white">
      <View className="flex-1 px-5 pt-4">

        <TouchableOpacity onPress={() => router.back()} className="mb-6">
          <Ionicons name="arrow-back" size={28} color="#1DA1F2" />
        </TouchableOpacity>

        <Text className="text-2xl font-bold text-gray-800 mb-8">Create New Deck</Text>

        <View className="gap-6 flex-1">

          <View className="gap-2">
            <Text className="text-gray-600 font-medium">Deck Name</Text>
            <TextInput
              placeholder="e.g. Spanish Vocabulary"
              value={form.name}
              onChangeText={(text) => setForm(prev => ({ ...prev, name: text }))}
              className="bg-gray-50 border border-gray-200 p-4 rounded-2xl text-base"
              style={{ elevation: 2 }}
            />
          </View>

          <View className="gap-2">
            <Text className="text-gray-600 font-medium">Description (Optional)</Text>
            <TextInput
              placeholder="e.g. Basic phrases and verbs"
              value={form.description}
              onChangeText={(text) => setForm(prev => ({ ...prev, description: text }))}
              className="bg-gray-50 border border-gray-200 p-4 rounded-2xl text-base"
              style={{ elevation: 2 }}
            />
          </View>

          <View className="gap-3">
            <Text className="text-gray-600 font-medium">Choose Color</Text>
            <FlatList
              horizontal
              showsHorizontalScrollIndicator={false}
              contentContainerStyle={{ gap: 16, paddingHorizontal: 4 }}
              data={colorPicker}
              keyExtractor={(item) => item.id.toString()}
              renderItem={({ item }) => (
                <TouchableWithoutFeedback onPress={() => handleSelect(item)}>
                  <View className="items-center">
                    <LinearGradient
                      colors={item.color}
                      className="w-14 h-14 rounded-full items-center justify-center shadow-md"
                    >
                      {selectedId === item.id && (
                        <FontAwesome5 name="check" size={28} color="white" />
                      )}
                    </LinearGradient>
                  </View>
                </TouchableWithoutFeedback>
              )}
            />
          </View>

          <View className="pt-6">
            <TouchableOpacity onPress={handleSave} disabled={saving}>
              <LinearGradient
                colors={["#1DA1F2", "#0D8AE0"]}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 0 }}
                className="py-5 rounded-2xl items-center shadow-lg"
              >
                <Text className="text-white text-lg font-bold">
                  {saving ? 'Creating...' : 'Create Deck'}
                </Text>
              </LinearGradient>
            </TouchableOpacity>
          </View>

        </View>
      </View>
    </SafeAreaView>
  );
};

export default CreateDeckScreen;