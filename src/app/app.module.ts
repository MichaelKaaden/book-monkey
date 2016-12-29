import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpModule } from '@angular/http';

import { AppComponent } from './app.component';
import { BookStoreService } from './shared/book-store.service';
import { HomeComponent } from './home/home.component';
import { AppRoutingModule } from './app-routing.module';
import { BookModule } from './book/book.module';
import { AdminModule } from './admin/admin.module';

@NgModule({
    declarations: [
        AppComponent,
        HomeComponent,
    ],
    imports: [
        BrowserModule,
        AppRoutingModule,
        HttpModule,
        BookModule,
        AdminModule
    ],
    providers: [
        BookStoreService
    ],
    bootstrap: [
        AppComponent
    ]
})
export class AppModule {
}
