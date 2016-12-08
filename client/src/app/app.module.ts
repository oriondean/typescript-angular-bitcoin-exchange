import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { OrderEntryComponent } from './order-entry/order-entry.component';
import { SocketService } from "./socket.service";
import { AccountService } from "./account.service";

@NgModule({
    bootstrap: [AppComponent],
    declarations: [AppComponent, OrderEntryComponent],
    imports: [BrowserModule, FormsModule],
    providers: [SocketService, AccountService]
})
export class AppModule {}
