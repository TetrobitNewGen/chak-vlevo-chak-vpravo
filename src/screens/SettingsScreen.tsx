import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Image,
  Switch,
  Alert,
} from 'react-native';
// import { launchImageLibrary } from 'react-native-image-picker';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { colors } from '../utils/colors';

export default function SettingsScreen() {
  const [soundEnabled, setSoundEnabled] = useState(true);
  const [vibrationEnabled, setVibrationEnabled] = useState(true);
  const [difficulty, setDifficulty] = useState('medium');
  const [userAvatar, setUserAvatar] = useState('https://via.placeholder.com/80x80/4CAF50/FFFFFF?text=Й');

  const handleEditProfile = () => {
    Alert.alert(
      'Редактирование профиля',
      'Выберите действие',
      [
        { text: 'Отмена', style: 'cancel' },
        { text: 'Изменить фото', onPress: handleChangeAvatar },
        { text: 'Изменить имя', onPress: () => Alert.alert('Скоро', 'Функция изменения имени будет добавлена') },
      ]
    );
  };

  const handleChangeAvatar = () => {
    Alert.alert('Смена аватара', 'Функция смены аватара будет добавлена в следующей версии');
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
          <TouchableOpacity onPress={handleChangeAvatar}>
            <Image
              source={{ uri: userAvatar }}
              style={styles.profileAvatar}
            />
            <View style={styles.editAvatarButton}>
              <Ionicons name="camera" size={16} color={colors.white} />
            </View>
          </TouchableOpacity>
          <Text style={styles.profileName}>Йенифер</Text>
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
});

