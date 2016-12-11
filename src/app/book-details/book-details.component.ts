import { Component, EventEmitter, Input, Output } from '@angular/core';

import { Book } from '../shared/book';

@Component({
    selector: 'bm-book-details',
    templateUrl: './book-details.component.html'
})
export class BookDetailsComponent {
    @Input() book: Book;
    @Output() showListEvent = new EventEmitter<any>();

    getRating(num: number) {
        return new Array(num);
    }

    showBookList(): void {
        this.showListEvent.emit();
    }
}
