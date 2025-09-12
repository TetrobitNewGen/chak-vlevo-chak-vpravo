export interface User {
  id: string;
  name: string;
  level: number;
  avatar?: string;
}

export interface Course {
  id: string;
  title: string;
  difficulty: string;
  rating: number;
  image: string;
  description?: string;
}

export interface Event {
  id: string;
  title: string;
  date: string;
  time: string;
  location: string;
  image: string;
  description?: string;
}

export interface ForumPost {
  id: string;
  title: string;
  author: string;
  content: string;
  timestamp: string;
  likes: number;
  comments: number;
}

export type RootStackParamList = {
  Main: undefined;
  Course: { courseId: string };
  Event: { eventId: string };
  Forum: undefined;
  Settings: undefined;
};

export type DrawerParamList = {
  Home: undefined;
  Courses: undefined;
  Events: undefined;
  Forum: undefined;
  Settings: undefined;
};

