import { Injectable } from '@angular/core';
import { SocketService } from '../socket.service';
import { AccountService } from '../account.service';
import { OrderBookOrder } from './order-book-order';
import { Subject } from 'rxjs/Subject';
import * as _ from 'underscore';
import { ISocketUpdate } from '../ISocketUpdate';

const UPDATES = {
    REFRESH: 'initial',
    ADD_ORDER: 'added',
    CHANGE_ORDER: 'changed',
    REMOVE_ORDER: 'removed'
};

interface OrderBook {
    [id: number]: OrderBookOrder
}

@Injectable()
export class OrderBookService {

    public orders: OrderBook = {};

    private subject: Subject<OrderBook> = new Subject<OrderBook>();

    constructor(private socketService: SocketService, private accountService: AccountService) {
        this.socketService.emit('private-order-book', this.accountService.account)
            .on<OrderBookOrder | OrderBookOrder[]>('private-order-book')
            .subscribe((update) => this.handleUpdate(update));

        this.accountService.subscribe(() => {
            this.orders = [];
            this.socketService.emit('private-order-book', this.accountService.account); // subscribe
        })
    }

    private handleUpdate(update: ISocketUpdate<OrderBookOrder | OrderBookOrder[]>) {
        if (update.type === UPDATES.REFRESH) {
            const data: OrderBookOrder[] = <OrderBookOrder[]> update.data;

            this.orders = data.reduce((map, order) => {
                map[order.id] = order;
                return map;
            }, {});
        } else {
            const data: OrderBookOrder = <OrderBookOrder> update.data;

            if (update.type === UPDATES.ADD_ORDER) {
                this.orders[data.id] = data;
            } else if (update.type === UPDATES.CHANGE_ORDER) {
                this.orders[data.id] = data;
            } else if (update.type === UPDATES.REMOVE_ORDER) {
                delete this.orders[data.id];
            }
        }

        this.subject.next(_.values(this.orders));
    }

    subscribe(callback: (orders: OrderBookOrder[]) => any) {
        return this.subject.subscribe({ next: callback });
    }
}