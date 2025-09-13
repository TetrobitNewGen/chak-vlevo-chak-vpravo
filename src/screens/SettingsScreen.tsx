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
import { colors } from '../utils/colors';
import { userStore } from '../utils/userStore';

export default function SettingsScreen() {
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

  return (
    <SafeAreaView style={styles.container}>

      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        {/* Profile Section */}
        <View style={styles.profileSection}>
          <TouchableOpacity onPress={handleEditProfile}>
            <Image
              source={userAvatar}
              style={styles.profileAvatar}
            />
            <View style={styles.editAvatarButton}>
              <Ionicons name="camera" size={16} color={colors.white} />
            </View>
          </TouchableOpacity>
          <Text style={styles.profileName}>{userName}</Text>
          <Text style={styles.profileLevel}>10 уровень</Text>
        </View>

        {/* Game Settings */}
        <View style={styles.settingsContainer}>
          <Text style={styles.sectionTitle}>Игровые настройки</Text>
          
          <TouchableOpacity style={styles.settingItem} onPress={handleEditProfile}>
            <View style={styles.settingLeft}>
              <Ionicons name="create-outline" size={24} color={colors.primary} />
              <Text style={styles.settingText}>Редактировать профиль</Text>
            </View>
            <Ionicons name="chevron-forward" size={20} color={colors.gray} />
          </TouchableOpacity>

          <TouchableOpacity style={styles.settingItem} onPress={handleChangeDifficulty}>
            <View style={styles.settingLeft}>
              <Ionicons name="trending-up-outline" size={24} color={colors.primary} />
              <Text style={styles.settingText}>Сложность: {difficulty === 'easy' ? 'Легкий' : difficulty === 'medium' ? 'Средний' : 'Сложный'}</Text>
            </View>
            <Ionicons name="chevron-forward" size={20} color={colors.gray} />
          </TouchableOpacity>
        </View>

        {/* Audio & Vibration */}
        <View style={styles.settingsContainer}>
          <Text style={styles.sectionTitle}>Звук и вибрация</Text>
          
          <View style={styles.settingItem}>
            <View style={styles.settingLeft}>
              <Ionicons name="volume-high-outline" size={24} color={colors.primary} />
              <Text style={styles.settingText}>Звук</Text>
            </View>
            <Switch
              value={soundEnabled}
              onValueChange={setSoundEnabled}
              trackColor={{ false: colors.lightGray, true: colors.primaryLight }}
              thumbColor={soundEnabled ? colors.white : colors.gray}
            />
          </View>

          <View style={styles.settingItem}>
            <View style={styles.settingLeft}>
              <Ionicons name="phone-portrait-outline" size={24} color={colors.primary} />
              <Text style={styles.settingText}>Вибрация</Text>
            </View>
            <Switch
              value={vibrationEnabled}
              onValueChange={setVibrationEnabled}
              trackColor={{ false: colors.lightGray, true: colors.primaryLight }}
              thumbColor={vibrationEnabled ? colors.white : colors.gray}
            />
          </View>
        </View>

        {/* Progress */}
        <View style={styles.settingsContainer}>
          <Text style={styles.sectionTitle}>Прогресс</Text>
          
          <TouchableOpacity style={styles.settingItem} onPress={handleResetProgress}>
            <View style={styles.settingLeft}>
              <Ionicons name="refresh-outline" size={24} color={colors.error} />
              <Text style={[styles.settingText, { color: colors.error }]}>Сбросить прогресс</Text>
            </View>
            <Ionicons name="chevron-forward" size={20} color={colors.gray} />
          </TouchableOpacity>
        </View>

        {/* App Info */}
        <View style={styles.settingsContainer}>
          <Text style={styles.sectionTitle}>О приложении</Text>
          
          <TouchableOpacity style={styles.settingItem}>
            <View style={styles.settingLeft}>
              <Ionicons name="help-circle-outline" size={24} color={colors.primary} />
              <Text style={styles.settingText}>Правила игры</Text>
            </View>
            <Ionicons name="chevron-forward" size={20} color={colors.gray} />
          </TouchableOpacity>

          <TouchableOpacity style={styles.settingItem}>
            <View style={styles.settingLeft}>
              <Ionicons name="information-circle-outline" size={24} color={colors.primary} />
              <Text style={styles.settingText}>О приложении</Text>
            </View>
            <Ionicons name="chevron-forward" size={20} color={colors.gray} />
          </TouchableOpacity>

          <TouchableOpacity style={styles.settingItem}>
            <View style={styles.settingLeft}>
              <Ionicons name="star-outline" size={24} color={colors.primary} />
              <Text style={styles.settingText}>Оценить приложение</Text>
            </View>
            <Ionicons name="chevron-forward" size={20} color={colors.gray} />
          </TouchableOpacity>
        </View>

        {/* App Version */}
        <View style={styles.versionContainer}>
          <Text style={styles.versionText}>Версия 1.0.0</Text>
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
    backgroundColor: colors.background,
  },
  content: {
    flex: 1,
  },
  profileSection: {
    alignItems: 'center',
    paddingVertical: 30,
    backgroundColor: colors.white,
    marginBottom: 20,
  },
  profileAvatar: {
    width: 80,
    height: 80,
    borderRadius: 40,
    marginBottom: 15,
  },
  editAvatarButton: {
    position: 'absolute',
    bottom: 10,
    right: 10,
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
    marginBottom: 5,
  },
  profileLevel: {
    fontSize: 16,
    color: colors.secondary,
    fontWeight: '600',
  },
  settingsContainer: {
    backgroundColor: colors.white,
    marginBottom: 20,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: colors.text,
    paddingHorizontal: 20,
    paddingVertical: 15,
    backgroundColor: colors.background,
  },
  settingItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    paddingVertical: 15,
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
  },
  settingLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  settingText: {
    fontSize: 16,
    color: colors.text,
    marginLeft: 15,
  },
  flagIcon: {
    width: 24,
    height: 16,
    borderRadius: 2,
    overflow: 'hidden',
    marginLeft: 0,
  },
  flagRed: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    height: 5.33,
    backgroundColor: '#E53E3E',
  },
  flagWhite: {
    position: 'absolute',
    top: 5.33,
    left: 0,
    right: 0,
    height: 5.33,
    backgroundColor: colors.white,
  },
  flagGreen: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    height: 5.33,
    backgroundColor: '#38A169',
  },
  logoutContainer: {
    paddingHorizontal: 20,
    marginBottom: 20,
  },
  logoutButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: colors.white,
    paddingVertical: 15,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: colors.error,
  },
  logoutText: {
    fontSize: 16,
    color: colors.error,
    marginLeft: 10,
    fontWeight: '600',
  },
  versionContainer: {
    alignItems: 'center',
    paddingVertical: 20,
  },
  versionText: {
    fontSize: 14,
    color: colors.gray,
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
    minWidth: Dimensions.get('window').width * 0.8,
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

