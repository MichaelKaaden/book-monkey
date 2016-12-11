import { Component, EventEmitter, OnInit, Output } from '@angular/core';

import { Book, Thumbnail } from '../shared/book';

@Component({
    selector: 'bm-book-list',
    templateUrl: './book-list.component.html'
})
export class BookListComponent implements OnInit {
    books: Book[];
    @Output() showDetailsEvent = new EventEmitter<Book>();

    ngOnInit() {
        this.books = [
            new Book(
                '9783864903571',
                'Angular',
                ['Johannes Hoppe', 'Danny Koppenhagen', 'Ferdinand Malcher', 'Gregor Woiwode'],
                new Date(2016, 5, 26),
                'Einstieg in die komponentenbasierte Entwicklung von Web- und Mobile-Anwendungen',
                5,
                [new Thumbnail('https://angular-buch.com/angular-buch.jpg', 'Buchcover')],
                'Dieses Buch vermittelt einen Schnelleinstieg in Angular  ...'
            ),
            new Book(
                '9783864901546',
                'AngularJS',
                ['Philipp Tarasiewicz', 'Robin Böhm'],
                new Date(2014, 5, 29),
                'Eine praktische Einführung',
                5,
                [new Thumbnail('https://goo.gl/Y5lFVE', 'Buchcover')],
                'Dieses Buch führt Sie anhand eines zusammenhängenden Beispielprojekts ...'
            )
        ];
    }

    showDetails(book): void {
        this.showDetailsEvent.emit(book);
    }
}
