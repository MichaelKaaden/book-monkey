import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormGroup, FormArray, FormBuilder, Validators } from '@angular/forms';

import { Book } from '../../shared/book';
import { BookFactory } from '../../shared/book-factory';
import { BookFormErrorMessages } from './book-form-error-messages';
import { BookStoreService } from '../../shared/book-store.service';
import { BookValidators } from '../shared/book.validators';

@Component({
    selector: 'bm-book-form',
    templateUrl: './book-form.component.html',
})
export class BookFormComponent implements OnInit {
    book: Book;
    errors = {};
    isUpdatingBook: boolean = false;
    myForm: FormGroup;
    authors: FormArray;
    thumbnails: FormArray;

    constructor(private bookStoreService: BookStoreService,
                private formBuilder: FormBuilder,
                private route: ActivatedRoute,
                private router: Router) {
        this.book = BookFactory.empty();
    }

    ngOnInit() {
        let isbn = this.route.snapshot.params['isbn'];
        if (isbn) {
            this.isUpdatingBook = true;
            this.bookStoreService.getSingle(isbn)
                .subscribe(book => {
                    this.book = book;
                    this.initBook();
                });
        }
        this.initBook();
    }

    addAuthorControl() {
        this.authors.push(this.formBuilder.control(null));
    }

    addThumbnailControl() {
        this.thumbnails.push(this.formBuilder.group({
            url: null,
            title: null
        }));
    }

    submitForm() {
        // filter empty values
        this.myForm.value.authors = this.myForm.value.authors.filter(author => author);
        this.myForm.value.thumbnails = this.myForm.value.thumbnails.filter(thumbnail => thumbnail.url);

        // create a book from the form properly
        // hey! das sollten wir auch so machen! @danny, @ferdi
        let book: Book = BookFactory.fromObject(this.myForm.value);

        if (this.isUpdatingBook) {
            this.bookStoreService.update(book)
                .subscribe(res => res);
            this.router.navigate(
                [
                    '../../books',
                    book.isbn
                ], {
                    relativeTo: this.route
                }
            );
        } else {
            this.bookStoreService.create(book)
                .subscribe(res => res);
            this.myForm.reset();
            this.book = BookFactory.empty();
            this.initBook();  // else the date will be "tt.mm.jjjj"
        }
    }

    private initBook() {

        this.buildAuthorsArray();
        this.buildThumbnailsArray();

        this.myForm = this.formBuilder.group({
            title: [
                this.book.title,
                Validators.required
            ],
            subtitle: [
                this.book.subtitle
            ],
            isbn: [
                this.book.isbn, [
                    Validators.required,
                    BookValidators.isbnFormat
                ],
                this.isUpdatingBook ? null : BookValidators.isbnExists(this.bookStoreService)
            ],
            description: [
                this.book.description
            ],
            authors: this.authors,
            thumbnails: this.thumbnails,
            published: [
                this.book.published
            ]
        });
        this.myForm.statusChanges.subscribe(() => this.updateErrorMessages());
    }

    private buildAuthorsArray() {
        this.authors = this.formBuilder.array(this.book.authors, BookValidators.atLeastOneAuthor);
    }

    private buildThumbnailsArray() {
        this.thumbnails = this.formBuilder.array(
            this.book.thumbnails.map(thumbnail =>
                this.formBuilder.group({
                    url: this.formBuilder.control(thumbnail.url),
                    title: this.formBuilder.control(thumbnail.title)
                })
            )
        );
    }

    private updateErrorMessages() {
        this.errors = {};
        for (let message of BookFormErrorMessages) {
            let control = this.myForm.get(message.forControl);
            if (control &&
                control.dirty &&
                control.invalid &&
                control.errors[message.forValidator] && !this.errors[message.forControl]) {
                this.errors[message.forControl] = message.text;
            }
        }
    }
}
