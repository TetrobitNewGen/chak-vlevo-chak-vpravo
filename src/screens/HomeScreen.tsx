import React, { useState, useRef, useEffect } from 'react';
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
import { LinearGradient } from 'expo-linear-gradient';

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
  { id: '9', tatarWord: 'Аяк', russianWord: 'Нога', isCorrect: true, difficulty: 'easy' },
  { id: '10', tatarWord: 'Баш', russianWord: 'Голова', isCorrect: true, difficulty: 'easy' },
  { id: '11', tatarWord: 'Күңел', russianWord: 'Сердце', isCorrect: true, difficulty: 'medium' },
  { id: '12', tatarWord: 'Күк', russianWord: 'Небо', isCorrect: true, difficulty: 'easy' },
  { id: '13', tatarWord: 'Җир', russianWord: 'Земля', isCorrect: true, difficulty: 'medium' },
  { id: '14', tatarWord: 'Кояш', russianWord: 'Солнце', isCorrect: true, difficulty: 'medium' },
  { id: '15', tatarWord: 'Ай', russianWord: 'Луна', isCorrect: true, difficulty: 'easy' },
  { id: '16', tatarWord: 'Йолдыз', russianWord: 'Звезда', isCorrect: true, difficulty: 'hard' },
  { id: '17', tatarWord: 'Агач', russianWord: 'Дерево', isCorrect: true, difficulty: 'medium' },
  { id: '18', tatarWord: 'Гөл', russianWord: 'Цветок', isCorrect: true, difficulty: 'easy' },
  { id: '19', tatarWord: 'Балык', russianWord: 'Рыба', isCorrect: true, difficulty: 'easy' },
  { id: '20', tatarWord: 'Эт', russianWord: 'Собака', isCorrect: true, difficulty: 'easy' },
  { id: '21', tatarWord: 'Мәче', russianWord: 'Кошка', isCorrect: true, difficulty: 'easy' },
  { id: '22', tatarWord: 'Сыер', russianWord: 'Корова', isCorrect: true, difficulty: 'medium' },
  { id: '23', tatarWord: 'Куян', russianWord: 'Заяц', isCorrect: true, difficulty: 'medium' },
  { id: '24', tatarWord: 'Аю', russianWord: 'Медведь', isCorrect: true, difficulty: 'hard' },
  { id: '25', tatarWord: 'Кыргый', russianWord: 'Волк', isCorrect: true, difficulty: 'hard' },
  // Неправильные переводы для усложнения
  { id: '26', tatarWord: 'Алма', russianWord: 'Груша', isCorrect: false, difficulty: 'easy' },
  { id: '27', tatarWord: 'Кош', russianWord: 'Рыба', isCorrect: false, difficulty: 'easy' },
  { id: '28', tatarWord: 'Су', russianWord: 'Молоко', isCorrect: false, difficulty: 'easy' },
  { id: '29', tatarWord: 'Ат', russianWord: 'Корова', isCorrect: false, difficulty: 'medium' },
  { id: '30', tatarWord: 'Йорт', russianWord: 'Школа', isCorrect: false, difficulty: 'medium' },
];

const mockUser: User = {
  id: '1',
  name: 'Йенифер',
  level: 10,
  avatar: 'https://via.placeholder.com/40x40/4CAF50/FFFFFF?text=Й',
};

// Функция для перемешивания массива карточек
const shuffleCards = (cards: WordCard[]) => {
  const shuffled = [...cards];
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  return shuffled;
};

