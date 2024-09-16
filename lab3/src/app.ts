import { Book } from './models/book';
import { User } from './models/user';
import { Library } from './models/library';
import { Storage } from './models/storage';
import { NotificationService } from './services/notification';
import { Validation } from './utils/validation';

// Ініціалізація бібліотеки та збережених даних
const bookLibrary = new Library<Book>();
const userLibrary = new Library<User>();

// Завантаження даних з LocalStorage
function loadData(): void {
    const storedBooks = Storage.load('books') || [];
    const storedUsers = Storage.load('users') || [];

    storedBooks.forEach((bookData: any) => {
        const book = new Book(bookData.id, bookData.title, bookData.author, bookData.year, bookData.isBorrowed);
        bookLibrary.add(book);
    });

    storedUsers.forEach((userData: any) => {
        const user = new User(userData.id, userData.name);
        user.borrowedBooks = userData.borrowedBooks;
        userLibrary.add(user);
    });

    updateBookTable();
    updateUserTable();
}

// Оновлення таблиці книг
function updateBookTable(): void {
    const bookList = document.getElementById('book-list')!;
    bookList.innerHTML = '';

    bookLibrary.getAll().forEach((book) => {
        const row = `<tr>
            <td>${book.id}</td>
            <td>${book.title}</td>
            <td>${book.author}</td>
            <td>${book.year}</td>
            <td>${book.isBorrowed ? 'Позичено' : 'Доступно'}</td>
        </tr>`;
        bookList.insertAdjacentHTML('beforeend', row);
    });
}

// Оновлення таблиці користувачів
function updateUserTable(): void {
    const userList = document.getElementById('user-list')!;
    userList.innerHTML = '';

    userLibrary.getAll().forEach((user) => {
        const row = `<tr>
            <td>${user.id}</td>
            <td>${user.name}</td>
            <td>${user.borrowedBooks.length}</td>
        </tr>`;
        userList.insertAdjacentHTML('beforeend', row);
    });
}

// Додавання книги
function addBook(event: Event): void {
    event.preventDefault();

    const title = (document.getElementById('title') as HTMLInputElement).value;
    const author = (document.getElementById('author') as HTMLInputElement).value;
    const year = (document.getElementById('year') as HTMLInputElement).value;

    if (title === '' || author === '' || year === '') {
        NotificationService.notify('Всі поля мають бути заповнені');
        return;
    }

    if (Validation.isValidYear(year)) {
        const newBook = new Book(Date.now(), title, author, parseInt(year));
        bookLibrary.add(newBook);
        Storage.save('books', bookLibrary.getAll());
        updateBookTable(); // Оновлюємо таблицю після додавання книги
        NotificationService.notify('Книга додана успішно');
    } else {
        NotificationService.notify('Невірний рік видання');
    }
}

// Додавання користувача
function addUser(event: Event): void {
    event.preventDefault();

    const userId = (document.getElementById('userId') as HTMLInputElement).value;
    const userName = (document.getElementById('userName') as HTMLInputElement).value;

    if (Validation.isNumber(userId)) {
        const newUser = new User(parseInt(userId), userName);
        userLibrary.add(newUser);
        Storage.save('users', userLibrary.getAll());
        updateUserTable();
        NotificationService.notify('Користувач доданий успішно');
    } else {
        NotificationService.notify('Невірний ID користувача');
    }
}

// Видалення книги за ID
function deleteBookById(): void {
    const bookIdInput = document.getElementById('deleteBookId') as HTMLInputElement;
    const bookId = parseInt(bookIdInput.value);

    if (!isNaN(bookId)) {
        const bookToRemove = bookLibrary.getAll().find(book => book.id === bookId);

        if (bookToRemove) {
            bookLibrary.remove(bookToRemove); // Видаляємо книгу з бібліотеки
            Storage.save('books', bookLibrary.getAll()); // Оновлюємо дані в LocalStorage
            updateBookTable(); // Оновлюємо таблицю книг
            NotificationService.notify('Книга успішно видалена');
        } else {
            NotificationService.notify('Книга не знайдена');
        }
    } else {
        NotificationService.notify('Невірний ID книги');
    }

    // Очищуємо поле вводу після видалення
    bookIdInput.value = '';
}

