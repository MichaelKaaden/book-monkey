import { Injectable } from '@angular/core';
import { Http, Headers } from '@angular/http';

import { Book } from './book';
import { Observable } from 'rxjs';
import 'rxjs/add/operator/map';

@Injectable()
export class BookStoreService {
    private api: string = 'http://localhost:3000';
    // private api: string = 'https://book-monkey2-api.angular-buch.com';
    private headers: Headers = new Headers();

    constructor(private http: Http) {
        this.headers.append('Content-Type', 'application/json');
    }

    /**
     * Returns all books.
     * @returns {Book[]}
     */
    getAll(): Observable<Book[]> {
        return this.http
            .get(`${this.api}/books`)
            .map(response => response.json());
    }

    /**
     * Returns the book that has the ISBN.
     * @param isbn ISBN
     * @returns {undefined|Book}
     */
    getSingle(isbn: string): Observable<Book> {
        return this.http
            .get(`${this.api}/book/${isbn}`)
            .map(response => response.json());
    }

    /**
     * Creates a new book.
     * @param book The book
     * @returns {Observable<Response>}
     */
    create(book: Book): Observable<any> {
        return this.http
            .post(`${this.api}/book`,
                JSON.stringify(book),
                {
                    headers: this.headers
                });
    }

    /**
     * Updates a book.
     * @param book The book
     * @returns {Observable<Response>}
     */
    update(book: Book): Observable<any> {
        return this.http
            .put(`${this.api}/book/${book.isbn}`,
                JSON.stringify(book),
                {
                    headers: this.headers
                });
    }

    /**
     * Removes a book.
     * @param book The book
     * @returns {Observable<Response>}
     */
    remove(book: Book): Observable<any> {
        return this.http
            .delete(`${this.api}/book/${book.isbn}`);
    }
}