export default function GameScreen() {
  const navigation = useNavigation();
  const [shuffledCards] = useState(() => shuffleCards(mockCards));
  const [gameState, setGameState] = useState<GameState>({
    currentCardIndex: 0,
    lives: 3,
    score: 0,
    streak: 0,
    isGameOver: false,
  });
  const [mascotImage, setMascotImage] = useState<'think' | 'good' | 'fail'>('think');

  const translateX = useRef(new Animated.Value(0)).current;
  const rotate = useRef(new Animated.Value(0)).current;
  const scale = useRef(new Animated.Value(1)).current;
  const opacity = useRef(new Animated.Value(1)).current;

  const currentCard = shuffledCards[gameState.currentCardIndex];
  

  // Сброс анимации при смене карточки
  useEffect(() => {
    // Плавный сброс анимации
    Animated.parallel([
      Animated.timing(translateX, {
        toValue: 0,
        duration: 200,
        useNativeDriver: true,
      }),
      Animated.timing(rotate, {
        toValue: 0,
        duration: 200,
        useNativeDriver: true,
      }),
      Animated.timing(scale, {
        toValue: 1,
        duration: 200,
        useNativeDriver: true,
      }),
      Animated.timing(opacity, {
        toValue: 1,
        duration: 200,
        useNativeDriver: true,
      }),
    ]).start();
  }, [gameState.currentCardIndex]);

  const handleSwipe = (direction: 'left' | 'right') => {
    if (gameState.isGameOver) return;

    const isCorrectAnswer = (direction === 'right' && currentCard.isCorrect) || 
                           (direction === 'left' && !currentCard.isCorrect);

    // Меняем картинку маскота в зависимости от ответа
    setMascotImage(isCorrectAnswer ? 'good' : 'fail');

    // Возвращаем картинку к исходной через 1.5 секунды
    setTimeout(() => {
      setMascotImage('think');
    }, 1500);

    // Анимация свайпа
    Animated.parallel([
      Animated.timing(translateX, {
        toValue: direction === 'right' ? width : -width,
        duration: 250,
        useNativeDriver: true,
      }),
      Animated.timing(rotate, {
        toValue: direction === 'right' ? 1 : -1,
        duration: 250,
        useNativeDriver: true,
      }),
      Animated.timing(opacity, {
        toValue: 0,
        duration: 250,
        useNativeDriver: true,
      }),
    ]).start(() => {
      // Обновляем состояние после завершения анимации
      if (isCorrectAnswer) {
        setGameState(prev => ({
          ...prev,
          score: prev.score + 1,
          streak: prev.streak + 1,
          currentCardIndex: (prev.currentCardIndex + 1) % shuffledCards.length,
        }));
      } else {
        setGameState(prev => ({
          ...prev,
          lives: prev.lives - 1,
          streak: 0,
          currentCardIndex: (prev.currentCardIndex + 1) % shuffledCards.length,
          isGameOver: prev.lives - 1 <= 0,
        }));
      }
    });
  };

  const renderChakChakLives = () => {
    return (
      <View style={styles.livesContainer}>
        <Text style={styles.livesLabel}>HP:</Text>
        {Array.from({ length: 3 }, (_, index) => (
          <Image
            source={require('../../assets/chak-empty.png')}
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
    if (gameState.isGameOver) {
      return (
        <View style={styles.gameOverContainer}>
          <Text style={styles.gameOverText}>Игра окончена!</Text>
          <Text style={styles.gameOverScoreText}>Счет: {gameState.score}</Text>
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

    if (!currentCard) {
      return (
        <View style={styles.card}>
          <Text style={styles.questionText}>Загрузка...</Text>
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
              opacity,
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
        </Animated.View>
      </PanGestureHandler>
    );
  };

  const getMascotImage = () => {
    switch (mascotImage) {
      case 'good':
        return require('../../assets/chak-good.png');
      case 'fail':
        return require('../../assets/chak-fail.png');
      default:
        return require('../../assets/chak-think.png');
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity 
          style={styles.menuButton}
          onPress={() => navigation.navigate('Profile' as never)}
        >
          <Ionicons name="menu" size={30} color={'#000'} />
        </TouchableOpacity>
        
        <View style={styles.userInfo}>
          <View style={styles.userTextInfo}>
            <Text style={styles.userLevel}>Уровень {mockUser.level}</Text>
            <Text style={styles.userHint}>10 xp до нового уровня!</Text>
          </View>

          <LinearGradient colors={['#FFF176', '#FF9800', '#5D08B8']} locations={[0, 0.3, 1]} style={styles.avatarContainer}>
            <View style={styles.avatarPlaceholder}>
              <Image source={require('../../assets/ava2.jpg')} style={styles.chakChakAvatar} />
            </View>
          </LinearGradient>
        </View>
      </View>

      {/* Stats Section */}
      <View style={styles.statsSection}>
        <View style={styles.scoreContainer}>
          <Text style={styles.scoreText}>Счет: {gameState.score}</Text>
          {gameState.streak > 0 && (
            <Text style={styles.streakText}>Серия: {gameState.streak}</Text>
          )}
          </View>
        {renderChakChakLives()}
        </View>

      {/* Game Area */}
      <View style={styles.gameArea}>
        {renderCard()}
        {!gameState.isGameOver && 
          <View style={styles.mascotContainer}>
            <Image style={styles.mascot} source={getMascotImage()} />
          </View>
        }
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
    backgroundColor: '#fff', // Светло-желтый фон как на фото
  },
  header: {
    backgroundColor: '#fff',
    paddingHorizontal: 20,
    paddingVertical: 15,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  menuButton: {
    padding: 5,
  },
  statsSection: {
    backgroundColor: colors.white,
    paddingHorizontal: 20,
    paddingVertical: 15,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderBottomWidth: 1,
    borderBottomColor: '#E0E0E0',
  },
  livesContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  scoreContainer: {
    alignItems: 'flex-start',
  },
  livesLabel: {
    color: colors.text,
    fontSize: 16,
    fontWeight: '600',
    marginRight: 10,
  },
  scoreText: {
    color: colors.text,
    fontSize: 14,
    fontWeight: '600',
  },
  streakText: {
    color: colors.secondary,
    fontSize: 12,
    fontWeight: '500',
  },
  chakChak: {
    width: 40,
    height: 40,
    marginRight: -10,
  },
  chakChakEmpty: {
    width: 40,
    height: 40,
    marginRight: -10,
    filter: 'brightness(0%)',
  },
  userInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-end',
    flex: 1,
  },
  avatarContainer: {
    marginLeft: 15,
    borderRadius: 30,
    padding: 7,
  },
  avatarPlaceholder: {
    width: 47,
    height: 47,
    borderRadius: 30,
    backgroundColor: colors.white,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: colors.black,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 4,
  },
  chakChakAvatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#FFD700',
    shadowColor: '#FFD700',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 3,
    elevation: 3,
  },
  userTextInfo: {
    alignItems: 'flex-end',
  },
  userHint: {
    color: '#8B8B8B',
    fontSize: 14,
    fontWeight: 'light',
    marginBottom: 2,
  },
  userLevel: {
    color: '#32D392',
    fontSize: 18,
    fontWeight: '600',
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
    backgroundColor: '#fff',
    borderRadius: 20,
    padding: 30,
    paddingBottom: 120,
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
    position: 'absolute',
    bottom: -20,
    alignItems: 'center',
    marginTop: 20,
  },
  mascot: {
    position: 'relative',
    width: 150,
    height: 150,
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
  gameOverScoreText: {
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

