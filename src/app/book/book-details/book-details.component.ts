import { Component, OnInit } from '@angular/core';

import { Book } from '../../shared/book';
import { BookStoreService } from '../../shared/book-store.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
    selector: 'bm-book-details',
    templateUrl: './book-details.component.html'
})
export class BookDetailsComponent implements OnInit {
    book: Book;

    constructor(private bookStoreService: BookStoreService,
                private route: ActivatedRoute,
                private router: Router) {
    }

    ngOnInit() {
        // this is done via BookResolver now

        // this.book = BookFactory.empty();
        // let params = this.route.snapshot.params;
        // this.bookStoreService.getSingle(params['isbn'])
        //     .subscribe(book => this.book = book);

        this.book = this.route.snapshot.data['book'];
    }

    getRating(num: number) {
        return new Array(num);
    }

    removeBook() {
        if (confirm('Buch wirklich löschen?')) {
            this.bookStoreService.remove(this.book)
                .subscribe(res => this.router.navigate(['../'],
                    {
                        relativeTo: this.route
                    }));
        }
    }
}
