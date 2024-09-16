
export interface IBook {
    id: number;
    title: string;
    author: string;
    year: number;
    isBorrowed: boolean;
}

export class Book implements IBook {
    constructor(
        public id: number,
        public title: string,
        public author: string,
        public year: number,
        public isBorrowed: boolean = false
    ) {}

    borrow(): void {
        if (!this.isBorrowed) {
            this.isBorrowed = true;
        }
    }

    returnBook(): void {
        if (this.isBorrowed) {
            this.isBorrowed = false;
        }
    }
    //Реалізувати класи та інтерфейси для книг. Додайте методи для доступу до властивостей книги.
    getBookInfo(): void {
        console.log(`ID: ${this.id}`);
        console.log(`Title: ${this.title}`);
        console.log(`Author: ${this.author}`);
        console.log(`Year: ${this.year}`);
        console.log(`Status: ${this.isBorrowed ? 'Borrowed' : 'Available'}`);
    }
}
