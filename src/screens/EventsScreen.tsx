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
import { Event } from '../types';

const { width } = Dimensions.get('window');

const mockEvents: Event[] = [
  {
    id: '1',
    title: 'Татар жыры - Концерт народной музыки',
    date: '18 ДЕКАБРЬ',
    time: '17:00',
    location: 'Казань, Дворец культуры',
    image: 'https://via.placeholder.com/300x150/1976D2/FFFFFF?text=Концерт',
    description: 'Традиционные татарские песни и музыкальные произведения',
  },
  {
    id: '2',
    title: 'Фестиваль татарской кухни',
    date: '22 ДЕКАБРЬ',
    time: '12:00',
    location: 'Казань, Площадь Свободы',
    image: 'https://via.placeholder.com/300x150/4CAF50/FFFFFF?text=Кухня',
    description: 'Дегустация традиционных татарских блюд',
  },
  {
    id: '3',
    title: 'Выставка татарского искусства',
    date: '25 ДЕКАБРЬ',
    time: '10:00',
    location: 'Казань, Национальный музей',
    image: 'https://via.placeholder.com/300x150/FF9800/FFFFFF?text=Искусство',
    description: 'Современное и традиционное татарское искусство',
  },
  {
    id: '4',
    title: 'Мастер-класс по татарскому языку',
    date: '28 ДЕКАБРЬ',
    time: '15:00',
    location: 'Казань, Центр культуры',
    image: 'https://via.placeholder.com/300x150/9C27B0/FFFFFF?text=Язык',
    description: 'Практические занятия по изучению татарского языка',
  },
];

export default function EventsScreen() {
  const [selectedFilter, setSelectedFilter] = useState('all');

  const filters = [
    { key: 'all', label: 'Все' },
    { key: 'today', label: 'Сегодня' },
    { key: 'week', label: 'На неделе' },
    { key: 'month', label: 'В этом месяце' },
  ];

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Мероприятия</Text>
        <TouchableOpacity style={styles.menuButton}>
          <Ionicons name="menu" size={24} color={colors.white} />
        </TouchableOpacity>
      </View>

      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        {/* Filter Tabs */}
        <ScrollView 
          horizontal 
          showsHorizontalScrollIndicator={false}
          style={styles.filterContainer}
        >
          {filters.map((filter) => (
            <TouchableOpacity
              key={filter.key}
              style={[
                styles.filterButton,
                selectedFilter === filter.key && styles.activeFilterButton
              ]}
              onPress={() => setSelectedFilter(filter.key)}
            >
              <Text
                style={[
                  styles.filterText,
                  selectedFilter === filter.key && styles.activeFilterText
                ]}
              >
                {filter.label}
              </Text>
            </TouchableOpacity>
          ))}
        </ScrollView>

        {/* Featured Event */}
        <View style={styles.featuredEventContainer}>
          <Text style={styles.sectionTitle}>Рекомендуемое мероприятие</Text>
          <TouchableOpacity style={styles.featuredEvent}>
            <Image source={{ uri: mockEvents[0].image }} style={styles.featuredEventImage} />
            <View style={styles.featuredEventOverlay}>
              <View style={styles.featuredEventInfo}>
                <Text style={styles.featuredEventDate}>{mockEvents[0].date}</Text>
                <Text style={styles.featuredEventTime}>{mockEvents[0].time}</Text>
                <Text style={styles.featuredEventTitle}>{mockEvents[0].title}</Text>
                <Text style={styles.featuredEventLocation}>
                  <Ionicons name="location" size={14} color={colors.white} /> {mockEvents[0].location}
                </Text>
              </View>
            </View>
          </TouchableOpacity>
        </View>

        {/* All Events */}
        <View style={styles.eventsContainer}>
          <Text style={styles.sectionTitle}>Все мероприятия</Text>
          {mockEvents.map((event) => (
            <TouchableOpacity key={event.id} style={styles.eventCard}>
              <Image source={{ uri: event.image }} style={styles.eventImage} />
              <View style={styles.eventInfo}>
                <View style={styles.eventDateContainer}>
                  <Text style={styles.eventDate}>{event.date}</Text>
                  <Text style={styles.eventTime}>{event.time}</Text>
                </View>
                <Text style={styles.eventTitle}>{event.title}</Text>
                <Text style={styles.eventLocation}>
                  <Ionicons name="location" size={14} color={colors.gray} /> {event.location}
                </Text>
                <Text style={styles.eventDescription} numberOfLines={2}>
                  {event.description}
                </Text>
                <View style={styles.eventActions}>
                  <TouchableOpacity style={styles.interestedButton}>
                    <Ionicons name="heart-outline" size={16} color={colors.primary} />
                    <Text style={styles.interestedText}>Интересно</Text>
                  </TouchableOpacity>
                  <TouchableOpacity style={styles.shareButton}>
                    <Ionicons name="share-outline" size={16} color={colors.gray} />
                  </TouchableOpacity>
                </View>
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
  filterContainer: {
    paddingHorizontal: 20,
    marginTop: 20,
    marginBottom: 10,
  },
  filterButton: {
    paddingHorizontal: 20,
    paddingVertical: 10,
    marginRight: 10,
    backgroundColor: colors.white,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: colors.border,
  },
  activeFilterButton: {
    backgroundColor: colors.primary,
    borderColor: colors.primary,
  },
  filterText: {
    fontSize: 14,
    color: colors.text,
  },
  activeFilterText: {
    color: colors.white,
    fontWeight: '600',
  },
  featuredEventContainer: {
    paddingHorizontal: 20,
    marginBottom: 20,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: colors.text,
    marginBottom: 15,
  },
  featuredEvent: {
    borderRadius: 15,
    overflow: 'hidden',
    position: 'relative',
  },
  featuredEventImage: {
    width: '100%',
    height: 200,
  },
  featuredEventOverlay: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: 'rgba(0,0,0,0.6)',
    padding: 20,
  },
  featuredEventInfo: {
    flex: 1,
  },
  featuredEventDate: {
    color: colors.white,
    fontSize: 14,
    fontWeight: '600',
  },
  featuredEventTime: {
    color: colors.white,
    fontSize: 14,
    marginBottom: 10,
  },
  featuredEventTitle: {
    color: colors.white,
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  featuredEventLocation: {
    color: colors.white,
    fontSize: 14,
    flexDirection: 'row',
    alignItems: 'center',
  },
  eventsContainer: {
    paddingHorizontal: 20,
  },
  eventCard: {
    backgroundColor: colors.white,
    borderRadius: 15,
    marginBottom: 15,
    overflow: 'hidden',
    shadowColor: colors.black,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  eventImage: {
    width: '100%',
    height: 150,
  },
  eventInfo: {
    padding: 15,
  },
  eventDateContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  eventDate: {
    fontSize: 14,
    fontWeight: '600',
    color: colors.primary,
    marginRight: 10,
  },
  eventTime: {
    fontSize: 14,
    color: colors.gray,
  },
  eventTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: colors.text,
    marginBottom: 8,
  },
  eventLocation: {
    fontSize: 14,
    color: colors.gray,
    marginBottom: 8,
    flexDirection: 'row',
    alignItems: 'center',
  },
  eventDescription: {
    fontSize: 14,
    color: colors.textSecondary,
    lineHeight: 20,
    marginBottom: 15,
  },
  eventActions: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  interestedButton: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 15,
    paddingVertical: 8,
    backgroundColor: colors.background,
    borderRadius: 20,
  },
  interestedText: {
    marginLeft: 5,
    fontSize: 14,
    color: colors.primary,
    fontWeight: '500',
  },
  shareButton: {
    padding: 8,
  },
});

