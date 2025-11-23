import { Text, TouchableOpacity } from 'react-native'
import React from 'react'
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import { LinearGradient }  from "expo-linear-gradient";

const CreateButton = () => {
  return (
    <TouchableOpacity>
        <LinearGradient
            colors={["#1DA1F2", "#1DA1F2"]}
            start={{x: 0, y: 0}}
            end={{x: 0.1, y: 1}}
            style={{
                flexDirection: 'row',
                gap: 4,
                paddingHorizontal: 5,
                paddingVertical: 12,
                borderRadius: 24,
                alignItems: 'center',
                justifyContent: 'center',
                width: 130,
                position: 'absolute',
                bottom: -260,
                right: -10
            }}>
            <MaterialCommunityIcons name="plus" size={24} color="white" />
            <Text>Create Deck</Text>
        </LinearGradient>
    </TouchableOpacity>
)
}

export default CreateButton