import { Component } from '@angular/core';
import { Order } from './order';

@Component({
    selector: 'order-entry',
    styleUrls: ['order-entry.css'],
    templateUrl: './order-entry.html'
})
export class OrderEntryComponent {
    model = new Order(0, 0);
    invalid = true;

    placeBid() {
        console.log('place bid');
    }

    placeAsk() {
        console.log('place ask');
    }
}