// Видалення користувача за ID
function deleteUserById(): void {
    const userIdInput = document.getElementById('deleteUserId') as HTMLInputElement;
    const userId = parseInt(userIdInput.value);

    if (!isNaN(userId)) {
        const userToRemove = userLibrary.getAll().find(user => user.id === userId);

        if (userToRemove) {
            userLibrary.remove(userToRemove); // Видаляємо користувача з бібліотеки
            Storage.save('users', userLibrary.getAll()); // Оновлюємо дані в LocalStorage
            updateUserTable(); // Оновлюємо таблицю користувачів
            NotificationService.notify('Користувач успішно видалений');
        } else {
            NotificationService.notify('Користувач не знайдений');
        }
    } else {
        NotificationService.notify('Невірний ID користувача');
    }

    // Очищуємо поле вводу після видалення
    userIdInput.value = '';
}

// Позичання книги
// Позичання книги користувачем
function borrowBook(event: Event): void {
    event.preventDefault();

    const bookId = parseInt((document.getElementById('borrowBookId') as HTMLInputElement).value);
    const userId = parseInt((document.getElementById('borrowUserId') as HTMLInputElement).value);

    const book = bookLibrary.findById(bookId, (b: Book) => b.id === bookId);
    const user = userLibrary.findById(userId, (u: User) => u.id === userId);

    if (!book || !user) {
        NotificationService.notify('Книга або користувач не знайдені');
        return;
    }

    if (book.isBorrowed) {
        NotificationService.notify('Книга вже позичена');
        return;
    }

    if (user.borrowBook(bookId)) {
        book.borrow();
        Storage.save('books', bookLibrary.getAll());
        Storage.save('users', userLibrary.getAll());
        updateBookTable();
        updateUserTable();
        NotificationService.notify('Книга успішно позичена');
    } else {
        NotificationService.notify('Користувач не може позичити більше книг');
    }

    // Очищення полів вводу
    (document.getElementById('borrowBookId') as HTMLInputElement).value = '';
    (document.getElementById('borrowUserId') as HTMLInputElement).value = '';
}


// Повернення книги
// Повернення книги
function returnBook(event: Event): void {
    event.preventDefault();

    const bookIdInput = document.getElementById('returnBookId') as HTMLInputElement;
    const userIdInput = document.getElementById('returnUserId') as HTMLInputElement;
    const bookId = parseInt(bookIdInput.value);
    const userId = parseInt(userIdInput.value);

    if (!isNaN(bookId) && !isNaN(userId)) {
        const user = userLibrary.findById(userId, (item: User) => item.id === userId);
        const book = bookLibrary.findById(bookId, (item: Book) => item.id === bookId);

        if (user && book) {
            if (user.returnBookById(bookId, bookLibrary)) {
                Storage.save('books', bookLibrary.getAll());
                Storage.save('users', userLibrary.getAll());
                updateBookTable();
                updateUserTable();
                NotificationService.notify('Книга успішно повернена');
            } else {
                NotificationService.notify('Книга не була позичена користувачем або не існує');
            }
        } else {
            NotificationService.notify('Книга або користувач не знайдені');
        }
    } else {
        NotificationService.notify('Невірний ID книги або користувача');
    }

    // Очищуємо поля вводу після повернення
    bookIdInput.value = '';
    userIdInput.value = '';
}


// Ініціалізація програми
function init(): void {
    const bookForm = document.getElementById('book-form');
    const userForm = document.getElementById('user-form');
    const deleteBookButton = document.getElementById('deleteBookButton');
    const deleteUserButton = document.getElementById('deleteUserButton');
    const borrowBookForm = document.getElementById('borrow-form');
    const returnBookForm = document.getElementById('return-form'); // Оголошення змінної

    // Форма для додавання книги
    if (bookForm) {
        bookForm.addEventListener('submit', addBook);
    }

    // Форма для додавання користувача
    if (userForm) {
        userForm.addEventListener('submit', addUser);
    }

    // Кнопка для видалення книги за ID
    if (deleteBookButton) {
        deleteBookButton.addEventListener('click', deleteBookById);
    }

    // Кнопка для видалення користувача за ID
    if (deleteUserButton) {
        deleteUserButton.addEventListener('click', deleteUserById);
    }

    // Форма для позичання книги
    if (borrowBookForm) {
        borrowBookForm.addEventListener('submit', borrowBook);
    }

    // Форма для повернення книги
    if (returnBookForm) {
        returnBookForm.addEventListener('submit', returnBook);
    }

    loadData();
}


// Ініціалізація програми
window.onload = init;
