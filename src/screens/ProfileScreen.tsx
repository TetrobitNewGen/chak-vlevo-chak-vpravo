import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Image,
  Dimensions,
  Modal,
  TextInput,
  Alert,
} from 'react-native';
// import AsyncStorage from '@react-native-async-storage/async-storage';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation, useRoute } from '@react-navigation/native';
import { colors } from '../utils/colors';
import { LinearGradient } from 'expo-linear-gradient';
import { userStore } from '../utils/userStore';
import { launchImageLibrary, ImagePickerResponse, MediaType } from 'react-native-image-picker';

const { width } = Dimensions.get('window');

export default function ProfileScreen() {
  const navigation = useNavigation();
  const route = useRoute();
  const [userAvatar, setUserAvatar] = useState(require('../../assets/ava2.jpg'));
  const [currentLanguage, setCurrentLanguage] = useState('russian');
  const [showEditModal, setShowEditModal] = useState(false);
  const [showNameModal, setShowNameModal] = useState(false);
  const [showPhotoModal, setShowPhotoModal] = useState(false);
  const [userName, setUserName] = useState(userStore.getUserName());
  const [newName, setNewName] = useState('');
  const [selectedPhoto, setSelectedPhoto] = useState<string | null>(null);

  // Подписываемся на изменения в глобальном хранилище
  useEffect(() => {
    const unsubscribe = userStore.subscribe(() => {
      setUserName(userStore.getUserName());
    });
    return unsubscribe;
  }, []);

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
      value: userName,
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

  const handleNameChange = () => {
    if (newName.trim()) {
      const trimmedName = newName.trim();
      userStore.setUserName(trimmedName);
      setNewName('');
      setShowNameModal(false);
    }
  };

  const handleChangeNamePress = () => {
    setNewName(userName);
    setShowEditModal(false);
    setShowNameModal(true);
  };

  const handleChangePhotoPress = () => {
    setShowEditModal(false);
    setShowPhotoModal(true);
  };

  const openImagePicker = () => {
    const options = {
      mediaType: 'photo' as MediaType,
      includeBase64: false,
      maxHeight: 2000,
      maxWidth: 2000,
    };

    launchImageLibrary(options, (response: ImagePickerResponse) => {
      if (response.didCancel) {
        console.log('User cancelled image picker');
      } else if (response.errorMessage) {
        console.log('ImagePicker Error: ', response.errorMessage);
        Alert.alert('Ошибка', 'Не удалось выбрать изображение');
      } else if (response.assets && response.assets[0]) {
        const imageUri = response.assets[0].uri;
        if (imageUri) {
          setSelectedPhoto(imageUri);
        }
      }
    });
  };

  const confirmPhotoChange = () => {
    if (selectedPhoto) {
      setUserAvatar({ uri: selectedPhoto });
      userStore.setUserAvatar(selectedPhoto);
      setSelectedPhoto(null);
      setShowPhotoModal(false);
      Alert.alert('Успех', 'Фото профиля обновлено!');
    }
  };

  const cancelPhotoChange = () => {
    setSelectedPhoto(null);
    setShowPhotoModal(false);
  };


  const handleCardPress = (cardId: string) => {
    if (cardId === '1') {
      // Показать модальное окно редактирования профиля
      setShowEditModal(true);
    } else if (cardId === '2') {
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
          <Ionicons name="arrow-back" size={24} color={colors.text} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Профиль</Text>
        <View style={styles.headerRight} />
      </View>

      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        {/* Profile Section */}
         <View style={styles.profileSection}>
           {/* <LinearGradient colors={['#FFF176', '#FF9800', '#5D08B8']} locations={[0, 0.3, 1]} style={styles.avatarContainer}> */}
             <View style={styles.avatarPlaceholder}>
               <Image source={userAvatar} style={styles.profileAvatar} />
             </View>
           {/* </LinearGradient> */}
          <Text style={styles.profileName}>{userName}</Text>
          <Text style={styles.profileLevel}>Уровень 10</Text>
        </View>
        <Text style={styles.title}>Меню </Text>
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
              <View>

              <Text style={styles.cardLabel}>{card.label}</Text>
              <Text style={styles.cardValue}>{card.value}</Text>
              </View>
            </TouchableOpacity>
          ))}
        </View>

      </ScrollView>

      {/* Edit Profile Modal */}
      <Modal
        visible={showEditModal}
        transparent={true}
        animationType="fade"
        onRequestClose={() => setShowEditModal(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContainer}>
            <Text style={styles.modalTitle}>Редактировать профиль</Text>
            
            <TouchableOpacity 
              style={styles.modalButton}
              onPress={handleChangeNamePress}
            >
              <Ionicons name="person-outline" size={24} color={colors.primary} />
              <Text style={styles.modalButtonText}>Сменить имя</Text>
            </TouchableOpacity>

            <TouchableOpacity 
              style={styles.modalButton}
              onPress={handleChangePhotoPress}
            >
              <Ionicons name="camera-outline" size={24} color={colors.primary} />
              <Text style={styles.modalButtonText}>Сменить фото</Text>
            </TouchableOpacity>

            <TouchableOpacity 
              style={styles.cancelButton}
              onPress={() => setShowEditModal(false)}
            >
              <Text style={styles.cancelButtonText}>Отмена</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>

      {/* Change Name Modal */}
      <Modal
        visible={showNameModal}
        transparent={true}
        animationType="fade"
        onRequestClose={() => setShowNameModal(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContainer}>
            <Text style={styles.modalTitle}>Напишите новое имя</Text>
            
            <TextInput
              style={styles.nameInput}
              value={newName}
              onChangeText={setNewName}
              placeholder="Введите новое имя"
              placeholderTextColor={colors.gray}
              autoFocus={true}
            />

            <TouchableOpacity 
              style={styles.modalButton}
              onPress={handleNameChange}
            >
              <Ionicons name="checkmark-outline" size={24} color={colors.primary} />
              <Text style={styles.modalButtonText}>Поменять</Text>
            </TouchableOpacity>

            <TouchableOpacity 
              style={styles.cancelButton}
              onPress={() => setShowNameModal(false)}
            >
              <Text style={styles.cancelButtonText}>Отмена</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>


      {/* Change Photo Modal */}
      <Modal
        visible={showPhotoModal}
        transparent={true}
        animationType="fade"
        onRequestClose={() => setShowPhotoModal(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContainer}>
            <Text style={styles.modalTitle}>Сменить фото профиля</Text>
            
            {selectedPhoto ? (
              <View style={styles.photoPreviewContainer}>
                <Image source={{ uri: selectedPhoto }} style={styles.photoPreview} />
                <Text style={styles.photoPreviewText}>Выбранное фото</Text>
              </View>
            ) : (
              <View style={styles.photoPlaceholder}>
                <Ionicons name="camera-outline" size={48} color={colors.gray} />
                <Text style={styles.photoPlaceholderText}>Фото не выбрано</Text>
              </View>
            )}

            <TouchableOpacity 
              style={styles.modalButton}
              onPress={openImagePicker}
            >
              <Ionicons name="images-outline" size={24} color={colors.primary} />
              <Text style={styles.modalButtonText}>
                {selectedPhoto ? 'Выбрать другое фото' : 'Выбрать из галереи'}
              </Text>
            </TouchableOpacity>

            {selectedPhoto && (
              <TouchableOpacity 
                style={[styles.modalButton, styles.confirmButton]}
                onPress={confirmPhotoChange}
              >
                <Ionicons name="checkmark-outline" size={24} color={colors.white} />
                <Text style={[styles.modalButtonText, styles.confirmButtonText]}>Подтвердить</Text>
              </TouchableOpacity>
            )}

            <TouchableOpacity 
              style={styles.cancelButton}
              onPress={cancelPhotoChange}
            >
              <Text style={styles.cancelButtonText}>Отмена</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.white,
  },
  title:{
    paddingVertical: 10,
    fontWeight: 600,
    paddingHorizontal: 30,
    fontSize:32,
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
  profileSection: {
    alignItems: 'center',
    paddingVertical: 40,
    paddingBottom: 10,
    backgroundColor: colors.white,
  },
  avatarContainer: {
    borderRadius: 1000,
    marginBottom: 10,
  },
 
  profileAvatar: {
    width: 100,
    height: 100,
    borderRadius: 40,
  },
  profileName: {
    paddingTop: 10,
    fontSize: 14,
    fontWeight: 'bold',
    color: colors.text,
  },
  profileLevel: {
    fontSize: 10,
    color: '#32D392',
    fontWeight: '400',
  },
  profileHint: {
    color: '#8B8B8B',
    fontSize: 14,
    fontWeight: 'light',
  },
  cardsContainer: {
    paddingHorizontal: 20,
    paddingBottom: 20,
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  card: {
    display: 'flex',
    flexDirection: 'row',
    gap: 10,
    alignItems: 'center',
    alignContent: 'flex-start',
    backgroundColor: colors.white,
    borderRadius: 20,
    padding: 10,
    marginBottom: 5,
    borderBottomColor: '#EBEBEB',
    borderBottomWidth: 1,
    width: width - 60, // Ширина для 2 карточек в ряду
  },
  cardIcon: {
    // marginBottom: 12,
  },
  cardLabel: {
    fontSize: 10,
    color: colors.gray,
    // marginBottom: 8,
    fontWeight: '300',
  },
  cardValue: {
    fontSize: 16,
    fontWeight: '600',
    color: colors.text,
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContainer: {
    backgroundColor: colors.white,
    borderRadius: 20,
    padding: 30,
    marginHorizontal: 20,
    shadowColor: colors.black,
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.25,
    shadowRadius: 12,
    elevation: 8,
    minWidth: width * 0.8,
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: '600',
    color: colors.text,
    textAlign: 'center',
    marginBottom: 25,
  },
  modalButton: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 15,
    paddingHorizontal: 20,
    borderRadius: 15,
    backgroundColor: '#F8F9FA',
    marginBottom: 12,
  },
  modalButtonText: {
    fontSize: 16,
    fontWeight: '600',
    color: colors.text,
    marginLeft: 15,
  },
  cancelButton: {
    backgroundColor: 'transparent',
    marginTop: 10,
    alignItems: 'center',
    paddingVertical: 10,
  },
  cancelButtonText: {
    color: colors.gray,
    fontSize: 16,
    fontWeight: '600',
  },
  nameInput: {
    borderWidth: 1,
    borderColor: '#E0E0E0',
    borderRadius: 15,
    paddingHorizontal: 20,
    paddingVertical: 15,
    fontSize: 16,
    color: colors.text,
    backgroundColor: '#F8F9FA',
    marginBottom: 20,
  },
  photoPreviewContainer: {
    alignItems: 'center',
    marginBottom: 20,
  },
  photoPreview: {
    width: 120,
    height: 120,
    borderRadius: 60,
    marginBottom: 10,
  },
  photoPreviewText: {
    fontSize: 14,
    color: colors.gray,
    fontWeight: '500',
  },
  photoPlaceholder: {
    alignItems: 'center',
    marginBottom: 20,
    paddingVertical: 20,
  },
  photoPlaceholderText: {
    fontSize: 14,
    color: colors.gray,
    marginTop: 10,
  },
  confirmButton: {
    backgroundColor: colors.primary,
    marginTop: 10,
  },
  confirmButtonText: {
    color: colors.white,
  },
});
