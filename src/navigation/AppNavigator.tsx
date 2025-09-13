import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { Ionicons } from '@expo/vector-icons';

import { colors } from '../utils/colors';
import { RootStackParamList } from '../types';

// Импорт экранов
import GameScreen from '../screens/HomeScreen';
import ProfileScreen from '../screens/ProfileScreen';
import RatingScreen from '../screens/RatingScreen'; // Added
import StatisticsScreen from '../screens/StatisticsScreen'; // Added
import FavoritesScreen from '../screens/FavoritesScreen'; // Added
import SettingsScreen from '../screens/SettingsScreen';

const Stack = createStackNavigator<RootStackParamList>();

// Главный навигатор приложения
export default function AppNavigator() {
  return (
    <NavigationContainer>
      <Stack.Navigator 
        screenOptions={{ 
          headerShown: false,
          gestureEnabled: true,
          cardStyleInterpolator: ({ current, layouts }) => {
            return {
              cardStyle: {
                transform: [
                  {
                    translateX: current.progress.interpolate({
                      inputRange: [0, 1],
                      outputRange: [layouts.screen.width, 0],
                    }),
                  },
                ],
              },
            };
          },
        }}
      >
        <Stack.Screen name="Game" component={GameScreen} />
        <Stack.Screen 
          name="Profile" 
          component={ProfileScreen}
          options={{
            headerShown: false,
          }}
        />
        <Stack.Screen 
          name="Rating" 
          component={RatingScreen}
          options={{
            headerShown: false,
          }}
        />
        <Stack.Screen 
          name="Statistics" 
          component={StatisticsScreen}
          options={{
            headerShown: false,
          }}
        />
        <Stack.Screen 
          name="Favorites" 
          component={FavoritesScreen}
          options={{
            headerShown: false,
          }}
        />
        <Stack.Screen 
          name="Settings" 
          component={SettingsScreen}
          options={{
            headerShown: true,
            title: 'Настройки',
            headerStyle: {
              backgroundColor: colors.primary,
            },
            headerTintColor: colors.white,
            headerTitleStyle: {
              fontWeight: '600',
            },
          }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

