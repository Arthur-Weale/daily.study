import { View, Text, FlatList, TouchableOpacity } from 'react-native'
import React from 'react'
import { LinearGradient }  from "expo-linear-gradient";
import { useRouter } from 'expo-router';

interface Decks{
    id: string,
    title: string,
    cards: number, 
    color: [string, string]
}

const decks: Decks[] = [
  {id: "1",
    title: "Spanish",
    cards: 30, 
    color: ["#60a5fa", "#3b82f6"]
  },

  {id: "2",
    title: "Science",
    cards: 30,
    color: ["#F472B6", "#EC4899"]
  },

  {id: "3",
    title: "Javascript Basics",
    cards: 30,
    color: ["#FDE047", "#FACC15"]
  },
    {id: "4",
    title: "Science",
    cards: 30,
    color: ["#C084FC", "#A855F7"]
  },
]

const Deck = () => {
  const route = useRouter()
  return (
        <FlatList
            data={decks}
            keyExtractor={(item)=> item.id}
            numColumns={2}
            columnWrapperStyle={{ justifyContent: "space-between", marginBottom: 10 }}
            renderItem={({item})=> <TouchableOpacity className={`w-[48%] min-h-[140px] rounded-2xl shadow-card-lg transition-all transform overflow-hidden`}
            onPress={()=> route.push(`/screens/DeckDetails?id=${item.id}&title=${item.title}&cards=${item.cards}`)}>
            <LinearGradient
            colors={item.color}
            start={{x: 0, y:0}}
            end={{x: 0.2, y: 1}}
            className="flex-1 p-5 justify-start"
            >
                {/* Blobs */}
                <View style={{ position:'absolute', top:-20, right:-20, width:80, height:80, borderRadius:40, backgroundColor:'#93C5FD', opacity:0.3 }} />
                <View style={{ position:'absolute', bottom:-10, left:-10, width:60, height:60, borderRadius:30, backgroundColor:'#60A5FA', opacity:0.15 }} />
                <View style={{ position:'absolute', top:-15, right:-15, width:40, height:40, borderRadius:20, backgroundColor:'#FBCFE8', opacity:0.25 }} />
                <View style={{ position:'absolute', bottom:-10, left:-10, width:30, height:30, borderRadius:15, backgroundColor:'#FECFEF', opacity:0.2 }} />
                <View style={{ position: 'absolute', bottom: 20, left: 105, width: 50, height: 50, borderRadius: 25, backgroundColor: '#FBCFE8', opacity:0.25 }}/>

                <Text>{item.title}</Text>
                <Text>{item.cards}</Text>
            </LinearGradient>
            </TouchableOpacity>}
        />
  )
}

export default Deck