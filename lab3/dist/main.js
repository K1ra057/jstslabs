/*
 * ATTENTION: The "eval" devtool has been used (maybe by default in mode: "development").
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./src/app.ts":
/*!********************!*\
  !*** ./src/app.ts ***!
  \********************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

eval("\nObject.defineProperty(exports, \"__esModule\", ({ value: true }));\nvar book_1 = __webpack_require__(/*! ./models/book */ \"./src/models/book.ts\");\nvar user_1 = __webpack_require__(/*! ./models/user */ \"./src/models/user.ts\");\nvar library_1 = __webpack_require__(/*! ./models/library */ \"./src/models/library.ts\");\nvar storage_1 = __webpack_require__(/*! ./models/storage */ \"./src/models/storage.ts\");\nvar notification_1 = __webpack_require__(/*! ./services/notification */ \"./src/services/notification.ts\");\nvar validation_1 = __webpack_require__(/*! ./utils/validation */ \"./src/utils/validation.ts\");\n// Ініціалізація бібліотеки та збережених даних\nvar bookLibrary = new library_1.Library();\nvar userLibrary = new library_1.Library();\n// Завантаження даних з LocalStorage\nfunction loadData() {\n    var storedBooks = storage_1.Storage.load('books') || [];\n    var storedUsers = storage_1.Storage.load('users') || [];\n    storedBooks.forEach(function (bookData) {\n        var book = new book_1.Book(bookData.id, bookData.title, bookData.author, bookData.year, bookData.isBorrowed);\n        bookLibrary.add(book);\n    });\n    storedUsers.forEach(function (userData) {\n        var user = new user_1.User(userData.id, userData.name);\n        user.borrowedBooks = userData.borrowedBooks;\n        userLibrary.add(user);\n    });\n    updateBookTable();\n    updateUserTable();\n}\n// Оновлення таблиці книг\nfunction updateBookTable() {\n    var bookList = document.getElementById('book-list');\n    bookList.innerHTML = '';\n    bookLibrary.getAll().forEach(function (book) {\n        var row = \"<tr>\\n            <td>\".concat(book.id, \"</td>\\n            <td>\").concat(book.title, \"</td>\\n            <td>\").concat(book.author, \"</td>\\n            <td>\").concat(book.year, \"</td>\\n            <td>\").concat(book.isBorrowed ? 'Позичено' : 'Доступно', \"</td>\\n        </tr>\");\n        bookList.insertAdjacentHTML('beforeend', row);\n    });\n}\n// Оновлення таблиці користувачів\nfunction updateUserTable() {\n    var userList = document.getElementById('user-list');\n    userList.innerHTML = '';\n    userLibrary.getAll().forEach(function (user) {\n        var row = \"<tr>\\n            <td>\".concat(user.id, \"</td>\\n            <td>\").concat(user.name, \"</td>\\n            <td>\").concat(user.borrowedBooks.length, \"</td>\\n        </tr>\");\n        userList.insertAdjacentHTML('beforeend', row);\n    });\n}\n// Додавання книги\nfunction addBook(event) {\n    event.preventDefault();\n    var title = document.getElementById('title').value;\n    var author = document.getElementById('author').value;\n    var year = document.getElementById('year').value;\n    if (title === '' || author === '' || year === '') {\n        notification_1.NotificationService.notify('Всі поля мають бути заповнені');\n        return;\n    }\n    if (validation_1.Validation.isValidYear(year)) {\n        var newBook = new book_1.Book(Date.now(), title, author, parseInt(year));\n        bookLibrary.add(newBook);\n        storage_1.Storage.save('books', bookLibrary.getAll());\n        updateBookTable(); // Оновлюємо таблицю після додавання книги\n        notification_1.NotificationService.notify('Книга додана успішно');\n    }\n    else {\n        notification_1.NotificationService.notify('Невірний рік видання');\n    }\n}\n// Додавання користувача\nfunction addUser(event) {\n    event.preventDefault();\n    var userId = document.getElementById('userId').value;\n    var userName = document.getElementById('userName').value;\n    if (validation_1.Validation.isNumber(userId)) {\n        var newUser = new user_1.User(parseInt(userId), userName);\n        userLibrary.add(newUser);\n        storage_1.Storage.save('users', userLibrary.getAll());\n        updateUserTable();\n        notification_1.NotificationService.notify('Користувач доданий успішно');\n    }\n    else {\n        notification_1.NotificationService.notify('Невірний ID користувача');\n    }\n}\n// Видалення книги за ID\nfunction deleteBookById() {\n    var bookIdInput = document.getElementById('deleteBookId');\n    var bookId = parseInt(bookIdInput.value);\n    if (!isNaN(bookId)) {\n        var bookToRemove = bookLibrary.getAll().find(function (book) { return book.id === bookId; });\n        if (bookToRemove) {\n            bookLibrary.remove(bookToRemove); // Видаляємо книгу з бібліотеки\n            storage_1.Storage.save('books', bookLibrary.getAll()); // Оновлюємо дані в LocalStorage\n            updateBookTable(); // Оновлюємо таблицю книг\n            notification_1.NotificationService.notify('Книга успішно видалена');\n        }\n        else {\n            notification_1.NotificationService.notify('Книга не знайдена');\n        }\n    }\n    else {\n        notification_1.NotificationService.notify('Невірний ID книги');\n    }\n    // Очищуємо поле вводу після видалення\n    bookIdInput.value = '';\n}\n// Видалення користувача за ID\nfunction deleteUserById() {\n    var userIdInput = document.getElementById('deleteUserId');\n    var userId = parseInt(userIdInput.value);\n    if (!isNaN(userId)) {\n        var userToRemove = userLibrary.getAll().find(function (user) { return user.id === userId; });\n        if (userToRemove) {\n            userLibrary.remove(userToRemove); // Видаляємо користувача з бібліотеки\n            storage_1.Storage.save('users', userLibrary.getAll()); // Оновлюємо дані в LocalStorage\n            updateUserTable(); // Оновлюємо таблицю користувачів\n            notification_1.NotificationService.notify('Користувач успішно видалений');\n        }\n        else {\n            notification_1.NotificationService.notify('Користувач не знайдений');\n        }\n    }\n    else {\n        notification_1.NotificationService.notify('Невірний ID користувача');\n    }\n    // Очищуємо поле вводу після видалення\n    userIdInput.value = '';\n}\n// Позичання книги\n// Позичання книги користувачем\nfunction borrowBook(event) {\n    event.preventDefault();\n    var bookId = parseInt(document.getElementById('borrowBookId').value);\n    var userId = parseInt(document.getElementById('borrowUserId').value);\n    var book = bookLibrary.findById(bookId, function (b) { return b.id === bookId; });\n    var user = userLibrary.findById(userId, function (u) { return u.id === userId; });\n    if (!book || !user) {\n        notification_1.NotificationService.notify('Книга або користувач не знайдені');\n        return;\n    }\n    if (book.isBorrowed) {\n        notification_1.NotificationService.notify('Книга вже позичена');\n        return;\n    }\n    if (user.borrowBook(bookId)) {\n        book.borrow();\n        storage_1.Storage.save('books', bookLibrary.getAll());\n        storage_1.Storage.save('users', userLibrary.getAll());\n        updateBookTable();\n        updateUserTable();\n        notification_1.NotificationService.notify('Книга успішно позичена');\n    }\n    else {\n        notification_1.NotificationService.notify('Користувач не може позичити більше книг');\n    }\n    // Очищення полів вводу\n    document.getElementById('borrowBookId').value = '';\n    document.getElementById('borrowUserId').value = '';\n}\n// Повернення книги\n// Повернення книги\nfunction returnBook(event) {\n    event.preventDefault();\n    var bookIdInput = document.getElementById('returnBookId');\n    var userIdInput = document.getElementById('returnUserId');\n    var bookId = parseInt(bookIdInput.value);\n    var userId = parseInt(userIdInput.value);\n    if (!isNaN(bookId) && !isNaN(userId)) {\n        var user = userLibrary.findById(userId, function (item) { return item.id === userId; });\n        var book = bookLibrary.findById(bookId, function (item) { return item.id === bookId; });\n        if (user && book) {\n            if (user.returnBookById(bookId, bookLibrary)) {\n                storage_1.Storage.save('books', bookLibrary.getAll());\n                storage_1.Storage.save('users', userLibrary.getAll());\n                updateBookTable();\n                updateUserTable();\n                notification_1.NotificationService.notify('Книга успішно повернена');\n            }\n            else {\n                notification_1.NotificationService.notify('Книга не була позичена користувачем або не існує');\n            }\n        }\n        else {\n            notification_1.NotificationService.notify('Книга або користувач не знайдені');\n        }\n    }\n    else {\n        notification_1.NotificationService.notify('Невірний ID книги або користувача');\n    }\n    // Очищуємо поля вводу після повернення\n    bookIdInput.value = '';\n    userIdInput.value = '';\n}\n// Ініціалізація програми\nfunction init() {\n    var bookForm = document.getElementById('book-form');\n    var userForm = document.getElementById('user-form');\n    var deleteBookButton = document.getElementById('deleteBookButton');\n    var deleteUserButton = document.getElementById('deleteUserButton');\n    var borrowBookForm = document.getElementById('borrow-form');\n    var returnBookForm = document.getElementById('return-form'); // Оголошення змінної\n    // Форма для додавання книги\n    if (bookForm) {\n        bookForm.addEventListener('submit', addBook);\n    }\n    // Форма для додавання користувача\n    if (userForm) {\n        userForm.addEventListener('submit', addUser);\n    }\n    // Кнопка для видалення книги за ID\n    if (deleteBookButton) {\n        deleteBookButton.addEventListener('click', deleteBookById);\n    }\n    // Кнопка для видалення користувача за ID\n    if (deleteUserButton) {\n        deleteUserButton.addEventListener('click', deleteUserById);\n    }\n    // Форма для позичання книги\n    if (borrowBookForm) {\n        borrowBookForm.addEventListener('submit', borrowBook);\n    }\n    // Форма для повернення книги\n    if (returnBookForm) {\n        returnBookForm.addEventListener('submit', returnBook);\n    }\n    loadData();\n}\n// Ініціалізація програми\nwindow.onload = init;\n\n\n//# sourceURL=webpack://tslab2/./src/app.ts?");

