import { Injectable } from '@angular/core';
import { SocketService } from '../socket.service';
import * as Rx from 'rxjs';
import { OrderDepthOrder } from './order-depth-order';
import { ISocketUpdate } from '../ISocketUpdate';

const UPDATES = {
    REFRESH: 'initial',
    ADD_ORDER: 'new',
    CHANGE_ORDER: 'change',
    REMOVE_ORDER: 'removal'
};

export interface OrderDepth {
    [tier: string]: number
}

interface OrderDepths {
    bid: OrderDepth;
    ask: OrderDepth;
}

@Injectable()
export class OrderDepthService {

    private depth: OrderDepths = { bid: {}, ask: {} };

    private bidSubject: Rx.Subject<OrderDepth> = new Rx.Subject<OrderDepth>();
    private askSubject: Rx.Subject<OrderDepth> = new Rx.Subject<OrderDepth>();

    constructor(private socketService: SocketService) {
        this.socketService.emit('aggregated-order-book')
            .on<OrderDepthOrder>('aggregated-order-book').subscribe((update) => this.handleUpdate(update));
    }

    private handleUpdate(update: ISocketUpdate<OrderDepthOrder>) {
        const data = update.data;
        const key = data && data.price != null ? data.price.toString() : null;

        if (update.type === UPDATES.REFRESH) {
            this.depth[update.orderAction] = data;
        } else if (update.type === UPDATES.ADD_ORDER) {
            this.depth[update.orderAction][key] = data.quantity;
        } else if (update.type === UPDATES.CHANGE_ORDER) {
            this.depth[update.orderAction][key] = data.quantity;
        } else if (update.type === UPDATES.REMOVE_ORDER) {
            delete this.depth[update.orderAction][key];
        }

        update.orderAction === 'bid' ? this.bidSubject.next(this.depth.bid) : this.askSubject.next(this.depth.ask);
    }

    subscribe(side: string, callback: (value: OrderDepth) => void) {
        return side === 'bid' ? this.bidSubject.subscribe(callback) : this.askSubject.subscribe(callback);
    }
}