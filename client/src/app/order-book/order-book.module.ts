import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from "@angular/forms";

import { OrderBookItemComponent } from "./order-book-item.component";
import { OrderBookService } from "./order-book.service";
import { OrderBookListComponent } from './order-book-list.component';



@NgModule({
    imports: [FormsModule, CommonModule],
    declarations: [OrderBookItemComponent, OrderBookListComponent],
    exports: [OrderBookListComponent],
    providers: [OrderBookService]
})
export class OrderBookModule {}
