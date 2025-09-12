import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TextInput,
  TouchableOpacity,
  Image,
  Dimensions,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { colors } from '../utils/colors';
import { Course, Event } from '../types';

const { width } = Dimensions.get('window');

const mockCourses: Course[] = [
  {
    id: '1',
    title: 'Основы татарского языка',
    difficulty: 'Начальный',
    rating: 4.8,
    image: 'https://via.placeholder.com/150x100/4CAF50/FFFFFF?text=Курс+1',
  },
  {
    id: '2',
    title: 'Татарская грамматика',
    difficulty: 'Средний',
    rating: 4.8,
    image: 'https://via.placeholder.com/150x100/2196F3/FFFFFF?text=Курс+2',
  },
];

const mockEvent: Event = {
  id: '1',
  title: 'Татар жыры',
  date: '18 ДЕКАБРЬ',
  time: '17:00',
  location: 'Казань',
  image: 'https://via.placeholder.com/300x150/1976D2/FFFFFF?text=Мероприятие',
};

export default function HomeScreen() {
  const [searchQuery, setSearchQuery] = useState('');
  const [activeTab, setActiveTab] = useState('continue');

  return (
    <SafeAreaView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity style={styles.menuButton}>
          <Ionicons name="menu" size={24} color={colors.white} />
        </TouchableOpacity>
        <View style={styles.userInfo}>
          <Text style={styles.userName}>Йенифер</Text>
          <Text style={styles.userLevel}>10 уровень</Text>
          <Image
            source={{ uri: 'https://via.placeholder.com/40x40/4CAF50/FFFFFF?text=Й' }}
            style={styles.avatar}
          />
        </View>
      </View>

      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        {/* Search Bar */}
        <View style={styles.searchContainer}>
          <View style={styles.searchBar}>
            <Ionicons name="search" size={20} color={colors.gray} />
            <TextInput
              style={styles.searchInput}
              placeholder="Поиск курса"
              placeholderTextColor={colors.gray}
              value={searchQuery}
              onChangeText={setSearchQuery}
            />
          </View>
          <TouchableOpacity style={styles.filterButton}>
            <Ionicons name="options" size={20} color={colors.white} />
          </TouchableOpacity>
        </View>

        {/* Event Banner */}
        <TouchableOpacity style={styles.eventBanner}>
          <View style={styles.eventContent}>
            <View style={styles.eventLeft}>
              <Text style={styles.eventDate}>{mockEvent.date}</Text>
              <Text style={styles.eventTime}>{mockEvent.time}</Text>
              <Text style={styles.eventNumber}>22</Text>
              <Text style={styles.eventTitle}>{mockEvent.title}</Text>
              <View style={styles.eventIcon}>
                <Ionicons name="musical-notes" size={30} color={colors.secondary} />
              </View>
            </View>
            <View style={styles.eventRight}>
              <Image source={{ uri: mockEvent.image }} style={styles.eventImage} />
            </View>
          </View>
        </TouchableOpacity>

        {/* Learning Section */}
        <View style={styles.learningSection}>
          <View style={styles.tabsContainer}>
            <TouchableOpacity
              style={[styles.tab, activeTab === 'continue' && styles.activeTab]}
              onPress={() => setActiveTab('continue')}
            >
              <Text style={[styles.tabText, activeTab === 'continue' && styles.activeTabText]}>
                Продолжить обучение
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[styles.tab, activeTab === 'new' && styles.activeTab]}
              onPress={() => setActiveTab('new')}
            >
              <Text style={[styles.tabText, activeTab === 'new' && styles.activeTabText]}>
                Начать новый
              </Text>
            </TouchableOpacity>
          </View>

          <View style={styles.coursesContainer}>
            {mockCourses.map((course) => (
              <TouchableOpacity key={course.id} style={styles.courseCard}>
                <Image source={{ uri: course.image }} style={styles.courseImage} />
                <View style={styles.ratingContainer}>
                  <Ionicons name="star" size={16} color={colors.secondary} />
                  <Text style={styles.rating}>{course.rating}</Text>
                </View>
                <View style={styles.courseInfo}>
                  <Text style={styles.courseTitle}>{course.title}</Text>
                  <Text style={styles.courseDifficulty}>{course.difficulty}</Text>
                  <TouchableOpacity style={styles.startButton}>
                    <Text style={styles.startButtonText}>Башларга</Text>
                  </TouchableOpacity>
                </View>
              </TouchableOpacity>
            ))}
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
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
  content: {
    flex: 1,
  },
  searchContainer: {
    flexDirection: 'row',
    padding: 20,
    alignItems: 'center',
  },
  searchBar: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.white,
    borderRadius: 25,
    paddingHorizontal: 15,
    paddingVertical: 12,
    marginRight: 10,
  },
  searchInput: {
    flex: 1,
    marginLeft: 10,
    fontSize: 16,
    color: colors.text,
  },
  filterButton: {
    backgroundColor: colors.secondary,
    width: 50,
    height: 50,
    borderRadius: 25,
    justifyContent: 'center',
    alignItems: 'center',
  },
  eventBanner: {
    marginHorizontal: 20,
    marginBottom: 20,
    backgroundColor: colors.primary,
    borderRadius: 15,
    overflow: 'hidden',
  },
  eventContent: {
    flexDirection: 'row',
    padding: 20,
  },
  eventLeft: {
    flex: 1,
    justifyContent: 'center',
  },
  eventDate: {
    color: colors.white,
    fontSize: 14,
    fontWeight: '600',
  },
  eventTime: {
    color: colors.white,
    fontSize: 14,
    marginBottom: 10,
  },
  eventNumber: {
    color: colors.white,
    fontSize: 32,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  eventTitle: {
    color: colors.white,
    fontSize: 16,
    fontWeight: '600',
  },
  eventIcon: {
    marginTop: 10,
  },
  eventRight: {
    flex: 1,
    alignItems: 'center',
  },
  eventImage: {
    width: 120,
    height: 80,
    borderRadius: 10,
  },
  learningSection: {
    paddingHorizontal: 20,
  },
  tabsContainer: {
    flexDirection: 'row',
    marginBottom: 20,
  },
  tab: {
    paddingHorizontal: 20,
    paddingVertical: 10,
    marginRight: 10,
  },
  activeTab: {
    borderBottomWidth: 2,
    borderBottomColor: colors.primary,
  },
  tabText: {
    fontSize: 16,
    color: colors.gray,
  },
  activeTabText: {
    color: colors.primary,
    fontWeight: '600',
  },
  coursesContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  courseCard: {
    width: (width - 60) / 2,
    backgroundColor: colors.white,
    borderRadius: 15,
    padding: 15,
    marginBottom: 20,
    shadowColor: colors.black,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  courseImage: {
    width: '100%',
    height: 100,
    borderRadius: 10,
    marginBottom: 10,
  },
  ratingContainer: {
    position: 'absolute',
    top: 20,
    right: 20,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.white,
    paddingHorizontal: 6,
    paddingVertical: 3,
    borderRadius: 10,
  },
  rating: {
    marginLeft: 3,
    fontSize: 12,
    fontWeight: '600',
    color: colors.text,
  },
  courseInfo: {
    flex: 1,
  },
  courseTitle: {
    fontSize: 14,
    fontWeight: '600',
    color: colors.text,
    marginBottom: 5,
  },
  courseDifficulty: {
    fontSize: 12,
    color: colors.gray,
    marginBottom: 10,
  },
  startButton: {
    backgroundColor: colors.primary,
    paddingHorizontal: 15,
    paddingVertical: 8,
    borderRadius: 20,
    alignSelf: 'flex-start',
  },
  startButtonText: {
    color: colors.white,
    fontSize: 12,
    fontWeight: '600',
  },
});

