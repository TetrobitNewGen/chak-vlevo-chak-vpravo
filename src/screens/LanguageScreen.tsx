import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { colors } from '../utils/colors';

export default function LanguageScreen() {
  const navigation = useNavigation();
  const [selectedLanguage, setSelectedLanguage] = useState('russian');

  const languages = [
    {
      id: 'russian',
      name: 'Русский',
      flag: '🇷🇺',
      description: 'Русский язык',
      isSelected: selectedLanguage === 'russian',
    },
    {
      id: 'tatar',
      name: 'Татарский',
      flag: 'custom',
      description: 'Татар теле',
      isSelected: selectedLanguage === 'tatar',
    },
  ];

  const handleLanguageSelect = (languageId: string) => {
    setSelectedLanguage(languageId);
  };

  const handleSave = () => {
    // Здесь можно добавить логику сохранения выбранного языка
    console.log('Выбранный язык:', selectedLanguage);
    // Передаем выбранный язык обратно в ProfileScreen
    (navigation as any).navigate('Profile', { selectedLanguage });
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
        <Text style={styles.headerTitle}>Выбор языка</Text>
        <View style={styles.headerRight} />
      </View>

      <View style={styles.content}>
        {/* Title Section */}
        <View style={styles.titleSection}>
          <Text style={styles.title}>Выберите язык</Text>
          <Text style={styles.subtitle}>Выберите предпочитаемый язык интерфейса</Text>
        </View>

        {/* Language Options */}
        <View style={styles.languageContainer}>
          {languages.map((language) => (
            <TouchableOpacity
              key={language.id}
              style={[
                styles.languageCard,
                language.isSelected && styles.selectedLanguageCard
              ]}
              onPress={() => handleLanguageSelect(language.id)}
            >
              <View style={styles.languageContent}>
                <View style={styles.flagContainer}>
                  {language.flag === 'custom' ? (
                    <View style={styles.customFlag}>
                      <View style={styles.flagGreen} />
                      <View style={styles.flagWhite} />
                      <View style={styles.flagRed} />
                    </View>
                  ) : (
                    <Text style={styles.flagText}>{language.flag}</Text>
                  )}
                </View>
                <View style={styles.languageInfo}>
                  <Text style={[
                    styles.languageName,
                    language.isSelected && styles.selectedLanguageName
                  ]}>
                    {language.name}
                  </Text>
                  <Text style={[
                    styles.languageDescription,
                    language.isSelected && styles.selectedLanguageDescription
                  ]}>
                    {language.description}
                  </Text>
                </View>
                {language.isSelected && (
                  <View style={styles.checkmarkContainer}>
                    <Ionicons name="checkmark-circle" size={24} color={colors.primary} />
                  </View>
                )}
              </View>
            </TouchableOpacity>
          ))}
        </View>

        {/* Save Button */}
        <TouchableOpacity style={styles.saveButton} onPress={handleSave}>
          <Text style={styles.saveButtonText}>Сохранить</Text>
        </TouchableOpacity>
      </View>
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
    padding: 20,
  },
  titleSection: {
    alignItems: 'center',
    marginBottom: 30,
  },
  title: {
    fontSize: 28,
    fontWeight: '600',
    color: colors.text,
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 16,
    color: colors.gray,
    textAlign: 'center',
  },
  languageContainer: {
    marginBottom: 30,
  },
  languageCard: {
    backgroundColor: colors.white,
    borderRadius: 20,
    marginBottom: 15,
    shadowColor: colors.black,
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.15,
    shadowRadius: 12,
    elevation: 8,
    borderWidth: 2,
    borderColor: '#F0F0F0',
  },
  selectedLanguageCard: {
    borderColor: colors.primary,
    backgroundColor: '#F0F8FF',
  },
  languageContent: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 20,
  },
  flagContainer: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: '#F8F9FA',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 20,
    borderWidth: 2,
    borderColor: '#E9ECEF',
  },
  flagText: {
    fontSize: 32,
  },
  flagImage: {
    width: 50,
    height: 35,
    borderRadius: 4,
  },
  customFlag: {
    width: 50,
    height: 35,
    borderRadius: 4,
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: '#E0E0E0',
  },
  flagGreen: {
    flex: 1,
    backgroundColor: '#2E7D32',
  },
  flagWhite: {
    height: 3,
    backgroundColor: '#FFFFFF',
  },
  flagRed: {
    flex: 1,
    backgroundColor: '#D32F2F',
  },
  languageInfo: {
    flex: 1,
  },
  languageName: {
    fontSize: 20,
    fontWeight: '600',
    color: colors.text,
    marginBottom: 4,
  },
  selectedLanguageName: {
    color: colors.primary,
  },
  languageDescription: {
    fontSize: 16,
    color: colors.gray,
  },
  selectedLanguageDescription: {
    color: colors.primary,
    opacity: 0.8,
  },
  checkmarkContainer: {
    marginLeft: 10,
  },
  saveButton: {
    backgroundColor: colors.primary,
    borderRadius: 20,
    paddingVertical: 18,
    alignItems: 'center',
    shadowColor: colors.primary,
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.3,
    shadowRadius: 12,
    elevation: 8,
  },
  saveButtonText: {
    color: colors.white,
    fontSize: 18,
    fontWeight: '600',
  },
});
