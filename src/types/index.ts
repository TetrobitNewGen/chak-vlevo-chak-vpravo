export interface User {
  id: string;
  name: string;
  level: number;
  avatar?: string;
}

export interface WordCard {
  id: string;
  tatarWord: string;
  russianWord: string;
  isCorrect: boolean; // правильный ли перевод
  difficulty: 'easy' | 'medium' | 'hard';
}

export interface GameState {
  currentCardIndex: number;
  lives: number; // количество чак-чак (жизней)
  score: number;
  streak: number; // серия правильных ответов
  isGameOver: boolean;
}

export interface SwipeDirection {
  direction: 'left' | 'right';
  cardId: string;
}

export type RootStackParamList = {
  Game: undefined;
  Profile: undefined;
  Rating: undefined; // Added for the new Rating screen
  Statistics: undefined; // Added for the new Statistics screen
  Favorites: undefined; // Added for the new Favorites screen
  Language: undefined; // Added for the new Language screen
  Settings: undefined;
};