/***/ }),

/***/ "./src/models/book.ts":
/*!****************************!*\
  !*** ./src/models/book.ts ***!
  \****************************/
/***/ ((__unused_webpack_module, exports) => {

eval("\nObject.defineProperty(exports, \"__esModule\", ({ value: true }));\nexports.Book = void 0;\nvar Book = /** @class */ (function () {\n    function Book(id, title, author, year, isBorrowed) {\n        if (isBorrowed === void 0) { isBorrowed = false; }\n        this.id = id;\n        this.title = title;\n        this.author = author;\n        this.year = year;\n        this.isBorrowed = isBorrowed;\n    }\n    Book.prototype.borrow = function () {\n        if (!this.isBorrowed) {\n            this.isBorrowed = true;\n        }\n    };\n    Book.prototype.returnBook = function () {\n        if (this.isBorrowed) {\n            this.isBorrowed = false;\n        }\n    };\n    //Реалізувати класи та інтерфейси для книг. Додайте методи для доступу до властивостей книги.\n    Book.prototype.getBookInfo = function () {\n        console.log(\"ID: \".concat(this.id));\n        console.log(\"Title: \".concat(this.title));\n        console.log(\"Author: \".concat(this.author));\n        console.log(\"Year: \".concat(this.year));\n        console.log(\"Status: \".concat(this.isBorrowed ? 'Borrowed' : 'Available'));\n    };\n    return Book;\n}());\nexports.Book = Book;\n\n\n//# sourceURL=webpack://tslab2/./src/models/book.ts?");

/***/ }),

