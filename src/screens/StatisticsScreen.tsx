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

export default function StatisticsScreen() {
  const navigation = useNavigation();

  // Моковые данные статистики
  const currentStreak = 7; // текущий стрик
  const bestStreak = 15; // лучший стрик
  const motivationalQuotes = [
    "Каждый день - это новая возможность стать лучше! 💪",
    "Твоя настойчивость - ключ к успеху! 🔑",
    "Не останавливайся, ты на правильном пути! ⭐",
    "Каждое изученное слово приближает к цели! 🎯",
    "Твоя дисциплина вдохновляет! 🌟",
    "Помни: каждый эксперт когда-то был новичком! 🚀"
  ];
  
  // Выбираем случайную мотивационную цитату
  const randomQuote = motivationalQuotes[Math.floor(Math.random() * motivationalQuotes.length)];

  return (
    <SafeAreaView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity 
          style={styles.backButton}
          onPress={() => navigation.goBack()}
        >
          <Ionicons name="arrow-back" size={24} color={colors.white} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Статистика</Text>
        <View style={styles.headerRight} />
      </View>

      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        {/* Title Section */}
        <View style={styles.titleSection}>
          <Text style={styles.subtitle}>твоя статистика:</Text>
          <Text style={styles.title}>Статистика</Text>
        </View>

        {/* Streak Cards */}
        <View style={styles.streakContainer}>
          {/* Current Streak */}
          <View style={styles.streakCard}>
            <View style={styles.streakIconContainer}>
              <Ionicons name="flame" size={32} color="#FF6B35" />
            </View>
            <Text style={styles.streakLabel}>Текущий стрик</Text>
            <Text style={styles.streakValue}>{currentStreak}</Text>
            <Text style={styles.streakUnit}>дней подряд</Text>
          </View>

          {/* Best Streak */}
          <View style={styles.streakCard}>
            <View style={styles.streakIconContainer}>
              <Ionicons name="trophy" size={32} color="#FFD700" />
            </View>
            <Text style={styles.streakLabel}>Лучший стрик</Text>
            <Text style={styles.streakValue}>{bestStreak}</Text>
            <Text style={styles.streakUnit}>дней подряд</Text>
          </View>
        </View>

        {/* Motivational Quote */}
        <View style={styles.quoteContainer}>
          <View style={styles.quoteIcon}>
            <Ionicons name="bulb" size={24} color={colors.primary} />
          </View>
          <Text style={styles.quoteText}>{randomQuote}</Text>
        </View>

        {/* Additional Stats */}
        <View style={styles.additionalStatsContainer}>
          <View style={styles.statRow}>
            <View style={styles.statItem}>
              <Ionicons name="calendar-outline" size={20} color={colors.primary} />
              <Text style={styles.statItemLabel}>Всего дней</Text>
              <Text style={styles.statItemValue}>23</Text>
            </View>
            <View style={styles.statItem}>
              <Ionicons name="book-outline" size={20} color={colors.primary} />
              <Text style={styles.statItemLabel}>Изучено слов</Text>
              <Text style={styles.statItemValue}>156</Text>
            </View>
          </View>
          
          <View style={styles.statRow}>
            <View style={styles.statItem}>
              <Ionicons name="time-outline" size={20} color={colors.primary} />
              <Text style={styles.statItemLabel}>Время изучения</Text>
              <Text style={styles.statItemValue}>4ч 32м</Text>
            </View>
            <View style={styles.statItem}>
              <Ionicons name="star-outline" size={20} color={colors.primary} />
              <Text style={styles.statItemLabel}>Точность</Text>
              <Text style={styles.statItemValue}>87%</Text>
            </View>
          </View>
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
    backgroundColor: colors.primary,
    paddingHorizontal: 20,
    paddingVertical: 15,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  backButton: {
    padding: 5,
  },
  headerTitle: {
    color: colors.white,
    fontSize: 18,
    fontWeight: 'bold',
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
    fontWeight: 'bold',
    color: colors.text,
  },
  streakContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    marginBottom: 20,
  },
  streakCard: {
    backgroundColor: colors.white,
    borderRadius: 15,
    padding: 20,
    alignItems: 'center',
    shadowColor: colors.black,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
    flex: 1,
    marginHorizontal: 5,
  },
  streakIconContainer: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: '#FFF5F0',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 15,
  },
  streakLabel: {
    fontSize: 14,
    color: colors.gray,
    marginBottom: 8,
    textAlign: 'center',
  },
  streakValue: {
    fontSize: 32,
    fontWeight: 'bold',
    color: colors.text,
    marginBottom: 4,
  },
  streakUnit: {
    fontSize: 12,
    color: colors.gray,
    textAlign: 'center',
  },
  quoteContainer: {
    backgroundColor: colors.white,
    marginHorizontal: 20,
    marginBottom: 20,
    padding: 20,
    borderRadius: 15,
    flexDirection: 'row',
    alignItems: 'center',
    shadowColor: colors.black,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
    borderLeftWidth: 4,
    borderLeftColor: colors.primary,
  },
  quoteIcon: {
    marginRight: 15,
  },
  quoteText: {
    fontSize: 16,
    color: colors.text,
    fontStyle: 'italic',
    flex: 1,
    lineHeight: 22,
  },
  additionalStatsContainer: {
    marginHorizontal: 20,
    marginBottom: 20,
  },
  statRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 15,
  },
  statItem: {
    backgroundColor: colors.white,
    borderRadius: 12,
    padding: 15,
    alignItems: 'center',
    shadowColor: colors.black,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
    flex: 1,
    marginHorizontal: 5,
  },
  statItemLabel: {
    fontSize: 12,
    color: colors.gray,
    marginTop: 8,
    marginBottom: 4,
    textAlign: 'center',
  },
  statItemValue: {
    fontSize: 18,
    fontWeight: 'bold',
    color: colors.text,
    textAlign: 'center',
  },
});
