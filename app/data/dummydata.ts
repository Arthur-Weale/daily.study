export interface Card {
  id: string;
  front: string;
  back: string;
}

export interface Deck {
  id: string;
  title: string;
  description: string
  color: [string, string]; // gradient: start & end
  cards: Card[];
}

export const dummyDecks = [
  {
    id: 1,
    title: "Spanish Basics",
    description: "Common Spanish words and phrases for beginners.",
    color: ["#1DA1F2", "#0d8ddb"], // two shades
    cards: [
      { id: 1, front: "Hello", back: "Hola" },
      { id: 2, front: "Goodbye", back: "Adiós" },
      { id: 3, front: "Thank You", back: "Gracias" },
    ],
  },
  {
    id: 2,
    title: "French Basics",
    description: "Essential French vocabulary for beginners.",
    color: ["#f54242", "#d12e2e"],
    cards: [
      { id: 1, front: "Hello", back: "Bonjour" },
      { id: 2, front: "Thank You", back: "Merci" },
      { id: 3, front: "Good Night", back: "Bonne Nuit" },
    ],
  },
  {
    id: 3,
    title: "German Essentials",
    description: "Basic German phrases to get you started.",
    color: ["#42f554", "#2ed12e"],
    cards: [
      { id: 1, front: "Yes", back: "Ja" },
      { id: 2, front: "No", back: "Nein" },
      { id: 3, front: "Please", back: "Bitte" },
    ],
  },
  {
    id: 4,
    title: "Japanese Greetings",
    description: "Learn simple greetings in Japanese.",
    color: ["#f5a142", "#d17e2e"],
    cards: [
      { id: 1, front: "Good Morning", back: "おはよう (Ohayou)" },
      { id: 2, front: "Good Evening", back: "こんばんは (Konbanwa)" },
      { id: 3, front: "Goodbye", back: "さようなら (Sayounara)" },
    ],
  },
  {
    id: 5,
    title: "Italian Basics",
    description: "Common Italian words for beginners.",
    color: ["#a142f5", "#7e2ed1"],
    cards: [
      { id: 1, front: "Hello", back: "Ciao" },
      { id: 2, front: "Thank You", back: "Grazie" },
      { id: 3, front: "Good Night", back: "Buonanotte" },
    ],
  },
  {
    id: 6,
    title: "English Idioms",
    description: "Fun English idioms and their meanings.",
    color: ["#42f5e0", "#2ed1c3"],
    cards: [
      { id: 1, front: "Piece of cake", back: "Something easy" },
      { id: 2, front: "Break a leg", back: "Good luck" },
      { id: 3, front: "Hit the sack", back: "Go to sleep" },
    ],
  },
  {
    id: 7,
    title: "Korean Basics",
    description: "Basic Korean phrases for beginners.",
    color: ["#f5429e", "#d12e7e"],
    cards: [
      { id: 1, front: "Hello", back: "안녕하세요 (Annyeonghaseyo)" },
      { id: 2, front: "Thank You", back: "감사합니다 (Gamsahamnida)" },
      { id: 3, front: "Goodbye", back: "안녕히 가세요 (Annyeonghi gaseyo)" },
    ],
  },
];
