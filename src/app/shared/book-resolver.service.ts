import { Injectable } from '@angular/core';
import { BookStoreService } from './book-store.service';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs';

import { Book } from './book';

@Injectable()
export class BookResolver implements Resolve<Book> {
    constructor(private bookStoreService: BookStoreService) {
    }

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<Book>|Promise<Book>|Book {
        return this.bookStoreService.getSingle(route.params['isbn']);
    }
}