/***/ "./src/models/library.ts":
/*!*******************************!*\
  !*** ./src/models/library.ts ***!
  \*******************************/
/***/ ((__unused_webpack_module, exports) => {

eval("\nObject.defineProperty(exports, \"__esModule\", ({ value: true }));\nexports.Library = void 0;\nvar Library = /** @class */ (function () {\n    function Library() {\n        this.items = [];\n    }\n    Library.prototype.add = function (item) {\n        this.items.push(item);\n    };\n    Library.prototype.remove = function (item) {\n        this.items = this.items.filter(function (i) { return i !== item; });\n    };\n    Library.prototype.findById = function (id, callback) {\n        return this.items.find(callback);\n    };\n    Library.prototype.getAll = function () {\n        return this.items;\n    };\n    return Library;\n}());\nexports.Library = Library;\n\n\n//# sourceURL=webpack://tslab2/./src/models/library.ts?");

/***/ }),

/***/ "./src/models/storage.ts":
/*!*******************************!*\
  !*** ./src/models/storage.ts ***!
  \*******************************/
/***/ ((__unused_webpack_module, exports) => {

eval("\nObject.defineProperty(exports, \"__esModule\", ({ value: true }));\nexports.Storage = void 0;\nvar Storage = /** @class */ (function () {\n    function Storage() {\n    }\n    Storage.save = function (key, data) {\n        localStorage.setItem(key, JSON.stringify(data));\n    };\n    Storage.load = function (key) {\n        var data = localStorage.getItem(key);\n        return data ? JSON.parse(data) : null;\n    };\n    Storage.remove = function (key) {\n        localStorage.removeItem(key);\n    };\n    Storage.clear = function () {\n        localStorage.clear();\n    };\n    return Storage;\n}());\nexports.Storage = Storage;\n\n\n//# sourceURL=webpack://tslab2/./src/models/storage.ts?");

/***/ }),

