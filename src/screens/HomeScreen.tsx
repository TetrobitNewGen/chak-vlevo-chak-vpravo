import React, { useState, useRef } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  Dimensions,
  Animated,
} from 'react-native';
import { PanGestureHandler, State } from 'react-native-gesture-handler';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { colors } from '../utils/colors';
import { WordCard, GameState, User } from '../types';

const { width, height } = Dimensions.get('window');

// Моковые данные для карточек
const mockCards: WordCard[] = [
  { id: '1', tatarWord: 'Алма', russianWord: 'Яблоко', isCorrect: true, difficulty: 'easy' },
  { id: '2', tatarWord: 'Кош', russianWord: 'Птица', isCorrect: true, difficulty: 'easy' },
  { id: '3', tatarWord: 'Су', russianWord: 'Вода', isCorrect: true, difficulty: 'easy' },
  { id: '4', tatarWord: 'Ат', russianWord: 'Лошадь', isCorrect: true, difficulty: 'medium' },
  { id: '5', tatarWord: 'Кит', russianWord: 'Рыба', isCorrect: false, difficulty: 'medium' },
  { id: '6', tatarWord: 'Йорт', russianWord: 'Дом', isCorrect: true, difficulty: 'medium' },
  { id: '7', tatarWord: 'Күз', russianWord: 'Глаз', isCorrect: true, difficulty: 'hard' },
  { id: '8', tatarWord: 'Кул', russianWord: 'Рука', isCorrect: true, difficulty: 'hard' },
];

const mockUser: User = {
  id: '1',
  name: 'Йенифер',
  level: 10,
  avatar: 'https://via.placeholder.com/40x40/4CAF50/FFFFFF?text=Й',
};

