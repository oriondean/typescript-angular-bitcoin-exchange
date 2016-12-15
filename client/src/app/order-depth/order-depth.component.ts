import { Component, Input } from '@angular/core';
import { OrderDepthOrder } from "./order-depth-order";

@Component({
    selector: 'order-depth',
    styleUrls: ['./order-depth.css'],
    templateUrl: './order-depth.html'
})
export class OrderDepthComponent {
    @Input() private side: string;
    private isBid: boolean;

    private orders: OrderDepthOrder[] = [
        new OrderDepthOrder(15, 10),
        new OrderDepthOrder(16, 10),
        new OrderDepthOrder(17, 10)
    ];

    constructor() {
    }

    ngOnInit() {
        this.isBid = this.side === 'bid';
    }
}