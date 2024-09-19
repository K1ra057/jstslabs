import { Book } from './models/book';
import { User } from './models/user';
import { Library } from './models/library';
import { Storage } from './models/storage';
import { NotificationService } from './services/notification';
import { Validation } from './utils/validation';

class App {
    private bookLibrary: Library<Book>;
    private userLibrary: Library<User>;

    constructor() {
        this.bookLibrary = new Library<Book>();
        this.userLibrary = new Library<User>();
        this.init();
    }

    // Завантаження даних з LocalStorage
    private loadData(): void {
        const storedBooks = Storage.load('books') || [];
        const storedUsers = Storage.load('users') || [];

        storedBooks.forEach((bookData: any) => {
            const book = new Book(
                bookData.id,
                bookData.title,
                bookData.author,
                bookData.year,
                bookData.isBorrowed
            );
            this.bookLibrary.add(book);
        });

        storedUsers.forEach((userData: any) => {
            const user = new User(userData.id, userData.name, userData.email);
            user.borrowedBooks = userData.borrowedBooks;
            this.userLibrary.add(user);
        });

        this.updateBookTable();
        this.updateUserTable();
    }

    // Оновлення таблиці книг
    private updateBookTable(): void {
        const bookList = document.getElementById('book-list')!;
        bookList.innerHTML = '';

        this.bookLibrary.getAll().forEach((book) => {
            const row = `<tr>
                <td>${book.id}</td>
                <td>${book.title}</td>
                <td>${book.author}</td>
                <td>${book.year}</td>
                <td>${book.isBorrowed ? 'Позичено' : 'Доступно'}</td>
                <td><button data-id="${book.id}" class="btn btn-danger btn-delete-book">Видалити книгу</button></td>
            </tr>`;
            bookList.insertAdjacentHTML('beforeend', row);
        });

        // Додавання обробників подій після оновлення таблиці
        document.querySelectorAll<HTMLButtonElement>('.btn-delete-book').forEach(button => {
            button.removeEventListener('click', this.handleDeleteBook);
            button.addEventListener('click', this.handleDeleteBook.bind(this));
        });
    }

    // Оновлення таблиці користувачів
    private updateUserTable(): void {
        const userList = document.getElementById('user-list')!;
        userList.innerHTML = '';

        this.userLibrary.getAll().forEach((user) => {
            const row = `<tr>
                <td>${user.id}</td>
                <td>${user.name}</td>
                <td>${user.email}</td>
                <td>${user.borrowedBooks.length}</td>
                <td><button data-id="${user.id}" class="btn btn-danger btn-delete-user">Видалити користувача</button></td>
            </tr>`;
            userList.insertAdjacentHTML('beforeend', row);
        });

        // Додавання обробників подій після оновлення таблиці
        document.querySelectorAll<HTMLButtonElement>('.btn-delete-user').forEach(button => {
            button.removeEventListener('click', this.handleDeleteUser);
            button.addEventListener('click', this.handleDeleteUser.bind(this));
        });
    }

    // Додавання книги
    private addBook(event: Event): void {
        event.preventDefault();

        const title = (document.getElementById('title') as HTMLInputElement).value.trim();
        const author = (document.getElementById('author') as HTMLInputElement).value.trim();
        const year = (document.getElementById('year') as HTMLInputElement).value.trim();

        if (!title || !author || !year) {
            NotificationService.notify('Всі поля мають бути заповнені', 'error');
            return;
        }

        if (Validation.isValidYear(year)) {
            const newBook = new Book(Date.now(), title, author, parseInt(year));
            this.bookLibrary.add(newBook);
            Storage.save('books', this.bookLibrary.getAll());
            this.updateBookTable();
            NotificationService.notify('Книга додана успішно', 'success');
        } else {
            NotificationService.notify('Невірний рік видання', 'error');
        }
    }

