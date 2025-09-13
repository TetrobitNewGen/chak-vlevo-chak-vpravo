import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { colors } from '../utils/colors';

interface FavoriteWord {
  id: string;
  tatarWord: string;
  russianWord: string;
  difficulty: 'easy' | 'medium' | 'hard';
}

export default function FavoritesScreen() {
  const navigation = useNavigation();

  // Моковые данные любимых слов
  const favoriteWords: FavoriteWord[] = [
    {
      id: '1',
      tatarWord: 'сәлам',
      russianWord: 'привет',
      difficulty: 'easy',
    },
    {
      id: '2',
      tatarWord: 'рәхмәт',
      russianWord: 'спасибо',
      difficulty: 'easy',
    },
    {
      id: '3',
      tatarWord: 'кичә',
      russianWord: 'вчера',
      difficulty: 'medium',
    },
    {
      id: '4',
      tatarWord: 'бүген',
      russianWord: 'сегодня',
      difficulty: 'easy',
    },
    {
      id: '5',
      tatarWord: 'иртәгә',
      russianWord: 'завтра',
      difficulty: 'medium',
    },
    {
      id: '6',
      tatarWord: 'өй',
      russianWord: 'дом',
      difficulty: 'easy',
    },
    {
      id: '7',
      tatarWord: 'гаилә',
      russianWord: 'семья',
      difficulty: 'medium',
    },
    {
      id: '8',
      tatarWord: 'дус',
      russianWord: 'друг',
      difficulty: 'easy',
    },
    {
      id: '9',
      tatarWord: 'китап',
      russianWord: 'книга',
      difficulty: 'easy',
    },
    {
      id: '10',
      tatarWord: 'мәктәп',
      russianWord: 'школа',
      difficulty: 'medium',
    },
    {
      id: '11',
      tatarWord: 'эш',
      russianWord: 'работа',
      difficulty: 'easy',
    },
    {
      id: '12',
      tatarWord: 'аш',
      russianWord: 'еда',
      difficulty: 'easy',
    },
    {
      id: '13',
      tatarWord: 'су',
      russianWord: 'вода',
      difficulty: 'easy',
    },
    {
      id: '14',
      tatarWord: 'күк',
      russianWord: 'небо',
      difficulty: 'easy',
    },
    {
      id: '15',
      tatarWord: 'җир',
      russianWord: 'земля',
      difficulty: 'easy',
    },
  ];

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'easy':
        return '#4CAF50';
      case 'medium':
        return '#FF9800';
      case 'hard':
        return '#F44336';
      default:
        return colors.gray;
    }
  };

  const getDifficultyText = (difficulty: string) => {
    switch (difficulty) {
      case 'easy':
        return 'Легко';
      case 'medium':
        return 'Средне';
      case 'hard':
        return 'Сложно';
      default:
        return '';
    }
  };

  const renderFavoriteWord = (word: FavoriteWord) => (
    <View key={word.id} style={styles.wordCard}>
      <View style={styles.wordContent}>
        <View style={styles.wordTextContainer}>
          <Text style={styles.tatarWord}>{word.tatarWord}</Text>
          <Text style={styles.russianWord}>{word.russianWord}</Text>
        </View>
        <View style={styles.difficultyContainer}>
          <View 
            style={[
              styles.difficultyBadge, 
              { backgroundColor: getDifficultyColor(word.difficulty) }
            ]}
          >
            <Text style={styles.difficultyText}>
              {getDifficultyText(word.difficulty)}
            </Text>
          </View>
        </View>
      </View>
    </View>
  );

  return (
    <SafeAreaView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity 
          style={styles.backButton}
          onPress={() => navigation.goBack()}
        >
          <Ionicons name="arrow-back" size={24} color={colors.text} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Любимые слова</Text>
        <View style={styles.headerRight} />
      </View>

      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        {/* Title Section */}
        <View style={styles.titleSection}>
          <Text style={styles.subtitle}>твои любимые слова:</Text>
          <Text style={styles.title}>Любимые слова</Text>
        </View>

        {/* Count Display */}
        <View style={styles.countContainer}>
          <View style={styles.countIcon}>
            <Ionicons name="heart" size={32} color="#E91E63" />
          </View>
          <Text style={styles.countNumber}>{favoriteWords.length}</Text>
          <Text style={styles.countLabel}>слов в избранном</Text>
        </View>

        {/* Words List */}
        <View style={styles.wordsContainer}>
          {favoriteWords.map(renderFavoriteWord)}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.white,
  },
  header: {
    backgroundColor: colors.white,
    paddingHorizontal: 20,
    paddingVertical: 15,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderBottomWidth: 1,
    borderBottomColor: '#E0E0E0',
  },
  backButton: {
    padding: 5,
  },
  headerTitle: {
    color: colors.text,
    fontSize: 18,
    fontWeight: '600',
  },
  headerRight: {
    width: 34, // Для симметрии
  },
  content: {
    flex: 1,
  },
  titleSection: {
    padding: 20,
    margin: 20,
    backgroundColor: colors.white,
    borderRadius: 8,
    shadowColor: colors.black,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  subtitle: {
    fontSize: 14,
    color: colors.gray,
    marginBottom: 5,
  },
  title: {
    fontSize: 24,
    fontWeight: '600',
    color: colors.text,
  },
  countContainer: {
    backgroundColor: colors.white,
    marginHorizontal: 20,
    marginBottom: 20,
    padding: 30,
    borderRadius: 20,
    alignItems: 'center',
    shadowColor: colors.black,
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.15,
    shadowRadius: 12,
    elevation: 8,
    borderLeftWidth: 4,
    borderLeftColor: '#E91E63',
  },
  countIcon: {
    marginBottom: 15,
  },
  countNumber: {
    fontSize: 48,
    fontWeight: '600',
    color: '#E91E63',
    marginBottom: 8,
  },
  countLabel: {
    fontSize: 16,
    color: colors.gray,
    textAlign: 'center',
  },
  wordsContainer: {
    paddingHorizontal: 20,
    marginBottom: 20,
  },
  wordCard: {
    backgroundColor: colors.white,
    borderRadius: 20,
    marginBottom: 12,
    shadowColor: colors.black,
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.15,
    shadowRadius: 12,
    elevation: 8,
  },
  wordContent: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 15,
  },
  wordTextContainer: {
    flex: 1,
  },
  tatarWord: {
    fontSize: 20,
    fontWeight: '600',
    color: colors.text,
    marginBottom: 4,
  },
  russianWord: {
    fontSize: 16,
    color: colors.gray,
  },
  difficultyContainer: {
    marginLeft: 15,
  },
  difficultyBadge: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 15,
  },
  difficultyText: {
    fontSize: 12,
    color: colors.white,
    fontWeight: '600',
  },
});
