// Глобальное хранилище для данных пользователя
class UserStore {
  private userName: string = 'Йенифер';
  private userAvatar: string = '';
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
