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
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { colors } from '../utils/colors';

export default function SettingsScreen() {
  const [notificationsEnabled, setNotificationsEnabled] = useState(true);
  const [darkModeEnabled, setDarkModeEnabled] = useState(false);
  const [autoPlayEnabled, setAutoPlayEnabled] = useState(true);

  const handleEditProfile = () => {
    Alert.alert('Редактирование профиля', 'Функция редактирования профиля будет добавлена в следующей версии');
  };

  const handleChangeLanguage = () => {
    Alert.alert('Смена языка', 'Выберите язык интерфейса', [
      { text: 'Русский', onPress: () => console.log('Русский выбран') },
      { text: 'Татарский', onPress: () => console.log('Татарский выбран') },
      { text: 'English', onPress: () => console.log('English выбран') },
      { text: 'Отмена', style: 'cancel' },
    ]);
  };

  const handleLogout = () => {
    Alert.alert(
      'Выход',
      'Вы уверены, что хотите выйти из приложения?',
      [
        { text: 'Отмена', style: 'cancel' },
        { text: 'Выйти', style: 'destructive', onPress: () => console.log('Выход') },
      ]
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Настройки</Text>
        <TouchableOpacity style={styles.menuButton}>
          <Ionicons name="menu" size={24} color={colors.white} />
        </TouchableOpacity>
      </View>

      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        {/* Profile Section */}
        <View style={styles.profileSection}>
          <Image
            source={{ uri: 'https://via.placeholder.com/80x80/4CAF50/FFFFFF?text=Й' }}
            style={styles.profileAvatar}
          />
          <Text style={styles.profileName}>Йенифер</Text>
          <Text style={styles.profileLevel}>10 уровень</Text>
        </View>

        {/* Settings Options */}
        <View style={styles.settingsContainer}>
          <Text style={styles.sectionTitle}>Настройки</Text>
          
          <TouchableOpacity style={styles.settingItem} onPress={handleEditProfile}>
            <View style={styles.settingLeft}>
              <Ionicons name="create-outline" size={24} color={colors.primary} />
              <Text style={styles.settingText}>Редактировать профиль</Text>
            </View>
            <Ionicons name="chevron-forward" size={20} color={colors.gray} />
          </TouchableOpacity>

          <TouchableOpacity style={styles.settingItem} onPress={handleChangeLanguage}>
            <View style={styles.settingLeft}>
              <View style={styles.flagIcon}>
                <View style={styles.flagRed} />
                <View style={styles.flagWhite} />
                <View style={styles.flagGreen} />
              </View>
              <Text style={styles.settingText}>Сменить язык</Text>
            </View>
            <Ionicons name="chevron-forward" size={20} color={colors.gray} />
          </TouchableOpacity>
        </View>

        {/* Preferences */}
        <View style={styles.settingsContainer}>
          <Text style={styles.sectionTitle}>Предпочтения</Text>
          
          <View style={styles.settingItem}>
            <View style={styles.settingLeft}>
              <Ionicons name="notifications-outline" size={24} color={colors.primary} />
              <Text style={styles.settingText}>Уведомления</Text>
            </View>
            <Switch
              value={notificationsEnabled}
              onValueChange={setNotificationsEnabled}
              trackColor={{ false: colors.lightGray, true: colors.primaryLight }}
              thumbColor={notificationsEnabled ? colors.white : colors.gray}
            />
          </View>

          <View style={styles.settingItem}>
            <View style={styles.settingLeft}>
              <Ionicons name="moon-outline" size={24} color={colors.primary} />
              <Text style={styles.settingText}>Темная тема</Text>
            </View>
            <Switch
              value={darkModeEnabled}
              onValueChange={setDarkModeEnabled}
              trackColor={{ false: colors.lightGray, true: colors.primaryLight }}
              thumbColor={darkModeEnabled ? colors.white : colors.gray}
            />
          </View>

          <View style={styles.settingItem}>
            <View style={styles.settingLeft}>
              <Ionicons name="play-outline" size={24} color={colors.primary} />
              <Text style={styles.settingText}>Автовоспроизведение</Text>
            </View>
            <Switch
              value={autoPlayEnabled}
              onValueChange={setAutoPlayEnabled}
              trackColor={{ false: colors.lightGray, true: colors.primaryLight }}
              thumbColor={autoPlayEnabled ? colors.white : colors.gray}
            />
          </View>
        </View>

        {/* App Info */}
        <View style={styles.settingsContainer}>
          <Text style={styles.sectionTitle}>О приложении</Text>
          
          <TouchableOpacity style={styles.settingItem}>
            <View style={styles.settingLeft}>
              <Ionicons name="help-circle-outline" size={24} color={colors.primary} />
              <Text style={styles.settingText}>Помощь и поддержка</Text>
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

        {/* Logout */}
        <View style={styles.logoutContainer}>
          <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
            <Ionicons name="log-out-outline" size={24} color={colors.error} />
            <Text style={styles.logoutText}>Выйти</Text>
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

