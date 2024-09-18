export class Validation {
    static isNumber(value: string): boolean {
        return /^[0-9]+$/.test(value);
    }

    static isValidYear(year: string): boolean {
        const currentYear = new Date().getFullYear();
        const yearNumber = parseInt(year);

        // Перевіряємо, чи рік є чотиризначним числом і не перевищує поточний рік
        return /^[0-9]{4}$/.test(year) && yearNumber <= currentYear;
    }

    static canUserBorrowMoreBooks(borrowedBooksCount: number, maxBooks: number): boolean {
        return borrowedBooksCount < maxBooks;
    }
}
