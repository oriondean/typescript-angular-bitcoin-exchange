import { Component, Input } from '@angular/core';
import { OrderBookOrder } from './order-book-order';

@Component({
    selector: 'order-book-item',
    styleUrls: ['./order-book-item.css'],
    templateUrl: './order-book-item.html'
})
export class OrderBookItemComponent {
    @Input() private order: OrderBookOrder;

    constructor() {

    }
}