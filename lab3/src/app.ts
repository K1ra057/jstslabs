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
        const user = new User(userData.id, userData.name, userData.email);
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
            <td><button data-id="${book.id}"   class="btn btn-danger btn-delete-book">Видалити книгу</td>
        </tr>`;
        bookList.insertAdjacentHTML('beforeend', row);
        document.querySelectorAll<HTMLButtonElement>('.btn-delete-book').forEach(button => {
            button.addEventListener('click', function () {
                const bookId = (this.getAttribute('data-id') as string); // Explicitly type it as string
                deleteBookById(Number(bookId)); // Convert to number since bookId is typed as number
            });
        });
    });
}

// Оновлення таблиці користувачів
// Оновлення таблиці користувачів
function updateUserTable(): void {
    const userList = document.getElementById('user-list')!;
    userList.innerHTML = '';

    userLibrary.getAll().forEach((user) => {
        const row = `<tr>
            <td>${user.id}</td>
            <td>${user.name}</td>
            <td>${user.email}</td> <!-- Додано поле Email -->
            <td>${user.borrowedBooks.length}</td>
            <td><button data-id="${user.id}" class="btn btn-danger btn-delete-user">Видалити користувача</td>
        </tr>`;
        userList.insertAdjacentHTML('beforeend', row);
        document.querySelectorAll<HTMLButtonElement>('.btn-delete-user').forEach(button => {
            button.addEventListener('click', function () {
                const userId = (this.getAttribute('data-id') as string);
                deleteUserById(Number(userId));
            });
        });
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
// Додавання користувача
function addUser(event: Event): void {
    event.preventDefault();

    // Генеруємо ID через new Date().getTime()
    const userId = new Date().getTime(); 
    
    // Отримуємо елементи за ID
    const nameElement = document.getElementById('userName') as HTMLInputElement;
    const emailElement = document.getElementById('userEmail') as HTMLInputElement;

    // Перевіряємо, чи елементи не null
    if (!nameElement || !emailElement) {
        NotificationService.notify('Не вдалося знайти поля для введення.');
        return;
    }

    const userName = nameElement.value;
    const userEmail = emailElement.value;

    if (!Validation.isValidEmail(userEmail)) {
        NotificationService.notify('Невірний формат email');
        return;
    }

    if (userName === '' || userEmail === '') {
        NotificationService.notify('Ім\'я та email є обов\'язковими');
        return;
    }

    const newUser = new User(userId, userName, userEmail); // Додаємо email до моделі користувача
    userLibrary.add(newUser);
    Storage.save('users', userLibrary.getAll());
    updateUserTable();
    NotificationService.notify('Користувач доданий успішно');
}


// Видалення книги за ID
function deleteBookById(bookId: number): void {

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

}

// Видалення користувача за ID
function deleteUserById(userId: number): void {

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

}


// Позичання книги
function borrowBook(event: Event): void {
    event.preventDefault();

    const bookId = parseInt((document.getElementById('borrowBookId') as HTMLInputElement).value);
    const userId = parseInt((document.getElementById('borrowUserId') as HTMLInputElement).value);

    const book = bookLibrary.findById(bookId, (b: Book) => b.id === bookId);
    const user = userLibrary.findById(userId, (u: User) => u.id === userId);

    if (!book || !user) {
        NotificationService.notify('Книга або користувач не знайдені', 'error');
        return;
    }

    if (book.isBorrowed) {
        NotificationService.notify('Книга вже позичена', 'error');
        return;
    }

    const maxBooks = 3; // Максимальна кількість книг, яку може позичити користувач
    if (!Validation.canUserBorrowMoreBooks(user.borrowedBooks.length, maxBooks)) {
        NotificationService.notify('Не можна брати більше ніж 3 книги', 'error');
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
        NotificationService.notify('Не вдалося позичити книгу', 'error');
    }

    // Очищення полів вводу
    (document.getElementById('borrowBookId') as HTMLInputElement).value = '';
    (document.getElementById('borrowUserId') as HTMLInputElement).value = '';
}



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
// Пошук книг за автором або назвою
function searchBooks(event: Event): void {
    event.preventDefault();

    const searchTerm = (document.getElementById('searchTerm') as HTMLInputElement).value.toLowerCase();

    if (searchTerm === '') {
        NotificationService.notify('Будь ласка, введіть пошуковий запит', 'error');
        return;
    }

    const searchResults = bookLibrary.getAll().filter((book) =>
        book.title.toLowerCase().includes(searchTerm) || book.author.toLowerCase().includes(searchTerm)
    );

    updateSearchResults(searchResults);
}

// Оновлення таблиці результатів пошуку
function updateSearchResults(books: Book[]): void {
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



// Ініціалізація програми
function init(): void {
    const bookForm = document.getElementById('book-form');
    const userForm = document.getElementById('user-form');
    const borrowBookForm = document.getElementById('borrow-form');
    const returnBookForm = document.getElementById('return-form');
    const searchForm = document.getElementById('search-form');





    // Форма для додавання книги
    if (bookForm) {
        bookForm.addEventListener('submit', addBook);
    }

    // Форма для додавання користувача
    if (userForm) {
        userForm.addEventListener('submit', addUser);
    }


    // Форма для позичання книги
    if (borrowBookForm) {
        borrowBookForm.addEventListener('submit', borrowBook);
    }

    // Форма для повернення книги
    if (returnBookForm) {
        returnBookForm.addEventListener('submit', returnBook);
    }

    // Форма для пошуку книг
    if (searchForm) {
        searchForm.addEventListener('submit', searchBooks);
    }
    loadData();

}

// Ініціалізація програми
window.onload = init;
