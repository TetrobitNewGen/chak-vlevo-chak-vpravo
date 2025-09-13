import React, { useState, useEffect } from 'react';
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
import { useNavigation, useRoute } from '@react-navigation/native';
import { colors } from '../utils/colors';

const { width } = Dimensions.get('window');

export default function ProfileScreen() {
  const navigation = useNavigation();
  const route = useRoute();
  const [userAvatar] = useState(require('../../assets/ava2.jpg'));
  const [currentLanguage, setCurrentLanguage] = useState('russian');

  // Получаем выбранный язык от LanguageScreen
  useEffect(() => {
    if (route.params && (route.params as any).selectedLanguage) {
      setCurrentLanguage((route.params as any).selectedLanguage);
    }
  }, [route.params]);

  const profileCards = [
    {
      id: '1',
      icon: 'person-outline',
      label: 'профиль:',
      value: 'Помешанный',
    },
    {
      id: '2',
      icon: 'bar-chart-outline',
      label: 'рейтинг:',
      value: '9274 место',
    },
    {
      id: '3',
      icon: 'trending-up-outline',
      label: 'статистика:',
      value: '10 дней',
    },
    {
      id: '4',
      icon: 'heart-outline',
      label: 'любимое:',
      value: '15 слов',
    },
    {
      id: '5',
      icon: 'settings-outline',
      label: currentLanguage === 'russian' ? 'Русский 🇷🇺' : 'Татарский 🏴',
      value: ' Сменить язык',
    },
    {
      id: '6',
      icon: 'cog-outline',
      label: '',
      value: 'Все настройки',
    },
  ];

  const handleLanguageChange = (newLanguage: string) => {
    setCurrentLanguage(newLanguage);
  };

  const handleCardPress = (cardId: string) => {
    if (cardId === '2') {
      // Переход к рейтингу
      navigation.navigate('Rating' as never);
    } else if (cardId === '3') {
      // Переход к статистике
      navigation.navigate('Statistics' as never);
    } else if (cardId === '4') {
      // Переход к любимым словам
      navigation.navigate('Favorites' as never);
    } else if (cardId === '5') {
      // Переход к настройкам языка
      navigation.navigate('Language' as never);
    } else if (cardId === '6') {
      // Переход к настройкам игры
      navigation.navigate('Settings' as never);
    } else {
      console.log(`Нажата карточка: ${cardId}`);
    }
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
        <Text style={styles.headerTitle}>Профиль</Text>
        <View style={styles.headerRight} />
      </View>

      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        {/* Profile Section */}
         <View style={styles.profileSection}>
           <Image
             source={userAvatar}
             style={styles.profileAvatar}
           />
          <Text style={styles.profileName}>Пользователь</Text>
          <Text style={styles.profileLevel}>10 уровень</Text>
        </View>

        {/* Cards Grid */}
        <View style={styles.cardsContainer}>
          {profileCards.map((card) => (
            <TouchableOpacity
              key={card.id}
              style={styles.card}
              onPress={() => handleCardPress(card.id)}
            >
              <View style={styles.cardIcon}>
                <Ionicons name={card.icon as any} size={24} color={colors.primary} />
              </View>
              <Text style={styles.cardLabel}>{card.label}</Text>
              <Text style={styles.cardValue}>{card.value}</Text>
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
  profileSection: {
    alignItems: 'center',
    paddingVertical: 40,
    backgroundColor: colors.white,
  },
  profileAvatar: {
    width: 120,
    height: 120,
    borderRadius: 60,
    marginBottom: 20,
    borderWidth: 4,
    borderColor: colors.primary,
  },
  profileName: {
    fontSize: 24,
    fontWeight: 'bold',
    color: colors.text,
    marginBottom: 8,
  },
  profileLevel: {
    fontSize: 16,
    color: colors.secondary,
    fontWeight: '600',
  },
  cardsContainer: {
    paddingHorizontal: 20,
    paddingBottom: 20,
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  card: {
    backgroundColor: colors.white,
    borderRadius: 12,
    padding: 20,
    marginBottom: 15,
    shadowColor: colors.black,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
    borderWidth: 1,
    borderColor: '#F0F0F0',
    width: (width - 60) / 2, // Ширина для 2 карточек в ряду
    alignItems: 'center',
  },
  cardIcon: {
    marginBottom: 12,
  },
  cardLabel: {
    fontSize: 14,
    color: colors.gray,
    marginBottom: 8,
    textAlign: 'center',
  },
  cardValue: {
    fontSize: 16,
    fontWeight: 'bold',
    color: colors.text,
    textAlign: 'center',
  },
});
