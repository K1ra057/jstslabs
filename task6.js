// Клас Book, який імплементує LibraryItem
var Book = /** @class */ (function () {
    function Book(title, author, pages) {
        this.borrowed = false;
        this.title = title;
        this.author = author;
        this.pages = pages;
    }
    // Метод borrow для позичання книги
    Book.prototype.borrow = function () {
        if (!this.borrowed) {
            this.borrowed = true;
            console.log("\u041A\u043D\u0438\u0433\u0430 \"".concat(this.title, "\" \u043F\u043E\u0437\u0438\u0447\u0435\u043D\u0430."));
        }
        else {
            console.log("\u041A\u043D\u0438\u0433\u0430 \"".concat(this.title, "\" \u0432\u0436\u0435 \u043F\u043E\u0437\u0438\u0447\u0435\u043D\u0430."));
        }
    };
    return Book;
}());
// Клас Magazine, який імплементує LibraryItem
var Magazine = /** @class */ (function () {
    function Magazine(title, author, issueNumber) {
        this.borrowed = false;
        this.title = title;
        this.author = author;
        this.issueNumber = issueNumber;
    }
    // Метод borrow для позичання журналу
    Magazine.prototype.borrow = function () {
        if (!this.borrowed) {
            this.borrowed = true;
            console.log("\u0416\u0443\u0440\u043D\u0430\u043B \"".concat(this.title, "\" (\u0432\u0438\u043F\u0443\u0441\u043A ").concat(this.issueNumber, ") \u043F\u043E\u0437\u0438\u0447\u0435\u043D\u0438\u0439."));
        }
        else {
            console.log("\u0416\u0443\u0440\u043D\u0430\u043B \"".concat(this.title, "\" (\u0432\u0438\u043F\u0443\u0441\u043A ").concat(this.issueNumber, ") \u0432\u0436\u0435 \u043F\u043E\u0437\u0438\u0447\u0435\u043D\u0438\u0439."));
        }
    };
    return Magazine;
}());
// Клас DVD, який імплементує LibraryItem
var DVD = /** @class */ (function () {
    function DVD(title, author, duration) {
        this.borrowed = false;
        this.title = title;
        this.author = author;
        this.duration = duration;
    }
    // Метод borrow для позичання DVD
    DVD.prototype.borrow = function () {
        if (!this.borrowed) {
            this.borrowed = true;
            console.log("DVD \"".concat(this.title, "\" \u043F\u043E\u0437\u0438\u0447\u0435\u043D\u0438\u0439."));
        }
        else {
            console.log("DVD \"".concat(this.title, "\" \u0432\u0436\u0435 \u043F\u043E\u0437\u0438\u0447\u0435\u043D\u0438\u0439."));
        }
    };
    return DVD;
}());
// Клас Library для керування бібліотекою
var Library = /** @class */ (function () {
    function Library() {
        this.items = [];
    }
    // Метод для додавання елемента до бібліотеки
    Library.prototype.addItem = function (item) {
        this.items.push(item);
        console.log("\u0415\u043B\u0435\u043C\u0435\u043D\u0442 \"".concat(item.title, "\" \u0434\u043E\u0434\u0430\u043D\u0438\u0439 \u0434\u043E \u0431\u0456\u0431\u043B\u0456\u043E\u0442\u0435\u043A\u0438."));
    };
    // Метод для пошуку елемента за назвою
    Library.prototype.findItemByName = function (name) {
        return this.items.find(function (item) { return item.title === name; });
    };
    // Метод для виведення доступних (непозичених) елементів
    Library.prototype.listAvailableItems = function () {
        console.log('Доступні елементи бібліотеки:');
        this.items.forEach(function (item) {
            if (!item.borrowed) {
                console.log("\u041D\u0430\u0437\u0432\u0430: ".concat(item.title, ", \u0410\u0432\u0442\u043E\u0440: ").concat(item.author));
            }
        });
    };
    return Library;
}());
// Демонстрація роботи бібліотеки
// Створення бібліотеки
var library = new Library();
// Створення книг, журналів та DVD
var book1 = new Book('To Kill a Mockingbird', 'Harper Lee', 281);
var book2 = new Book('1984', 'George Orwell', 328);
var magazine1 = new Magazine('National Geographic', 'NatGeo', 202);
var dvd1 = new DVD('Inception', 'Christopher Nolan', 148);
// Додавання елементів до бібліотеки
library.addItem(book1);
library.addItem(book2);
library.addItem(magazine1);
library.addItem(dvd1);
// Позичання деяких елементів
book1.borrow();
dvd1.borrow();
// Пошук елемента за назвою
var foundItem = library.findItemByName('Inception');
if (foundItem) {
    console.log("\u0417\u043D\u0430\u0439\u0434\u0435\u043D\u0438\u0439 \u0435\u043B\u0435\u043C\u0435\u043D\u0442: ".concat(foundItem.title, ", \u0410\u0432\u0442\u043E\u0440: ").concat(foundItem.author));
}
// Виведення доступних елементів
library.listAvailableItems();
