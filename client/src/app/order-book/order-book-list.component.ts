import { Component } from '@angular/core';
import {OrderBookService} from "./order-book.service";
import {OrderBookOrder} from "./order-book-order";

@Component({
    selector: 'order-book-list',
    templateUrl: './order-book-list.html',
    styleUrls: ['./order-book-list.css'],
    providers: [OrderBookService]
})
export class OrderBookListComponent {
    private orders: OrderBookOrder[] = [];

    constructor(private orderBookService: OrderBookService) {
        orderBookService.subscribe((orders: OrderBookOrder[]) => this.orders = orders);
    }

    trackByFn(index: number, item: OrderBookOrder) {
        return item.id;
    }
}