    // Додавання користувача
    private addUser(event: Event): void {
        event.preventDefault();

        const userId = Date.now();
        const nameElement = document.getElementById('userName') as HTMLInputElement;
        const emailElement = document.getElementById('userEmail') as HTMLInputElement;

        if (!nameElement || !emailElement) {
            NotificationService.notify('Не вдалося знайти поля для введення.', 'error');
            return;
        }

        const userName = nameElement.value.trim();
        const userEmail = emailElement.value.trim();

        if (!Validation.isValidEmail(userEmail)) {
            NotificationService.notify('Невірний формат email', 'error');
            return;
        }

        if (!userName || !userEmail) {
            NotificationService.notify('Ім\'я та email є обов\'язковими', 'error');
            return;
        }

        const newUser = new User(userId, userName, userEmail);
        this.userLibrary.add(newUser);
        Storage.save('users', this.userLibrary.getAll());
        this.updateUserTable();
        NotificationService.notify('Користувач доданий успішно', 'success');
    }

    // Видалення книги за ID
    private deleteBookById(bookId: number): void {
        if (isNaN(bookId)) {
            NotificationService.notify('Невірний ID книги', 'error');
            return;
        }

        const bookToRemove = this.bookLibrary.getAll().find(book => book.id === bookId);

        if (bookToRemove) {
            this.bookLibrary.remove(bookToRemove);
            Storage.save('books', this.bookLibrary.getAll());
            this.updateBookTable();
            NotificationService.notify('Книга успішно видалена', 'success');
        } else {
            NotificationService.notify('Книга не знайдена', 'error');
        }
    }

    // Видалення користувача за ID
    private deleteUserById(userId: number): void {
        if (isNaN(userId)) {
            NotificationService.notify('Невірний ID користувача', 'error');
            return;
        }

        const userToRemove = this.userLibrary.getAll().find(user => user.id === userId);

        if (userToRemove) {
            this.userLibrary.remove(userToRemove);
            Storage.save('users', this.userLibrary.getAll());
            this.updateUserTable();
            NotificationService.notify('Користувач успішно видалений', 'success');
        } else {
            NotificationService.notify('Користувач не знайдений', 'error');
        }
    }

    // Позичання книги
    private borrowBook(event: Event): void {
        event.preventDefault();

        const bookIdInput = document.getElementById('borrowBookId') as HTMLInputElement;
        const userIdInput = document.getElementById('borrowUserId') as HTMLInputElement;

        const bookId = parseInt(bookIdInput.value);
        const userId = parseInt(userIdInput.value);

        const book = this.bookLibrary.findById(bookId, (b: Book) => b.id === bookId);
        const user = this.userLibrary.findById(userId, (u: User) => u.id === userId);

        if (!book || !user) {
            NotificationService.notify('Книга або користувач не знайдені', 'error');
            return;
        }

        if (book.isBorrowed) {
            NotificationService.notify('Книга вже позичена', 'error');
            return;
        }

        const maxBooks = 3;
        if (!Validation.canUserBorrowMoreBooks(user.borrowedBooks.length, maxBooks)) {
            NotificationService.notify('Не можна брати більше ніж 3 книги', 'error');
            return;
        }

        if (user.borrowBook(bookId)) {
            book.borrow();
            Storage.save('books', this.bookLibrary.getAll());
            Storage.save('users', this.userLibrary.getAll());
            this.updateBookTable();
            this.updateUserTable();
            NotificationService.notify('Книга успішно позичена', 'success');
        } else {
            NotificationService.notify('Не вдалося позичити книгу', 'error');
        }

        // Очищення полів вводу
        bookIdInput.value = '';
        userIdInput.value = '';
    }

