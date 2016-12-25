import { Injectable } from '@angular/core';
import { Http, Headers } from '@angular/http';

import { Book } from './book';
import { BookFactory } from './book-factory';
import { Observable } from 'rxjs';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/retry';

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
            .retry(3)
            .map(response => response.json())
            .map(rawBooks => rawBooks
                .map(rawBook => BookFactory.fromObject(rawBook))
            );
    }

    /**
     * Returns the book that has the ISBN.
     * @param isbn ISBN
     * @returns {Book}
     */
    getSingle(isbn: string): Observable<Book> {
        return this.http
            .get(`${this.api}/book/${isbn}`)
            .retry(3)
            .map(response => response.json())
            .map(rawBook => BookFactory.fromObject(rawBook));
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
