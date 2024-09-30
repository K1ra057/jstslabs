import { Library } from '../src/models/library';
import { Book } from '../src/models/book';
import * as assert from 'assert';

describe('Library', () => {
    let library: Library<Book>;
    let book1: Book;
    let book2: Book;
    
    beforeEach(() => {
        library = new Library<Book>();
        book1 = new Book(1, 'Book1', 'Author1', 2022, true);
        book2 = new Book(2, 'Book2', 'Author1', 2022, true);
    });

    it('should return the list of books', () => {
        library.add(book1);
        assert.equal(library.getAll().length, 1);
    });

    it('should add a book to the library', () => {
        library.add(book1);
        assert.deepEqual(library.getAll().find(book => book.title === 'Book1'), book1);
    });

    it('should remove a book from the library', () => {
        library.add(book1);
        library.remove(book1);
        assert.equal(library.getAll().findIndex(book => book.title === 'Book1'), -1);
    });

    it('should find a book by ID', () => {
        library.add(book1);
        const foundBook = library.findById(1, book => (book as any).id === 1);
        assert.deepEqual(foundBook, book1);
    });

    it('should return undefined if book not found by ID', () => {
        const foundBook = library.findById(999, book => (book as any).id === 999);
        assert.equal(foundBook, undefined);
    });
});
