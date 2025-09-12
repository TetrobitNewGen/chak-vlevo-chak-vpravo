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

export default function EventDetailScreen() {
  const [isInterested, setIsInterested] = useState(false);

  const eventData = {
    id: '1',
    title: 'Татар жыры - Концерт народной музыки',
    date: '18 ДЕКАБРЬ',
    time: '17:00',
    location: 'Казань, Дворец культуры',
    address: 'ул. Пушкина, 86, Казань',
    image: 'https://via.placeholder.com/300x200/1976D2/FFFFFF?text=Концерт',
    description: 'Традиционные татарские песни и музыкальные произведения в исполнении лучших артистов республики. Концерт посвящен сохранению и развитию татарской музыкальной культуры.',
    organizer: 'Министерство культуры РТ',
    price: 'Бесплатно',
    ageRestriction: '0+',
    capacity: 500,
    interested: 234,
  };

  const handleInterest = () => {
    setIsInterested(!isInterested);
  };

  return (
    <SafeAreaView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity style={styles.backButton}>
          <Ionicons name="arrow-back" size={24} color={colors.white} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Мероприятие</Text>
        <TouchableOpacity style={styles.shareButton}>
          <Ionicons name="share-outline" size={24} color={colors.white} />
        </TouchableOpacity>
      </View>

      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        {/* Event Image */}
        <Image source={{ uri: eventData.image }} style={styles.eventImage} />

        {/* Event Info */}
        <View style={styles.eventInfo}>
          <View style={styles.eventHeader}>
            <Text style={styles.eventDate}>{eventData.date}</Text>
            <Text style={styles.eventTime}>{eventData.time}</Text>
          </View>

          <Text style={styles.eventTitle}>{eventData.title}</Text>

          {/* Event Details */}
          <View style={styles.detailsContainer}>
            <View style={styles.detailItem}>
              <Ionicons name="location" size={20} color={colors.primary} />
              <View style={styles.detailText}>
                <Text style={styles.detailLabel}>Место проведения</Text>
                <Text style={styles.detailValue}>{eventData.location}</Text>
                <Text style={styles.detailAddress}>{eventData.address}</Text>
              </View>
            </View>

            <View style={styles.detailItem}>
              <Ionicons name="person" size={20} color={colors.primary} />
              <View style={styles.detailText}>
                <Text style={styles.detailLabel}>Организатор</Text>
                <Text style={styles.detailValue}>{eventData.organizer}</Text>
              </View>
            </View>

            <View style={styles.detailItem}>
              <Ionicons name="card" size={20} color={colors.primary} />
              <View style={styles.detailText}>
                <Text style={styles.detailLabel}>Стоимость</Text>
                <Text style={styles.detailValue}>{eventData.price}</Text>
              </View>
            </View>

            <View style={styles.detailItem}>
              <Ionicons name="people" size={20} color={colors.primary} />
              <View style={styles.detailText}>
                <Text style={styles.detailLabel}>Возрастное ограничение</Text>
                <Text style={styles.detailValue}>{eventData.ageRestriction}</Text>
              </View>
            </View>
          </View>

          {/* Description */}
          <View style={styles.descriptionContainer}>
            <Text style={styles.descriptionTitle}>О мероприятии</Text>
            <Text style={styles.description}>{eventData.description}</Text>
          </View>

          {/* Stats */}
          <View style={styles.statsContainer}>
            <View style={styles.statItem}>
              <Ionicons name="people" size={20} color={colors.gray} />
              <Text style={styles.statText}>{eventData.capacity} мест</Text>
            </View>
            <View style={styles.statItem}>
              <Ionicons name="heart" size={20} color={colors.gray} />
              <Text style={styles.statText}>{eventData.interested} заинтересованы</Text>
            </View>
          </View>

          {/* Action Buttons */}
          <View style={styles.actionsContainer}>
            <TouchableOpacity 
              style={[styles.actionButton, styles.interestButton, isInterested && styles.interestedButton]} 
              onPress={handleInterest}
            >
              <Ionicons 
                name={isInterested ? "heart" : "heart-outline"} 
                size={20} 
                color={isInterested ? colors.white : colors.primary} 
              />
              <Text style={[styles.actionButtonText, isInterested && styles.interestedButtonText]}>
                {isInterested ? 'Интересно' : 'Заинтересован'}
              </Text>
            </TouchableOpacity>

            <TouchableOpacity style={[styles.actionButton, styles.registerButton]}>
              <Ionicons name="calendar" size={20} color={colors.white} />
              <Text style={[styles.actionButtonText, styles.registerButtonText]}>
                Зарегистрироваться
              </Text>
            </TouchableOpacity>
          </View>

          {/* Map Button */}
          <TouchableOpacity style={styles.mapButton}>
            <Ionicons name="map" size={20} color={colors.primary} />
            <Text style={styles.mapButtonText}>Показать на карте</Text>
            <Ionicons name="chevron-forward" size={20} color={colors.gray} />
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
  eventImage: {
    width: '100%',
    height: 200,
  },
  eventInfo: {
    padding: 20,
  },
  eventHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 15,
  },
  eventDate: {
    fontSize: 18,
    fontWeight: 'bold',
    color: colors.primary,
    marginRight: 15,
  },
  eventTime: {
    fontSize: 16,
    color: colors.gray,
  },
  eventTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: colors.text,
    marginBottom: 20,
    lineHeight: 30,
  },
  detailsContainer: {
    backgroundColor: colors.white,
    borderRadius: 15,
    padding: 20,
    marginBottom: 20,
  },
  detailItem: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginBottom: 15,
  },
  detailText: {
    flex: 1,
    marginLeft: 15,
  },
  detailLabel: {
    fontSize: 14,
    color: colors.gray,
    marginBottom: 2,
  },
  detailValue: {
    fontSize: 16,
    fontWeight: '600',
    color: colors.text,
  },
  detailAddress: {
    fontSize: 14,
    color: colors.textSecondary,
    marginTop: 2,
  },
  descriptionContainer: {
    marginBottom: 20,
  },
  descriptionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: colors.text,
    marginBottom: 10,
  },
  description: {
    fontSize: 16,
    color: colors.textSecondary,
    lineHeight: 24,
  },
  statsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    backgroundColor: colors.white,
    borderRadius: 15,
    padding: 20,
    marginBottom: 20,
  },
  statItem: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  statText: {
    marginLeft: 8,
    fontSize: 14,
    color: colors.gray,
  },
  actionsContainer: {
    flexDirection: 'row',
    marginBottom: 20,
  },
  actionButton: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 15,
    borderRadius: 25,
    marginHorizontal: 5,
  },
  interestButton: {
    backgroundColor: colors.background,
    borderWidth: 2,
    borderColor: colors.primary,
  },
  interestedButton: {
    backgroundColor: colors.primary,
    borderColor: colors.primary,
  },
  registerButton: {
    backgroundColor: colors.primary,
  },
  actionButtonText: {
    marginLeft: 8,
    fontSize: 16,
    fontWeight: '600',
    color: colors.primary,
  },
  interestedButtonText: {
    color: colors.white,
  },
  registerButtonText: {
    color: colors.white,
  },
  mapButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.white,
    padding: 15,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: colors.border,
  },
  mapButtonText: {
    flex: 1,
    marginLeft: 10,
    fontSize: 16,
    color: colors.text,
  },
});

