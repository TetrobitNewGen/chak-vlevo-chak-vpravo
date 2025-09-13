import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Image,
  Switch,
  Alert,
  Modal,
  TextInput,
  Dimensions,
} from 'react-native';
import { launchImageLibrary, ImagePickerResponse, MediaType } from 'react-native-image-picker';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { colors } from '../utils/colors';
import { userStore } from '../utils/userStore';
import { LinearGradient } from 'expo-linear-gradient';

const { width } = Dimensions.get('window');

export default function SettingsScreen() {
  const navigation = useNavigation();
  const [soundEnabled, setSoundEnabled] = useState(true);
  const [vibrationEnabled, setVibrationEnabled] = useState(true);
  const [difficulty, setDifficulty] = useState('medium');
  const [userAvatar, setUserAvatar] = useState(require('../../assets/ava2.jpg'));
  const [userName, setUserName] = useState(userStore.getUserName());
  const [showEditModal, setShowEditModal] = useState(false);
  const [showNameModal, setShowNameModal] = useState(false);
  const [showPhotoModal, setShowPhotoModal] = useState(false);
  const [newName, setNewName] = useState('');
  const [selectedPhoto, setSelectedPhoto] = useState<string | null>(null);

  // Подписываемся на изменения в глобальном хранилище
  useEffect(() => {
    const unsubscribe = userStore.subscribe(() => {
      setUserName(userStore.getUserName());
    });
    return unsubscribe;
  }, []);

  const handleEditProfile = () => {
    setShowEditModal(true);
  };

  const handleChangeName = () => {
    setNewName(userName);
    setShowEditModal(false);
    setShowNameModal(true);
  };

  const handleNameChange = () => {
    if (newName.trim()) {
      const trimmedName = newName.trim();
      userStore.setUserName(trimmedName);
      setNewName('');
      setShowNameModal(false);
    }
  };

  const handleChangeAvatar = () => {
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

  const handleChangeDifficulty = () => {
    Alert.alert('Сложность', 'Выберите уровень сложности', [
      { text: 'Легкий', onPress: () => setDifficulty('easy') },
      { text: 'Средний', onPress: () => setDifficulty('medium') },
      { text: 'Сложный', onPress: () => setDifficulty('hard') },
      { text: 'Отмена', style: 'cancel' },
    ]);
  };

  const handleResetProgress = () => {
    Alert.alert(
      'Сброс прогресса',
      'Вы уверены, что хотите сбросить весь прогресс? Это действие нельзя отменить.',
      [
        { text: 'Отмена', style: 'cancel' },
        { text: 'Сбросить', style: 'destructive', onPress: () => console.log('Прогресс сброшен') },
      ]
    );
  };

  const settingsCards = [
    {
      id: '1',
      icon: 'create-outline',
      label: 'Редактировать профиль',
      value: 'Имя и фото',
      onPress: handleEditProfile,
    },
    {
      id: '2',
      icon: 'trending-up-outline',
      label: 'Сложность',
      value: difficulty === 'easy' ? 'Легкий' : difficulty === 'medium' ? 'Средний' : 'Сложный',
      onPress: handleChangeDifficulty,
    },
    {
      id: '3',
      icon: 'volume-high-outline',
      label: 'Звук',
      value: soundEnabled ? 'Включен' : 'Выключен',
      onPress: () => setSoundEnabled(!soundEnabled),
    },
    {
      id: '4',
      icon: 'phone-portrait-outline',
      label: 'Вибрация',
      value: vibrationEnabled ? 'Включена' : 'Выключена',
      onPress: () => setVibrationEnabled(!vibrationEnabled),
    },
    {
      id: '5',
      icon: 'refresh-outline',
      label: 'Сбросить прогресс',
      value: 'Осторожно!',
      onPress: handleResetProgress,
      isDanger: true,
    },
    {
      id: '6',
      icon: 'help-circle-outline',
      label: 'Правила игры',
      value: 'Как играть',
      onPress: () => console.log('Правила игры'),
    },
    {
      id: '7',
      icon: 'information-circle-outline',
      label: 'О приложении',
      value: 'Версия 1.0.0',
      onPress: () => console.log('О приложении'),
    },
    {
      id: '8',
      icon: 'star-outline',
      label: 'Оценить приложение',
      value: 'В App Store',
      onPress: () => console.log('Оценить приложение'),
    },
  ];

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
        <Text style={styles.headerTitle}>Настройки</Text>
        <View style={styles.headerRight} />
      </View>

      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        {/* Profile Section */}
        <View style={styles.profileSection}>
          <LinearGradient colors={['#FFF176', '#FF9800', '#5D08B8']} locations={[0, 0.3, 1]} style={styles.avatarContainer}>
            <View style={styles.avatarPlaceholder}>
              <TouchableOpacity onPress={handleEditProfile}>
                <Image source={userAvatar} style={styles.profileAvatar} />
                <View style={styles.editAvatarButton}>
                  <Ionicons name="camera" size={16} color={colors.white} />
                </View>
              </TouchableOpacity>
            </View>
          </LinearGradient>
          <Text style={styles.profileName}>{userName}</Text>
          <Text style={styles.profileLevel}>Уровень 10</Text>
          <Text style={styles.profileHint}>10 xp до нового уровня!</Text>
        </View>

        {/* Settings Cards Grid */}
        <View style={styles.cardsContainer}>
          {settingsCards.map((card) => (
            <TouchableOpacity
              key={card.id}
              style={[styles.card, card.isDanger && styles.dangerCard]}
              onPress={card.onPress}
            >
              <View style={styles.cardIcon}>
                <Ionicons 
                  name={card.icon as any} 
                  size={24} 
                  color={card.isDanger ? colors.error : colors.primary} 
                />
              </View>
              <Text style={[styles.cardLabel, card.isDanger && styles.dangerText]}>
                {card.label}
              </Text>
              <Text style={[styles.cardValue, card.isDanger && styles.dangerText]}>
                {card.value}
              </Text>
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
              onPress={handleChangeName}
            >
              <Ionicons name="person-outline" size={24} color={colors.primary} />
              <Text style={styles.modalButtonText}>Сменить имя</Text>
            </TouchableOpacity>

            <TouchableOpacity 
              style={styles.modalButton}
              onPress={handleChangeAvatar}
            >
              <Ionicons name="camera-outline" size={24} color={colors.primary} />
              <Text style={styles.modalButtonText}>Сменить аватар</Text>
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
    backgroundColor: colors.white,
  },
  avatarContainer: {
    borderRadius: 50,
    padding: 8,
    marginBottom: 20,
  },
  avatarPlaceholder: {
    width: 100,
    height: 100,
    borderRadius: 50,
    backgroundColor: colors.white,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: colors.black,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 4,
  },
  profileAvatar: {
    width: 80,
    height: 80,
    borderRadius: 40,
  },
  editAvatarButton: {
    position: 'absolute',
    bottom: 5,
    right: 5,
    backgroundColor: colors.primary,
    width: 28,
    height: 28,
    borderRadius: 14,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 2,
    borderColor: colors.white,
  },
  profileName: {
    fontSize: 24,
    fontWeight: 'bold',
    color: colors.text,
    marginBottom: 8,
  },
  profileLevel: {
    fontSize: 18,
    color: '#32D392',
    fontWeight: '600',
    marginBottom: 4,
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
    backgroundColor: colors.white,
    borderRadius: 20,
    padding: 20,
    marginBottom: 15,
    shadowColor: colors.black,
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.15,
    shadowRadius: 12,
    elevation: 8,
    width: (width - 60) / 2, // Ширина для 2 карточек в ряду
    alignItems: 'center',
  },
  dangerCard: {
    borderWidth: 1,
    borderColor: colors.error,
  },
  cardIcon: {
    marginBottom: 12,
  },
  cardLabel: {
    fontSize: 14,
    color: colors.gray,
    marginBottom: 8,
    textAlign: 'center',
    fontWeight: '500',
  },
  cardValue: {
    fontSize: 16,
    fontWeight: '600',
    color: colors.text,
    textAlign: 'center',
  },
  dangerText: {
    color: colors.error,
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

