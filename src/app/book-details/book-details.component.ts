import { Component, EventEmitter, Output, OnInit } from '@angular/core';

import { Book } from '../shared/book';
import { BookStoreService } from '../shared/book-store.service';
import { ActivatedRoute } from '@angular/router';

@Component({
    selector: 'bm-book-details',
    templateUrl: './book-details.component.html'
})
export class BookDetailsComponent implements OnInit {
    book: Book;
    @Output() showListEvent = new EventEmitter<any>();

    constructor(private bookStoreService: BookStoreService,
                private route: ActivatedRoute) {
    }

    ngOnInit() {
        let params = this.route.snapshot.params;
        this.book = this.bookStoreService.getSingle(params['isbn']);
    }

    getRating(num: number) {
        return new Array(num);
    }

    showBookList(): void {
        this.showListEvent.emit();
    }
}
