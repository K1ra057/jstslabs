
export class Library<T> {
    private items: T[] = [];

    add(item: T): void {
        this.items.push(item);
    }

    remove(item: T): void {
        this.items = this.items.filter(i => i !== item);
    }

    findById(id: number, callback: (item: T) => boolean): T | undefined {
        return this.items.find(callback);
    }

    getAll(): T[] {
        return this.items;
    }
}