export default function GameScreen() {
  const navigation = useNavigation();
  const [gameState, setGameState] = useState<GameState>({
    currentCardIndex: 0,
    lives: 3,
    score: 0,
    streak: 0,
    isGameOver: false,
  });

  const translateX = useRef(new Animated.Value(0)).current;
  const rotate = useRef(new Animated.Value(0)).current;
  const scale = useRef(new Animated.Value(1)).current;

  const currentCard = mockCards[gameState.currentCardIndex];

  const handleSwipe = (direction: 'left' | 'right') => {
    if (gameState.isGameOver) return;

    const isCorrectAnswer = (direction === 'right' && currentCard.isCorrect) || 
                           (direction === 'left' && !currentCard.isCorrect);

    if (isCorrectAnswer) {
      setGameState(prev => ({
        ...prev,
        score: prev.score + 1,
        streak: prev.streak + 1,
        currentCardIndex: prev.currentCardIndex + 1,
      }));
    } else {
      setGameState(prev => ({
        ...prev,
        lives: prev.lives - 1,
        streak: 0,
        currentCardIndex: prev.currentCardIndex + 1,
        isGameOver: prev.lives - 1 <= 0,
      }));
    }

    // Анимация свайпа
    Animated.parallel([
      Animated.timing(translateX, {
        toValue: direction === 'right' ? width : -width,
        duration: 300,
        useNativeDriver: true,
      }),
      Animated.timing(rotate, {
        toValue: direction === 'right' ? 1 : -1,
        duration: 300,
        useNativeDriver: true,
      }),
    ]).start(() => {
      // Сброс анимации для следующей карточки
      translateX.setValue(0);
      rotate.setValue(0);
    });
  };

  const renderChakChakLives = () => {
    return (
      <View style={styles.livesContainer}>
        <Text style={styles.livesLabel}>HP:</Text>
        {Array.from({ length: 3 }, (_, index) => (
          <View
            key={index}
            style={[
              styles.chakChak,
              index >= gameState.lives && styles.chakChakEmpty,
            ]}
          />
        ))}
      </View>
    );
  };

  const renderCard = () => {
    if (!currentCard || gameState.isGameOver) {
      return (
        <View style={styles.gameOverContainer}>
          <Text style={styles.gameOverText}>
            {gameState.isGameOver ? 'Игра окончена!' : 'Поздравляем!'}
          </Text>
          <Text style={styles.scoreText}>Счет: {gameState.score}</Text>
          <TouchableOpacity
            style={styles.restartButton}
            onPress={() => setGameState({
              currentCardIndex: 0,
              lives: 3,
              score: 0,
              streak: 0,
              isGameOver: false,
            })}
          >
            <Text style={styles.restartButtonText}>Играть снова</Text>
          </TouchableOpacity>
        </View>
      );
    }

    return (
      <PanGestureHandler
        onHandlerStateChange={({ nativeEvent }) => {
          if (nativeEvent.state === State.END) {
            const { translationX, velocityX } = nativeEvent;
            if (Math.abs(translationX) > 50 || Math.abs(velocityX) > 500) {
              handleSwipe(translationX > 0 ? 'right' : 'left');
            } else {
              // Возврат карточки на место
              Animated.spring(translateX, {
                toValue: 0,
                useNativeDriver: true,
              }).start();
            }
          }
        }}
        onGestureEvent={Animated.event(
          [{ nativeEvent: { translationX: translateX } }],
          { useNativeDriver: true }
        )}
      >
        <Animated.View
          style={[
            styles.card,
            {
              transform: [
                { translateX },
                { 
                  rotate: rotate.interpolate({
                    inputRange: [-1, 1],
                    outputRange: ['-15deg', '15deg'],
                  })
                },
                { scale },
              ],
            },
          ]}
        >
          <Text style={styles.questionText}>Верный ли перевод?</Text>
          <Text style={styles.hintText}>Хмммм</Text>
          
          <View style={styles.wordContainer}>
            <Text style={styles.languageLabel}>татарский:</Text>
            <Text style={styles.tatarWord}>{currentCard.tatarWord}</Text>
          </View>

          <View style={styles.arrowContainer}>
            <Ionicons name="swap-vertical" size={24} color={colors.gray} />
          </View>

          <View style={styles.wordContainer}>
            <Text style={styles.languageLabel}>русский:</Text>
            <Text style={styles.russianWord}>{currentCard.russianWord}</Text>
          </View>

          {/* Маскот персонаж */}
          <View style={styles.mascotContainer}>
            <View style={styles.mascot}>
              <View style={styles.mascotBody} />
              <View style={styles.mascotCap} />
              <View style={styles.mascotEyes}>
                <View style={styles.eye} />
                <View style={styles.eye} />
              </View>
            </View>
          </View>
        </Animated.View>
      </PanGestureHandler>
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity 
          style={styles.menuButton}
          onPress={() => navigation.navigate('Settings' as never)}
        >
          <Ionicons name="settings" size={24} color={colors.white} />
        </TouchableOpacity>
        
        {renderChakChakLives()}
        
        <View style={styles.userInfo}>
          <Text style={styles.userName}>{mockUser.name}</Text>
          <Text style={styles.userLevel}>{mockUser.level} уровень</Text>
          <Image source={{ uri: mockUser.avatar }} style={styles.avatar} />
        </View>
      </View>

      {/* Game Area */}
      <View style={styles.gameArea}>
        {renderCard()}
      </View>

      {/* Action Buttons */}
      <View style={styles.actionButtons}>
        <TouchableOpacity
          style={[styles.actionButton, styles.wrongButton]}
          onPress={() => handleSwipe('left')}
        >
          <Ionicons name="close" size={30} color={colors.white} />
        </TouchableOpacity>
        
        <TouchableOpacity
          style={[styles.actionButton, styles.correctButton]}
          onPress={() => handleSwipe('right')}
        >
          <Ionicons name="checkmark" size={30} color={colors.white} />
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFF8E1', // Светло-желтый фон как на фото
  },
  header: {
    backgroundColor: colors.primary,
    paddingHorizontal: 20,
    paddingVertical: 15,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  menuButton: {
    padding: 5,
  },
  livesContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  livesLabel: {
    color: colors.white,
    fontSize: 16,
    fontWeight: '600',
    marginRight: 10,
  },
  chakChak: {
    width: 20,
    height: 20,
    borderRadius: 10,
    backgroundColor: '#FFD700', // Золотой цвет чак-чак
    marginRight: 5,
    shadowColor: '#FFD700',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 3,
    elevation: 3,
  },
  chakChakEmpty: {
    backgroundColor: '#D3D3D3', // Серый для пустых жизней
    shadowOpacity: 0,
  },
  userInfo: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  userName: {
    color: colors.white,
    fontSize: 16,
    fontWeight: '600',
    marginRight: 10,
  },
  userLevel: {
    color: colors.secondary,
    fontSize: 12,
    marginRight: 10,
  },
  avatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
  },
  gameArea: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 20,
  },
  card: {
    width: width - 40,
    height: height * 0.6,
    backgroundColor: colors.white,
    borderRadius: 20,
    padding: 30,
    shadowColor: colors.black,
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.15,
    shadowRadius: 12,
    elevation: 8,
    justifyContent: 'space-between',
  },
  questionText: {
    fontSize: 16,
    color: colors.gray,
    textAlign: 'center',
    marginBottom: 5,
  },
  hintText: {
    fontSize: 14,
    color: colors.gray,
    textAlign: 'center',
    fontStyle: 'italic',
    marginBottom: 30,
  },
  wordContainer: {
    alignItems: 'center',
    marginVertical: 15,
  },
  languageLabel: {
    fontSize: 14,
    color: colors.gray,
    marginBottom: 8,
  },
  tatarWord: {
    fontSize: 28,
    fontWeight: 'bold',
    color: colors.text,
    textAlign: 'center',
  },
  russianWord: {
    fontSize: 28,
    fontWeight: 'bold',
    color: colors.text,
    textAlign: 'center',
  },
  arrowContainer: {
    alignItems: 'center',
    marginVertical: 10,
  },
  mascotContainer: {
    alignItems: 'center',
    marginTop: 20,
  },
  mascot: {
    position: 'relative',
    width: 80,
    height: 80,
  },
  mascotBody: {
    width: 60,
    height: 60,
    backgroundColor: '#D2B48C', // Цвет кожи
    borderRadius: 30,
    position: 'absolute',
    bottom: 0,
    left: 10,
  },
  mascotCap: {
    width: 50,
    height: 30,
    backgroundColor: '#228B22', // Темно-зеленый
    borderRadius: 25,
    position: 'absolute',
    top: 0,
    left: 15,
    borderWidth: 2,
    borderColor: '#FFD700', // Золотая вышивка
  },
  mascotEyes: {
    flexDirection: 'row',
    position: 'absolute',
    top: 20,
    left: 20,
  },
  eye: {
    width: 8,
    height: 8,
    backgroundColor: colors.black,
    borderRadius: 4,
    marginHorizontal: 5,
  },
  gameOverContainer: {
    alignItems: 'center',
    padding: 40,
  },
  gameOverText: {
    fontSize: 24,
    fontWeight: 'bold',
    color: colors.text,
    marginBottom: 20,
    textAlign: 'center',
  },
  scoreText: {
    fontSize: 18,
    color: colors.gray,
    marginBottom: 30,
  },
  restartButton: {
    backgroundColor: colors.primary,
    paddingHorizontal: 30,
    paddingVertical: 15,
    borderRadius: 25,
  },
  restartButtonText: {
    color: colors.white,
    fontSize: 16,
    fontWeight: '600',
  },
  actionButtons: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    paddingHorizontal: 40,
    paddingVertical: 30,
  },
  actionButton: {
    width: 70,
    height: 70,
    borderRadius: 35,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: colors.black,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 6,
    elevation: 6,
  },
  wrongButton: {
    backgroundColor: '#FF4444',
  },
  correctButton: {
    backgroundColor: '#44AA44',
  },
});

