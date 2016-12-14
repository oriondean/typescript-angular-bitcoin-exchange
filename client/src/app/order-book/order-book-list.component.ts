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
    private orders: OrderBookOrder[] = [
        new OrderBookOrder(10, 15, 'bid', 'dkerr', 1, '24 minutes ago'),
        new OrderBookOrder(25, 16, 'ask', 'dkerr', 2, '25 minutes ago')
    ];

    constructor(private orderBookService: OrderBookService) {
        console.log('orders: ', orderBookService.orders);
    }

    trackByFn(index: number, item: OrderBookOrder) {
        return item.id;
    }
}