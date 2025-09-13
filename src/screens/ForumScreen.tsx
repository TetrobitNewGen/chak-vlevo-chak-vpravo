import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  TextInput,
  Image,
  Dimensions,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { colors } from '../utils/colors';
import { ForumPost } from '../types';

const { width } = Dimensions.get('window');

const mockPosts: ForumPost[] = [
  {
    id: '1',
    title: 'Как лучше изучать татарский язык?',
    author: 'Айгуль',
    content: 'Привет! Я только начинаю изучать татарский язык. Какие методы вы рекомендуете для быстрого прогресса?',
    timestamp: '2 часа назад',
    likes: 12,
    comments: 8,
  },
  {
    id: '2',
    title: 'Татарские традиции и обычаи',
    author: 'Рустем',
    content: 'Расскажите о самых интересных татарских традициях, которые сохранились до наших дней.',
    timestamp: '5 часов назад',
    likes: 25,
    comments: 15,
  },
  {
    id: '3',
    title: 'Рекомендации книг на татарском языке',
    author: 'Гульнара',
    content: 'Посоветуйте хорошие книги для изучения татарского языка. Особенно интересует художественная литература.',
    timestamp: '1 день назад',
    likes: 18,
    comments: 12,
  },
  {
    id: '4',
    title: 'Татарская кухня - рецепты',
    author: 'Ильдар',
    content: 'Делимся рецептами традиционных татарских блюд! Начну с эчпочмака.',
    timestamp: '2 дня назад',
    likes: 32,
    comments: 20,
  },
];

const categories = [
  { key: 'all', label: 'Все', icon: 'grid-outline' },
  { key: 'language', label: 'Язык', icon: 'book-outline' },
  { key: 'culture', label: 'Культура', icon: 'musical-notes-outline' },
  { key: 'traditions', label: 'Традиции', icon: 'people-outline' },
  { key: 'food', label: 'Кухня', icon: 'restaurant-outline' },
];

export default function ForumScreen() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [newPostText, setNewPostText] = useState('');

  const filteredPosts = mockPosts.filter((post) => {
    const matchesSearch = post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         post.content.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesSearch;
  });

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Форум</Text>
        <TouchableOpacity style={styles.menuButton}>
          <Ionicons name="menu" size={24} color={colors.white} />
        </TouchableOpacity>
      </View>

      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        {/* Search Bar */}
        <View style={styles.searchContainer}>
          <View style={styles.searchBar}>
            <Ionicons name="search" size={20} color={colors.gray} />
            <TextInput
              style={styles.searchInput}
              placeholder="Поиск в форуме..."
              placeholderTextColor={colors.gray}
              value={searchQuery}
              onChangeText={setSearchQuery}
            />
          </View>
        </View>

        {/* Categories */}
        <ScrollView 
          horizontal 
          showsHorizontalScrollIndicator={false}
          style={styles.categoriesContainer}
        >
          {categories.map((category) => (
            <TouchableOpacity
              key={category.key}
              style={[
                styles.categoryButton,
                selectedCategory === category.key && styles.activeCategoryButton
              ]}
              onPress={() => setSelectedCategory(category.key)}
            >
              <Ionicons 
                name={category.icon as any} 
                size={20} 
                color={selectedCategory === category.key ? colors.white : colors.gray} 
              />
              <Text
                style={[
                  styles.categoryText,
                  selectedCategory === category.key && styles.activeCategoryText
                ]}
              >
                {category.label}
              </Text>
            </TouchableOpacity>
          ))}
        </ScrollView>

        {/* Create New Post */}
        <View style={styles.createPostContainer}>
          <View style={styles.createPostInput}>
            <TextInput
              style={styles.createPostText}
              placeholder="Поделитесь своими мыслями..."
              placeholderTextColor={colors.gray}
              value={newPostText}
              onChangeText={setNewPostText}
              multiline
            />
            <TouchableOpacity style={styles.createPostButton}>
              <Ionicons name="send" size={20} color={colors.white} />
            </TouchableOpacity>
          </View>
        </View>

        {/* Posts */}
        <View style={styles.postsContainer}>
          {filteredPosts.map((post) => (
            <TouchableOpacity key={post.id} style={styles.postCard}>
              <View style={styles.postHeader}>
                <Image
                  source={{ uri: `https://via.placeholder.com/40x40/4CAF50/FFFFFF?text=${post.author[0]}` }}
                  style={styles.authorAvatar}
                />
                <View style={styles.postAuthorInfo}>
                  <Text style={styles.authorName}>{post.author}</Text>
                  <Text style={styles.postTimestamp}>{post.timestamp}</Text>
                </View>
              </View>
              
              <Text style={styles.postTitle}>{post.title}</Text>
              <Text style={styles.postContent} numberOfLines={3}>
                {post.content}
              </Text>
              
              <View style={styles.postActions}>
                <TouchableOpacity style={styles.actionButton}>
                  <Ionicons name="heart-outline" size={16} color={colors.gray} />
                  <Text style={styles.actionText}>{post.likes}</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.actionButton}>
                  <Ionicons name="chatbubble-outline" size={16} color={colors.gray} />
                  <Text style={styles.actionText}>{post.comments}</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.actionButton}>
                  <Ionicons name="share-outline" size={16} color={colors.gray} />
                </TouchableOpacity>
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
  searchContainer: {
    padding: 20,
  },
  searchBar: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.white,
    borderRadius: 25,
    paddingHorizontal: 15,
    paddingVertical: 12,
  },
  searchInput: {
    flex: 1,
    marginLeft: 10,
    fontSize: 16,
    color: colors.text,
  },
  categoriesContainer: {
    paddingHorizontal: 20,
    marginBottom: 20,
  },
  categoryButton: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 15,
    paddingVertical: 10,
    marginRight: 10,
    backgroundColor: colors.white,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: colors.border,
  },
  activeCategoryButton: {
    backgroundColor: colors.primary,
    borderColor: colors.primary,
  },
  categoryText: {
    marginLeft: 5,
    fontSize: 14,
    color: colors.gray,
  },
  activeCategoryText: {
    color: colors.white,
    fontWeight: '600',
  },
  createPostContainer: {
    paddingHorizontal: 20,
    marginBottom: 20,
  },
  createPostInput: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    backgroundColor: colors.white,
    borderRadius: 25,
    paddingHorizontal: 15,
    paddingVertical: 12,
  },
  createPostText: {
    flex: 1,
    fontSize: 16,
    color: colors.text,
    maxHeight: 100,
  },
  createPostButton: {
    backgroundColor: colors.primary,
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: 10,
  },
  postsContainer: {
    paddingHorizontal: 20,
  },
  postCard: {
    backgroundColor: colors.white,
    borderRadius: 15,
    padding: 15,
    marginBottom: 15,
    shadowColor: colors.black,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  postHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  authorAvatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
    marginRight: 10,
  },
  postAuthorInfo: {
    flex: 1,
  },
  authorName: {
    fontSize: 16,
    fontWeight: '600',
    color: colors.text,
  },
  postTimestamp: {
    fontSize: 12,
    color: colors.gray,
  },
  postTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: colors.text,
    marginBottom: 8,
  },
  postContent: {
    fontSize: 14,
    color: colors.textSecondary,
    lineHeight: 20,
    marginBottom: 15,
  },
  postActions: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  actionButton: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 10,
    paddingVertical: 5,
  },
  actionText: {
    marginLeft: 5,
    fontSize: 14,
    color: colors.gray,
  },
});

