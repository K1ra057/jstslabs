// Інтерфейс LibraryItem
interface LibraryItem {
    title: string;
    author: string;
    borrowed: boolean;
  
    // Метод для позначення елементу як позиченого
    borrow(): void;
  }
  
  // Клас Book, який імплементує LibraryItem
  class Book implements LibraryItem {
    title: string;
    author: string;
    pages: number;
    borrowed: boolean = false;
  
    constructor(title: string, author: string, pages: number) {
      this.title = title;
      this.author = author;
      this.pages = pages;
    }
  
    // Метод borrow для позичання книги
    borrow(): void {
      if (!this.borrowed) {
        this.borrowed = true;
        console.log(`Книга "${this.title}" позичена.`);
      } else {
        console.log(`Книга "${this.title}" вже позичена.`);
      }
    }
  }
  
  // Клас Magazine, який імплементує LibraryItem
  class Magazine implements LibraryItem {
    title: string;
    author: string;
    issueNumber: number;
    borrowed: boolean = false;
  
    constructor(title: string, author: string, issueNumber: number) {
      this.title = title;
      this.author = author;
      this.issueNumber = issueNumber;
    }
  
    // Метод borrow для позичання журналу
    borrow(): void {
      if (!this.borrowed) {
        this.borrowed = true;
        console.log(`Журнал "${this.title}" (випуск ${this.issueNumber}) позичений.`);
      } else {
        console.log(`Журнал "${this.title}" (випуск ${this.issueNumber}) вже позичений.`);
      }
    }
  }
  
  // Клас DVD, який імплементує LibraryItem
  class DVD implements LibraryItem {
    title: string;
    author: string;
    duration: number; // тривалість у хвилинах
    borrowed: boolean = false;
  
    constructor(title: string, author: string, duration: number) {
      this.title = title;
      this.author = author;
      this.duration = duration;
    }
  
    // Метод borrow для позичання DVD
    borrow(): void {
      if (!this.borrowed) {
        this.borrowed = true;
        console.log(`DVD "${this.title}" позичений.`);
      } else {
        console.log(`DVD "${this.title}" вже позичений.`);
      }
    }
  }
  
  // Клас Library для керування бібліотекою
  class Library {
    private items: LibraryItem[] = [];
  
    // Метод для додавання елемента до бібліотеки
    addItem(item: LibraryItem): void {
      this.items.push(item);
      console.log(`Елемент "${item.title}" доданий до бібліотеки.`);
    }
  
    // Метод для пошуку елемента за назвою
    findItemByName(name: string): LibraryItem | undefined {
      return this.items.find(item => item.title === name);
    }
  
    // Метод для виведення доступних (непозичених) елементів
    listAvailableItems(): void {
      console.log('Доступні елементи бібліотеки:');
      this.items.forEach(item => {
        if (!item.borrowed) {
          console.log(`Назва: ${item.title}, Автор: ${item.author}`);
        }
      });
    }
  }
  
  // Демонстрація роботи бібліотеки
  
  // Створення бібліотеки
  const library = new Library();
  
  // Створення книг, журналів та DVD
  const book1 = new Book('To Kill a Mockingbird', 'Harper Lee', 281);
  const book2 = new Book('1984', 'George Orwell', 328);
  const magazine1 = new Magazine('National Geographic', 'NatGeo', 202);
  const dvd1 = new DVD('Inception', 'Christopher Nolan', 148);
  
  // Додавання елементів до бібліотеки
  library.addItem(book1);
  library.addItem(book2);
  library.addItem(magazine1);
  library.addItem(dvd1);
  
  // Позичання деяких елементів
  book1.borrow();
  dvd1.borrow();
  
  // Пошук елемента за назвою
  const foundItem = library.findItemByName('Inception');
  if (foundItem) {
    console.log(`Знайдений елемент: ${foundItem.title}, Автор: ${foundItem.author}`);
  }
  
  // Виведення доступних елементів
  library.listAvailableItems();
  