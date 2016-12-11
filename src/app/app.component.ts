import { Component } from '@angular/core';

import { Book } from './shared/book';

@Component({
    selector: 'bm-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.css']
})
export class AppComponent {
    book: Book;
    detailsOn: boolean = false;
    listOn: boolean = true;

    showDetails(book: Book) {
        this.book = book;
        this.listOn = false;
        this.detailsOn = true;
    }

    showList() {
        this.listOn = true;
        this.detailsOn = false;
    }
}
