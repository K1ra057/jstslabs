import { Book } from './book';
import { Library } from './library';

export interface IUser {
    id: number;
    name: string;
    email: string; // Додано поле email
    borrowedBooks: number[];
}

export class User implements IUser {
    borrowedBooks: number[] = [];

    constructor(public id: number, public name: string, public email: string) {} // Додано email

    borrowBook(bookId: number): boolean {
        if (this.borrowedBooks.length < 3) {
            this.borrowedBooks.push(bookId);
            return true;
        }
        return false;
    }

    returnBook(bookId: number): void {
        this.borrowedBooks = this.borrowedBooks.filter(id => id !== bookId);
    }

    returnBookById(bookId: number, library: Library<Book>): boolean {
        if (this.borrowedBooks.includes(bookId)) {
            this.returnBook(bookId);
            const book = library.findById(bookId, (item: Book) => item.id === bookId);
            if (book) {
                book.returnBook();
                return true;
            }
        }
        return false;
    }

    getUserInfo(): void {
        console.log(`ID користувача: ${this.id}`);
        console.log(`Ім'я користувача: ${this.name}`);
        console.log(`Електронна пошта: ${this.email}`); // Додано email
        console.log(`Позичені книги (ID): ${this.borrowedBooks.length ? this.borrowedBooks.join(', ') : 'Немає позичених книг'}`);
    }
}
