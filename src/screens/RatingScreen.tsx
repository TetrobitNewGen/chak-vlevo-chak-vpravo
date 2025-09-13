import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Image,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { colors } from '../utils/colors';

interface LeaderboardEntry {
  id: string;
  rank: number;
  name: string;
  level: number;
  score: number;
  avatar: string;
  isCurrentUser?: boolean;
}

export default function RatingScreen() {
  const navigation = useNavigation();

  // Моковые данные для таблицы лидеров
  const leaderboardData: LeaderboardEntry[] = [
    {
      id: '1',
      rank: 1,
      name: 'Анна',
      level: 15,
      score: 15000,
      avatar: 'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=100&h=100&fit=crop&crop=face',
    },
    {
      id: '2',
      rank: 2,
      name: 'Михаил',
      level: 14,
      score: 14000,
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop&crop=face',
    },
    {
      id: '3',
      rank: 3,
      name: 'Елена',
      level: 13,
      score: 13000,
      avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&h=100&fit=crop&crop=face',
    },
    {
      id: '4',
      rank: 4,
      name: 'Дмитрий',
      level: 12,
      score: 12000,
      avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop&crop=face',
    },
    {
      id: '5',
      rank: 5,
      name: 'Мария',
      level: 11,
      score: 11000,
      avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=100&h=100&fit=crop&crop=face',
    },
    {
      id: '6',
      rank: 6,
      name: 'Алексей',
      level: 10,
      score: 10000,
      avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100&h=100&fit=crop&crop=face',
    },
    {
      id: '7',
      rank: 7,
      name: 'Ольга',
      level: 9,
      score: 9000,
      avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&h=100&fit=crop&crop=face',
    },
    {
      id: '8',
      rank: 93274,
      name: 'Вы',
      level: 10,
      score: 10000,
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop&crop=face',
      isCurrentUser: true,
    },
    {
      id: '9',
      rank: 93275,
      name: 'Иван',
      level: 8,
      score: 8000,
      avatar: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=100&h=100&fit=crop&crop=face',
    },
  ];

  const renderLeaderboardEntry = (entry: LeaderboardEntry, index: number) => {
    return (
      <View key={entry.id} style={styles.leaderboardRow}>
        <Text style={styles.rankText}>{entry.rank}.</Text>
        <Image source={{ uri: entry.avatar }} style={styles.avatar} />
        <View style={styles.playerInfo}>
          <Text style={[styles.playerName, entry.isCurrentUser && styles.currentUserText]}>
            {entry.name}
          </Text>
          <Text style={styles.playerLevel}>{entry.level} уровень</Text>
        </View>
        <Text style={styles.scoreText}>{entry.score.toLocaleString()}</Text>
      </View>
    );
  };

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
        <Text style={styles.headerTitle}>Рейтинг</Text>
        <View style={styles.headerRight} />
      </View>

      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        {/* Title Section */}
        <View style={styles.titleSection}>
          <Text style={styles.subtitle}>лучшие игроки:</Text>
          <Text style={styles.title}>Рейтинг</Text>
        </View>

        {/* Table Header */}
        <View style={styles.tableHeader}>
          <Text style={styles.headerColumnUser}>Пользователь</Text>
          <Text style={styles.headerColumnScore}>Счёт</Text>
        </View>

        {/* Leaderboard */}
        <View style={styles.leaderboardContainer}>
          {leaderboardData.slice(0, 7).map((entry, index) => renderLeaderboardEntry(entry, index))}
          
          {/* Ellipsis */}
          <View style={styles.ellipsisRow}>
            <Text style={styles.ellipsisText}>...</Text>
          </View>

          {/* User entries */}
          {leaderboardData.slice(7).map((entry, index) => renderLeaderboardEntry(entry, index + 7))}
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
  tableHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    paddingVertical: 15,
    marginHorizontal: 20,
    marginBottom: 10,
    backgroundColor: colors.white,
    borderRadius: 8,
    shadowColor: colors.black,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  headerColumnUser: {
    fontSize: 14,
    color: colors.gray,
    fontWeight: '600',
  },
  headerColumnScore: {
    fontSize: 14,
    color: colors.gray,
    fontWeight: '600',
  },
  leaderboardContainer: {
    marginHorizontal: 20,
    backgroundColor: colors.white,
    borderRadius: 8,
    marginBottom: 20,
    shadowColor: colors.black,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  leaderboardRow: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 12,
    paddingHorizontal: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#F0F0F0',
  },
  rankText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: colors.text,
    width: 40,
  },
  avatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
    marginHorizontal: 10,
    borderWidth: 2,
    borderColor: colors.primary,
  },
  playerInfo: {
    flex: 1,
  },
  playerName: {
    fontSize: 16,
    fontWeight: '600',
    color: colors.text,
    marginBottom: 2,
  },
  currentUserText: {
    color: colors.primary,
    fontWeight: 'bold',
  },
  playerLevel: {
    fontSize: 14,
    color: '#4CAF50',
    fontWeight: '500',
  },
  scoreText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: colors.text,
  },
  ellipsisRow: {
    alignItems: 'center',
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#F0F0F0',
  },
  ellipsisText: {
    fontSize: 18,
    color: colors.gray,
  },
});
