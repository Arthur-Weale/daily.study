import { View, Text, FlatList, TouchableOpacity } from 'react-native'
import React from 'react'
import { LinearGradient }  from "expo-linear-gradient";
import { useRouter } from 'expo-router';
import safeNavigate from '@/app/utils/safeNavigate';
import { dummyDecks } from '@/app/data/dummydata';

const decks = dummyDecks;

const Deck = () => {
  const route = useRouter()
  return (
        <FlatList
            data={decks}
            keyExtractor={(item)=> item.id.toString()}
            numColumns={2}
            showsVerticalScrollIndicator={false}
            columnWrapperStyle={{ justifyContent: "space-between", marginBottom: 10 }}
            renderItem={({item})=> <TouchableOpacity className={`w-[48%] min-h-[140px] rounded-2xl shadow-card-lg transition-all transform overflow-hidden`}
            onPress={()=> safeNavigate(()=> route.push(`/DeckDetails?id=${item.id}&title=${item.title}&cards=${item.cards}`))}>
            <LinearGradient
            colors={item.color as [string, string]}
            start={{x: 0, y:0}}
            end={{x: 0.2, y: 1}}
            className="flex-1 p-5 justify-between"
            >
                <View style={{ position:'absolute', top:-20, right:-20, width:80, height:80, borderRadius:40, backgroundColor:'#93C5FD', opacity:0.3 }} />
                <View style={{ position:'absolute', bottom:-10, left:-10, width:60, height:60, borderRadius:30, backgroundColor:'#60A5FA', opacity:0.15 }} />
                <View style={{ position:'absolute', top:-15, right:-15, width:40, height:40, borderRadius:20, backgroundColor:'#FBCFE8', opacity:0.25 }} />
                <View style={{ position:'absolute', bottom:-10, left:-10, width:30, height:30, borderRadius:15, backgroundColor:'#FECFEF', opacity:0.2 }} />
                <View style={{ position: 'absolute', bottom: 20, left: 105, width: 50, height: 50, borderRadius: 25, backgroundColor: '#FBCFE8', opacity:0.25 }}/>

                <Text className='text-white'>{item.title}</Text>
                <Text className='text-white'>{`${item.cards.length} Cards`}</Text>
            </LinearGradient>
            </TouchableOpacity>}
        />
  )
}

export default Deck