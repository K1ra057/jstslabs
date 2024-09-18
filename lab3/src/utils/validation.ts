export class Validation {
    static isNumber(value: string): boolean {
        return /^[0-9]+$/.test(value);
    }

    static isValidYear(year: string): boolean {
        const currentYear = new Date().getFullYear();
        const yearNumber = parseInt(year);
        return /^[0-9]{4}$/.test(year) && yearNumber <= currentYear;
    }

    static canUserBorrowMoreBooks(borrowedBooksCount: number, maxBooks: number): boolean {
        return borrowedBooksCount < maxBooks;
    }

    static isValidEmail(email: string): boolean {
        const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
        return emailPattern.test(email);
    }
}
