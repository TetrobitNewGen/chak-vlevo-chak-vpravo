import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Image,
  Dimensions,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { colors } from '../utils/colors';

const { width } = Dimensions.get('window');

export default function CourseDetailScreen() {
  const [isEnrolled, setIsEnrolled] = useState(false);

  const courseData = {
    id: '1',
    title: 'Основы татарского языка',
    difficulty: 'Начальный',
    rating: 4.8,
    duration: '2 недели',
    lessons: 12,
    students: 1250,
    image: 'https://via.placeholder.com/300x200/4CAF50/FFFFFF?text=Курс+1',
    description: 'Изучите основы татарского языка с нуля. Этот курс поможет вам освоить базовую грамматику, произношение и основные слова и фразы.',
    instructor: 'Гульнара Хасанова',
    instructorAvatar: 'https://via.placeholder.com/50x50/4CAF50/FFFFFF?text=Г',
  };

  const lessons = [
    { id: '1', title: 'Введение в татарский язык', duration: '15 мин', completed: true },
    { id: '2', title: 'Алфавит и произношение', duration: '20 мин', completed: true },
    { id: '3', title: 'Основные приветствия', duration: '18 мин', completed: false },
    { id: '4', title: 'Числа от 1 до 10', duration: '12 мин', completed: false },
    { id: '5', title: 'Семья и родственники', duration: '25 мин', completed: false },
  ];

  const handleEnroll = () => {
    setIsEnrolled(true);
  };

  return (
    <SafeAreaView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity style={styles.backButton}>
          <Ionicons name="arrow-back" size={24} color={colors.white} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Курс</Text>
        <TouchableOpacity style={styles.shareButton}>
          <Ionicons name="share-outline" size={24} color={colors.white} />
        </TouchableOpacity>
      </View>

      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        {/* Course Image */}
        <Image source={{ uri: courseData.image }} style={styles.courseImage} />

        {/* Course Info */}
        <View style={styles.courseInfo}>
          <View style={styles.courseHeader}>
            <View style={styles.ratingContainer}>
              <Ionicons name="star" size={16} color={colors.secondary} />
              <Text style={styles.rating}>{courseData.rating}</Text>
            </View>
            <Text style={styles.difficulty}>{courseData.difficulty}</Text>
          </View>

          <Text style={styles.courseTitle}>{courseData.title}</Text>
          
          <View style={styles.courseStats}>
            <View style={styles.statItem}>
              <Ionicons name="time-outline" size={16} color={colors.gray} />
              <Text style={styles.statText}>{courseData.duration}</Text>
            </View>
            <View style={styles.statItem}>
              <Ionicons name="book-outline" size={16} color={colors.gray} />
              <Text style={styles.statText}>{courseData.lessons} уроков</Text>
            </View>
            <View style={styles.statItem}>
              <Ionicons name="people-outline" size={16} color={colors.gray} />
              <Text style={styles.statText}>{courseData.students} студентов</Text>
            </View>
          </View>

          <Text style={styles.description}>{courseData.description}</Text>

          {/* Instructor */}
          <View style={styles.instructorContainer}>
            <Text style={styles.instructorTitle}>Преподаватель</Text>
            <View style={styles.instructorInfo}>
              <Image source={{ uri: courseData.instructorAvatar }} style={styles.instructorAvatar} />
              <Text style={styles.instructorName}>{courseData.instructor}</Text>
            </View>
          </View>

          {/* Lessons */}
          <View style={styles.lessonsContainer}>
            <Text style={styles.lessonsTitle}>Уроки курса</Text>
            {lessons.map((lesson, index) => (
              <TouchableOpacity key={lesson.id} style={styles.lessonItem}>
                <View style={styles.lessonNumber}>
                  {lesson.completed ? (
                    <Ionicons name="checkmark" size={16} color={colors.white} />
                  ) : (
                    <Text style={styles.lessonNumberText}>{index + 1}</Text>
                  )}
                </View>
                <View style={styles.lessonInfo}>
                  <Text style={styles.lessonTitle}>{lesson.title}</Text>
                  <Text style={styles.lessonDuration}>{lesson.duration}</Text>
                </View>
                {lesson.completed && (
                  <Ionicons name="checkmark-circle" size={20} color={colors.success} />
                )}
              </TouchableOpacity>
            ))}
          </View>

          {/* Enroll Button */}
          <TouchableOpacity 
            style={[styles.enrollButton, isEnrolled && styles.enrolledButton]} 
            onPress={handleEnroll}
          >
            <Text style={[styles.enrollButtonText, isEnrolled && styles.enrolledButtonText]}>
              {isEnrolled ? 'Курс добавлен' : 'Начать обучение'}
            </Text>
          </TouchableOpacity>
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
  backButton: {
    padding: 5,
  },
  headerTitle: {
    color: colors.white,
    fontSize: 18,
    fontWeight: 'bold',
  },
  shareButton: {
    padding: 5,
  },
  content: {
    flex: 1,
  },
  courseImage: {
    width: '100%',
    height: 200,
  },
  courseInfo: {
    padding: 20,
  },
  courseHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10,
  },
  ratingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.background,
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
  },
  rating: {
    marginLeft: 4,
    fontSize: 14,
    fontWeight: '600',
    color: colors.text,
  },
  difficulty: {
    fontSize: 14,
    color: colors.gray,
    backgroundColor: colors.lightGray,
    paddingHorizontal: 12,
    paddingVertical: 4,
    borderRadius: 12,
  },
  courseTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: colors.text,
    marginBottom: 15,
  },
  courseStats: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginBottom: 20,
    backgroundColor: colors.white,
    paddingVertical: 15,
    borderRadius: 10,
  },
  statItem: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  statText: {
    marginLeft: 5,
    fontSize: 14,
    color: colors.gray,
  },
  description: {
    fontSize: 16,
    color: colors.textSecondary,
    lineHeight: 24,
    marginBottom: 25,
  },
  instructorContainer: {
    marginBottom: 25,
  },
  instructorTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: colors.text,
    marginBottom: 10,
  },
  instructorInfo: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  instructorAvatar: {
    width: 50,
    height: 50,
    borderRadius: 25,
    marginRight: 15,
  },
  instructorName: {
    fontSize: 16,
    fontWeight: '600',
    color: colors.text,
  },
  lessonsContainer: {
    marginBottom: 25,
  },
  lessonsTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: colors.text,
    marginBottom: 15,
  },
  lessonItem: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.white,
    padding: 15,
    borderRadius: 10,
    marginBottom: 10,
  },
  lessonNumber: {
    width: 30,
    height: 30,
    borderRadius: 15,
    backgroundColor: colors.primary,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 15,
  },
  lessonNumberText: {
    color: colors.white,
    fontSize: 14,
    fontWeight: 'bold',
  },
  lessonInfo: {
    flex: 1,
  },
  lessonTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: colors.text,
    marginBottom: 2,
  },
  lessonDuration: {
    fontSize: 14,
    color: colors.gray,
  },
  enrollButton: {
    backgroundColor: colors.primary,
    paddingVertical: 15,
    borderRadius: 25,
    alignItems: 'center',
  },
  enrolledButton: {
    backgroundColor: colors.success,
  },
  enrollButtonText: {
    color: colors.white,
    fontSize: 18,
    fontWeight: 'bold',
  },
  enrolledButtonText: {
    color: colors.white,
  },
});

