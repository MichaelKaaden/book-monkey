import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormGroup, FormArray, FormBuilder, Validators } from '@angular/forms';

import { Book } from '../shared/book';
import { BookFormErrorMessages } from './book-form-error-messages';
import { BookStoreService } from '../shared/book-store.service';
import { Thumbnail } from '../shared/thumbnail';

@Component({
    selector: 'bm-book-form',
    templateUrl: './book-form.component.html',
})
export class BookFormComponent implements OnInit {
    book: Book = Book.empty();
    errors = {};
    isUpdatingBook: boolean = false;
    myForm: FormGroup;
    authors: FormArray;
    thumbnails: FormArray;

    constructor(private bookStoreService: BookStoreService,
                private formBuilder: FormBuilder,
                private route: ActivatedRoute,
                private router: Router) {
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
        let book: Book = this.formValueToBook(this.myForm);

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
        }
    }

    private formValueToBook(formGroup: FormGroup): Book {
        let thumbnails: Thumbnail[] = [];
        formGroup.value.thumbnails.map(thumbnail =>
            thumbnails.push(new Thumbnail(thumbnail.url, thumbnail.title))
        );

        let book = new Book(
            formGroup.value.isbn,
            formGroup.value.title,
            formGroup.value.authors,
            formGroup.value.published,
            formGroup.value.subtitle,
            null,
            thumbnails,
            formGroup.value.description
        );

        return book;
    }

    private initBook() {
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
                    Validators.minLength(10),
                    Validators.maxLength(13)
                ]
            ],
            description: [
                this.book.description
            ],
            authors: this.buildAuthorsArray(),
            thumbnails: this.buildThumbnailsArray(),
            published: [
                new Date(this.book.published)
            ]
        });
        this.myForm.valueChanges.subscribe(() => this.updateErrorMessages());
    }

    private buildAuthorsArray(): FormArray {
        this.authors = this.formBuilder.array(this.book.authors, Validators.required);
        return this.authors;
    }

    private buildThumbnailsArray(): FormArray {
        this.thumbnails = this.formBuilder.array(
            this.book.thumbnails.map(thumbnail =>
                this.formBuilder.group({
                    url: this.formBuilder.control(thumbnail.url),
                    title: this.formBuilder.control(thumbnail.title)
                })
            )
        );
        return this.thumbnails;
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
