import { Component, OnInit } from '@angular/core';

import { Book } from '../shared/book';
import { BookStoreService } from '../shared/book-store.service';

@Component({
    selector: 'bm-book-list',
    templateUrl: './book-list.component.html'
})
export class BookListComponent implements OnInit {
    books: Book[];

    constructor(private bookStoreService: BookStoreService) {
    }

    ngOnInit() {
        this.books = this.bookStoreService.getAll();
    }
}