    // Повернення книги
    private returnBook(event: Event): void {
        event.preventDefault();

        const bookIdInput = document.getElementById('returnBookId') as HTMLInputElement;
        const userIdInput = document.getElementById('returnUserId') as HTMLInputElement;

        const bookId = parseInt(bookIdInput.value);
        const userId = parseInt(userIdInput.value);

        if (isNaN(bookId) || isNaN(userId)) {
            NotificationService.notify('Невірний ID книги або користувача', 'error');
            return;
        }

        const user = this.userLibrary.findById(userId, (u: User) => u.id === userId);
        const book = this.bookLibrary.findById(bookId, (b: Book) => b.id === bookId);

        if (!user || !book) {
            NotificationService.notify('Книга або користувач не знайдені', 'error');
            return;
        }

        if (user.returnBookById(bookId, this.bookLibrary)) {
            Storage.save('books', this.bookLibrary.getAll());
            Storage.save('users', this.userLibrary.getAll());
            this.updateBookTable();
            this.updateUserTable();
            NotificationService.notify('Книга успішно повернена', 'success');
        } else {
            NotificationService.notify('Книга не була позичена користувачем або не існує', 'error');
        }

        // Очищення полів вводу
        bookIdInput.value = '';
        userIdInput.value = '';
    }

    // Пошук книг за автором або назвою
    private searchBooks(event: Event): void {
        event.preventDefault();

        const searchTerm = (document.getElementById('searchTerm') as HTMLInputElement).value.toLowerCase().trim();

        if (!searchTerm) {
            NotificationService.notify('Будь ласка, введіть пошуковий запит', 'error');
            return;
        }

        const searchResults = this.bookLibrary.getAll().filter((book) =>
            book.title.toLowerCase().includes(searchTerm) || book.author.toLowerCase().includes(searchTerm)
        );

        this.updateSearchResults(searchResults);
    }

    // Оновлення таблиці результатів пошуку
    private updateSearchResults(books: Book[]): void {
        const searchBookList = document.getElementById('search-book-list')!;
        const searchResultsTable = document.getElementById('search-results')!;

        searchBookList.innerHTML = '';

        books.forEach((book) => {
            const row = `<tr>
                <td>${book.id}</td>
                <td>${book.title}</td>
                <td>${book.author}</td>
                <td>${book.year}</td>
                <td>${book.isBorrowed ? 'Позичено' : 'Доступно'}</td>
            </tr>`;
            searchBookList.insertAdjacentHTML('beforeend', row);
        });

        if (books.length === 0) {
            searchBookList.innerHTML = '<tr><td colspan="5">Книг не знайдено</td></tr>';
        }

        // Показати таблицю результатів
        searchResultsTable.classList.remove('d-none');
    }

    // Ініціалізація додатку
    private init(): void {
        const bookForm = document.getElementById('book-form') as HTMLFormElement | null;
        const userForm = document.getElementById('user-form') as HTMLFormElement | null;
        const borrowBookForm = document.getElementById('borrow-form') as HTMLFormElement | null;
        const returnBookForm = document.getElementById('return-form') as HTMLFormElement | null;
        const searchForm = document.getElementById('search-form') as HTMLFormElement | null;

        // Додавання обробників подій до форм
        bookForm?.addEventListener('submit', this.addBook.bind(this));
        userForm?.addEventListener('submit', this.addUser.bind(this));
        borrowBookForm?.addEventListener('submit', this.borrowBook.bind(this));
        returnBookForm?.addEventListener('submit', this.returnBook.bind(this));
        searchForm?.addEventListener('submit', this.searchBooks.bind(this));

        this.loadData();
    }

    // Обробник видалення книги
    private handleDeleteBook(event: Event): void {
        const button = event.currentTarget as HTMLButtonElement;
        const bookId = Number(button.getAttribute('data-id'));
        this.deleteBookById(bookId);
    }

    // Обробник видалення користувача
    private handleDeleteUser(event: Event): void {
        const button = event.currentTarget as HTMLButtonElement;
        const userId = Number(button.getAttribute('data-id'));
        this.deleteUserById(userId);
    }
}

// Ініціалізація додатку після завантаження вікна
window.addEventListener('DOMContentLoaded', () => {
    new App();
});