/***/ "./src/models/user.ts":
/*!****************************!*\
  !*** ./src/models/user.ts ***!
  \****************************/
/***/ ((__unused_webpack_module, exports) => {

eval("\nObject.defineProperty(exports, \"__esModule\", ({ value: true }));\nexports.User = void 0;\nvar User = /** @class */ (function () {\n    function User(id, name) {\n        this.id = id;\n        this.name = name;\n        this.borrowedBooks = [];\n    }\n    User.prototype.borrowBook = function (bookId) {\n        if (this.borrowedBooks.length < 3) {\n            this.borrowedBooks.push(bookId);\n            return true;\n        }\n        return false;\n    };\n    User.prototype.returnBook = function (bookId) {\n        this.borrowedBooks = this.borrowedBooks.filter(function (id) { return id !== bookId; });\n    };\n    // Метод для повернення книги\n    User.prototype.returnBookById = function (bookId, library) {\n        if (this.borrowedBooks.includes(bookId)) {\n            this.returnBook(bookId);\n            var book = library.findById(bookId, function (item) { return item.id === bookId; });\n            if (book) {\n                book.returnBook();\n                return true;\n            }\n        }\n        return false;\n    };\n    // Новий метод для виведення інформації про користувача\n    User.prototype.getUserInfo = function () {\n        console.log(\"ID \\u043A\\u043E\\u0440\\u0438\\u0441\\u0442\\u0443\\u0432\\u0430\\u0447\\u0430: \".concat(this.id));\n        console.log(\"\\u0406\\u043C'\\u044F \\u043A\\u043E\\u0440\\u0438\\u0441\\u0442\\u0443\\u0432\\u0430\\u0447\\u0430: \".concat(this.name));\n        console.log(\"\\u041F\\u043E\\u0437\\u0438\\u0447\\u0435\\u043D\\u0456 \\u043A\\u043D\\u0438\\u0433\\u0438 (ID): \".concat(this.borrowedBooks.length ? this.borrowedBooks.join(', ') : 'Немає позичених книг'));\n    };\n    return User;\n}());\nexports.User = User;\n\n\n//# sourceURL=webpack://tslab2/./src/models/user.ts?");

/***/ }),

/***/ "./src/services/notification.ts":
/*!**************************************!*\
  !*** ./src/services/notification.ts ***!
  \**************************************/
/***/ ((__unused_webpack_module, exports) => {

eval("\nObject.defineProperty(exports, \"__esModule\", ({ value: true }));\nexports.NotificationService = void 0;\nvar NotificationService = /** @class */ (function () {\n    function NotificationService() {\n    }\n    NotificationService.notify = function (message, type) {\n        if (type === void 0) { type = 'info'; }\n        if (type === 'error') {\n            alert(\"Error: \".concat(message));\n        }\n        else {\n            alert(message);\n        }\n    };\n    return NotificationService;\n}());\nexports.NotificationService = NotificationService;\n\n\n//# sourceURL=webpack://tslab2/./src/services/notification.ts?");

/***/ }),

/***/ "./src/utils/validation.ts":
/*!*********************************!*\
  !*** ./src/utils/validation.ts ***!
  \*********************************/
/***/ ((__unused_webpack_module, exports) => {

eval("\nObject.defineProperty(exports, \"__esModule\", ({ value: true }));\nexports.Validation = void 0;\nvar Validation = /** @class */ (function () {\n    function Validation() {\n    }\n    Validation.isNumber = function (value) {\n        return /^[0-9]+$/.test(value);\n    };\n    Validation.isValidYear = function (year) {\n        return /^[0-9]{4}$/.test(year);\n    };\n    return Validation;\n}());\nexports.Validation = Validation;\n\n\n//# sourceURL=webpack://tslab2/./src/utils/validation.ts?");

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module can't be inlined because the eval devtool is used.
/******/ 	var __webpack_exports__ = __webpack_require__("./src/app.ts");
/******/ 	
/******/ })()
;