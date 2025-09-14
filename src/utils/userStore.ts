import AsyncStorage from '@react-native-async-storage/async-storage';

// Глобальное хранилище для данных пользователя
class UserStore {
  private userName: string = 'Йенифер';
  private userAvatar: string = '';
  private difficulty: string = 'medium';
  private mascotSkin: string = 'default';
  private listeners: Array<() => void> = [];

  getUserName(): string {
    return this.userName;
  }

  setUserName(name: string): void {
    this.userName = name;
    this.notifyListeners();
  }

  getUserAvatar(): string {
    return this.userAvatar;
  }

  setUserAvatar(avatar: string): void {
    this.userAvatar = avatar;
    this.notifyListeners();
  }

  getDifficulty(): string {
    return this.difficulty;
  }

  setDifficulty(difficulty: string): void {
    this.difficulty = difficulty;
    this.saveDifficultyToStorage(difficulty);
    this.notifyListeners();
  }

  private async saveDifficultyToStorage(difficulty: string): Promise<void> {
    try {
      await AsyncStorage.setItem('difficulty', difficulty);
    } catch (error) {
      console.log('Ошибка сохранения сложности в userStore:', error);
    }
  }

  async loadDifficultyFromStorage(): Promise<void> {
    try {
      const savedDifficulty = await AsyncStorage.getItem('difficulty');
      if (savedDifficulty) {
        this.difficulty = savedDifficulty;
        this.notifyListeners();
      }
    } catch (error) {
      console.log('Ошибка загрузки сложности в userStore:', error);
    }
  }

  getMascotSkin(): string {
    return this.mascotSkin;
  }

  setMascotSkin(skin: string): void {
    this.mascotSkin = skin;
    this.saveMascotSkinToStorage(skin);
    this.notifyListeners();
  }

  private async saveMascotSkinToStorage(skin: string): Promise<void> {
    try {
      await AsyncStorage.setItem('mascotSkin', skin);
    } catch (error) {
      console.log('Ошибка сохранения скина в userStore:', error);
    }
  }

  async loadMascotSkinFromStorage(): Promise<void> {
    try {
      const savedSkin = await AsyncStorage.getItem('mascotSkin');
      if (savedSkin) {
        this.mascotSkin = savedSkin;
        this.notifyListeners();
      }
    } catch (error) {
      console.log('Ошибка загрузки скина в userStore:', error);
    }
  }

  // Подписка на изменения
  subscribe(listener: () => void): () => void {
    this.listeners.push(listener);
    return () => {
      const index = this.listeners.indexOf(listener);
      if (index > -1) {
        this.listeners.splice(index, 1);
      }
    };
  }

  private notifyListeners(): void {
    this.listeners.forEach(listener => listener());
  }
}

export const userStore = new UserStore();
