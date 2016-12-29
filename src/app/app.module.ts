import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

import { AppComponent } from './app.component';
import { BookListComponent } from './book-list/book-list.component';
import { BookListItemComponent } from './book-list-item/book-list-item.component';
import { BookDetailsComponent } from './book-details/book-details.component';
import { BookStoreService } from './shared/book-store.service';
import { HomeComponent } from './home/home.component';
import { AppRoutingModule } from './app-routing.module';
import { BookFormComponent } from './book-form/book-form.component';
import { DateValueAccessorModule } from 'angular-date-value-accessor';
import { IsbnPipe } from './shared/isbn.pipe';
import { ZoomDirective } from './shared/zoom.directive';

@NgModule({
    declarations: [
        AppComponent,
        BookListComponent,
        BookListItemComponent,
        BookDetailsComponent,
        HomeComponent,
        BookFormComponent,
        IsbnPipe,
        ZoomDirective
    ],
    imports: [
        BrowserModule,
        AppRoutingModule,
        ReactiveFormsModule,
        HttpModule,
        DateValueAccessorModule
    ],
    providers: [BookStoreService],
    bootstrap: [AppComponent]
})
export class AppModule {
}
