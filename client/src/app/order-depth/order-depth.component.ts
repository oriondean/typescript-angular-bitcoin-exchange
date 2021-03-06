import { Component, Input } from '@angular/core';
import { OrderDepthOrder } from './order-depth-order';
import { OrderDepthService, OrderDepth } from './order-depth.service';
import * as _ from 'underscore';

@Component({
    selector: 'order-depth',
    styleUrls: ['./order-depth.css'],
    templateUrl: './order-depth.html'
})
export class OrderDepthComponent {
    @Input() private side: string;
    private isBid: boolean;

    private orders: OrderDepthOrder[] = [];

    constructor(private orderDepthService: OrderDepthService) {
    }

    ngOnInit() {
        this.isBid = this.side === 'bid';

        if (this.isBid) {
            this.orderDepthService.subscribeBid((depth: OrderDepth) => this.handleDepthUpdate(depth));
        } else {
            this.orderDepthService.subscribeAsk((depth: OrderDepth) => this.handleDepthUpdate(depth));
        }
    }

    private handleDepthUpdate(depth: OrderDepth) {
        this.orders = _.map(depth, (value: number, key: string) => ({ price: Number(key), quantity: value }));
    }
}