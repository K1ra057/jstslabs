export class Validation {
    static isNumber(value: string): boolean {
        return /^[0-9]+$/.test(value);
    }

    static isValidYear(year: string): boolean {
        return /^[0-9]{4}$/.test(year);
    }
}
