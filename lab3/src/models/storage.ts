import { Book } from './book';
import { User } from './user';

export class Storage {
  // Для збереження масивів книг або користувачів
  static saveBooks(key: string, data: Book[]): void {
    localStorage.setItem(key, JSON.stringify(data));
  }

  static saveUsers(key: string, data: User[]): void {
    localStorage.setItem(key, JSON.stringify(data));
  }

  static loadBooks(key: string): Book[] {
    const data = localStorage.getItem(key);
    return data ? JSON.parse(data) : [];
  }

  static loadUsers(key: string): User[] {
    const data = localStorage.getItem(key);
    return data ? JSON.parse(data) : [];
  }

  static remove(key: string): void {
    localStorage.removeItem(key);
  }

  static clear(): void {
    localStorage.clear();
  }
}
