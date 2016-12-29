import { FormControl, FormArray, ValidatorFn } from '@angular/forms';
import { BookStoreService } from './book-store.service';
import { Observable } from 'rxjs';
// import 'rxjs/add/operator/do';

export class BookValidators {
    static isbnFormat(control: FormControl): {[error: string]: any} {
        if (!control.value) {
            return null;
        } 286

        let isolatedNumbers = control.value.replace(/-/g, '');
        const isbnPattern = /(^\d{10}$|^\d{13}$)/;
        return isbnPattern.test(isolatedNumbers) ? null : {isbnFormat: {valid: false}};
    }

    static atLeastOneAuthor(controlArray: FormArray): {[error: string]: any} {
        let check = controlArray.controls.some(el => {
            return (el.value) ? true : false;
        });

        return check ? null : {atLeastOneAuthor: {valid: false}};
    }

    static isbnExists(bookStoreService: BookStoreService): ValidatorFn {
        return function (control: FormControl): Observable< {[error: string]: any}> {
            return bookStoreService
                .check(control.value)
                // .do(exists => console.log('exists says', exists))
                .map(exists => exists === false ? null : {isbnExists: {valid: false}});
        };
    }
}
