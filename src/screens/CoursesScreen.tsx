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
import { Course } from '../types';

const { width } = Dimensions.get('window');

const mockCourses: Course[] = [
  {
    id: '1',
    title: 'Основы татарского языка',
    difficulty: 'Начальный',
    rating: 4.8,
    image: 'https://via.placeholder.com/150x100/4CAF50/FFFFFF?text=Курс+1',
    description: 'Изучите основы татарского языка с нуля',
  },
  {
    id: '2',
    title: 'Татарская грамматика',
    difficulty: 'Средний',
    rating: 4.8,
    image: 'https://via.placeholder.com/150x100/2196F3/FFFFFF?text=Курс+2',
    description: 'Углубленное изучение грамматики',
  },
  {
    id: '3',
    title: 'Татарская литература',
    difficulty: 'Продвинутый',
    rating: 4.9,
    image: 'https://via.placeholder.com/150x100/FF9800/FFFFFF?text=Курс+3',
    description: 'Знакомство с татарской литературой',
  },
  {
    id: '4',
    title: 'Разговорный татарский',
    difficulty: 'Средний',
    rating: 4.7,
    image: 'https://via.placeholder.com/150x100/9C27B0/FFFFFF?text=Курс+4',
    description: 'Практика разговорной речи',
  },
];

export default function CoursesScreen() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedDifficulty, setSelectedDifficulty] = useState('all');

  const difficulties = [
    { key: 'all', label: 'Все' },
    { key: 'beginner', label: 'Начальный' },
    { key: 'intermediate', label: 'Средний' },
    { key: 'advanced', label: 'Продвинутый' },
  ];

  const filteredCourses = mockCourses.filter((course) => {
    const matchesSearch = course.title.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesDifficulty = selectedDifficulty === 'all' || 
      course.difficulty.toLowerCase() === selectedDifficulty;
    return matchesSearch && matchesDifficulty;
  });

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Курсы</Text>
        <TouchableOpacity style={styles.menuButton}>
          <Ionicons name="menu" size={24} color={colors.white} />
        </TouchableOpacity>
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

        {/* Difficulty Filter */}
        <ScrollView 
          horizontal 
          showsHorizontalScrollIndicator={false}
          style={styles.difficultyContainer}
        >
          {difficulties.map((difficulty) => (
            <TouchableOpacity
              key={difficulty.key}
              style={[
                styles.difficultyButton,
                selectedDifficulty === difficulty.key && styles.activeDifficultyButton
              ]}
              onPress={() => setSelectedDifficulty(difficulty.key)}
            >
              <Text
                style={[
                  styles.difficultyText,
                  selectedDifficulty === difficulty.key && styles.activeDifficultyText
                ]}
              >
                {difficulty.label}
              </Text>
            </TouchableOpacity>
          ))}
        </ScrollView>

        {/* Courses Grid */}
        <View style={styles.coursesGrid}>
          {filteredCourses.map((course) => (
            <TouchableOpacity key={course.id} style={styles.courseCard}>
              <Image source={{ uri: course.image }} style={styles.courseImage} />
              <View style={styles.ratingContainer}>
                <Ionicons name="star" size={16} color={colors.secondary} />
                <Text style={styles.rating}>{course.rating}</Text>
              </View>
              <View style={styles.courseInfo}>
                <Text style={styles.courseTitle}>{course.title}</Text>
                <Text style={styles.courseDifficulty}>{course.difficulty}</Text>
                <Text style={styles.courseDescription} numberOfLines={2}>
                  {course.description}
                </Text>
                <TouchableOpacity style={styles.startButton}>
                  <Text style={styles.startButtonText}>Начать курс</Text>
                </TouchableOpacity>
              </View>
            </TouchableOpacity>
          ))}
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
  headerTitle: {
    color: colors.white,
    fontSize: 20,
    fontWeight: 'bold',
  },
  menuButton: {
    padding: 5,
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
  difficultyContainer: {
    paddingHorizontal: 20,
    marginBottom: 20,
  },
  difficultyButton: {
    paddingHorizontal: 20,
    paddingVertical: 10,
    marginRight: 10,
    backgroundColor: colors.white,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: colors.border,
  },
  activeDifficultyButton: {
    backgroundColor: colors.primary,
    borderColor: colors.primary,
  },
  difficultyText: {
    fontSize: 14,
    color: colors.text,
  },
  activeDifficultyText: {
    color: colors.white,
    fontWeight: '600',
  },
  coursesGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    paddingHorizontal: 20,
    justifyContent: 'space-between',
  },
  courseCard: {
    width: (width - 50) / 2,
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
    marginBottom: 8,
  },
  courseDescription: {
    fontSize: 12,
    color: colors.textSecondary,
    marginBottom: 10,
    lineHeight: 16,
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

