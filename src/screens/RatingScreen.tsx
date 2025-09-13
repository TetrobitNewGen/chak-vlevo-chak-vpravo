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
  avatar: string | number;
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
      avatar: require('../../assets/ava2.jpg'),
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
    const isEven = index % 2 === 0;
    return (
      <View key={entry.id} style={[
        styles.leaderboardRow, 
        entry.isCurrentUser && styles.currentUserRow,
        !entry.isCurrentUser && isEven && styles.evenRow
      ]}>
        <Text style={styles.rankText}>{entry.rank}.</Text>
        <Image 
          source={typeof entry.avatar === 'string' ? { uri: entry.avatar } : entry.avatar} 
          style={styles.avatar} 
        />
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
        {/* Leaderboard */}
        <View style={styles.leaderboardContainer}>
          {/* Title Section */}
          <View style={styles.titleSection}>
            <Text style={styles.title}>Рейтинг</Text>
          </View>
          {/* Table Header */}
          <View style={styles.tableHeader}>
            <Text style={styles.headerColumnUser}>Пользователь</Text>
            <Text style={styles.headerColumnScore}>Счёт</Text>
          </View>
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
    padding: 24,
    backgroundColor: colors.white,
    borderTopLeftRadius: 16,
    borderTopRightRadius: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#E9ECEF',
  },
  subtitle: {
    fontSize: 14,
    color: colors.gray,
    marginBottom: 5,
  },
  title: {
    fontSize: 28,
    fontWeight: '800',
    color: colors.text,
    textAlign: 'center',
  },
  tableHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    paddingVertical: 18,
    backgroundColor: '#F8F9FA',
    borderBottomWidth: 1,
    borderBottomColor: '#E9ECEF',
  },
  headerColumnUser: {
    fontSize: 16,
    color: colors.primary,
    fontWeight: '700',
  },
  headerColumnScore: {
    fontSize: 16,
    color: colors.primary,
    fontWeight: '700',
  },
  leaderboardContainer: {
    marginHorizontal: 20,
    backgroundColor: colors.white,
    borderRadius: 16,
    marginBottom: 20,
    shadowColor: colors.black,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.15,
    shadowRadius: 8,
    elevation: 6,
    overflow: 'hidden',
  },
  leaderboardRow: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 16,
    paddingHorizontal: 20,
  },
  rankText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: colors.text,
    width: 40,
  },
  avatar: {
    width: 44,
    height: 44,
    borderRadius: 22,
    marginHorizontal: 12,
    borderWidth: 3,
    borderColor: colors.primary,
    shadowColor: colors.primary,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 3,
  },
  playerInfo: {
    flex: 1,
  },
  playerName: {
    fontSize: 17,
    fontWeight: '700',
    color: colors.text,
    marginBottom: 3,
  },
  currentUserText: {
    color: colors.primary,
    fontWeight: 'bold',
  },
  playerLevel: {
    fontSize: 15,
    color: colors.primary,
    fontWeight: '600',
  },
  scoreText: {
    fontSize: 18,
    fontWeight: '800',
    color: colors.text,
  },
  ellipsisRow: {
    alignItems: 'center',
    paddingVertical: 12,
  },
  ellipsisText: {
    fontSize: 18,
    color: colors.gray,
  },
  currentUserRow: {
    backgroundColor: '#E6F7FF', // Светло-голубой фон для текущего пользователя
    borderLeftWidth: 4,
    borderLeftColor: colors.primary,
  },
  evenRow: {
    backgroundColor: '#FAFAFA', // Светло-серый фон для четных строк
  },
});
