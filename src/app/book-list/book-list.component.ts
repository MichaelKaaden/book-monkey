import { Component, OnInit } from '@angular/core';

import { Book } from '../shared/book';
import { BookStoreService } from '../shared/book-store.service';
import { Observable } from 'rxjs';

@Component({
    selector: 'bm-book-list',
    templateUrl: './book-list.component.html'
})
export class BookListComponent implements OnInit {
    booksObservable: Observable<Book[]>;

    constructor(private bookStoreService: BookStoreService) {
    }

    ngOnInit() {
        this.booksObservable = this.bookStoreService.getAll();
    }
}
