import { Injectable } from '@angular/core';
import { SocketService } from '../socket.service';
import { AccountService } from '../account.service';
import { OrderBookOrder } from './order-book-order';
import * as Rx from 'rxjs';
import * as _ from 'underscore';

const UPDATES = {
    REFRESH: 'initial',
    ADD_ORDER: 'added',
    CHANGE_ORDER: 'changed',
    REMOVE_ORDER: 'removed'
};

const NAMESPACE: string = 'private-order-book';

interface OrderBookUpdate {
    updateType: string;
    data: OrderBookOrder | OrderBookOrder[]
}

@Injectable()
export class OrderBookService {

    public orders: { [id: number] : OrderBookOrder } = {};

    private subject: Rx.Subject<{}> = new Rx.Subject();

    constructor(private socketService: SocketService, private accountService: AccountService) {
        this.socketService.on('private-order-book').subscribe((update) => this.handleUpdate(update));
        this.socketService.emit(NAMESPACE, this.accountService.account); // subscribe

        this.accountService.subscribe(() => {
            this.orders = [];
            this.socketService.emit(NAMESPACE, this.accountService.account); // subscribe
        })
    }

    private handleUpdate(update: OrderBookUpdate) {
        if (update.updateType === UPDATES.REFRESH) {
            const data: OrderBookOrder[] = <OrderBookOrder[]> update.data;
            this.orders = data.reduce((map, order) => {
                map[order.id] = order;
                return map;
            }, {});
        } else {
            const data: OrderBookOrder = <OrderBookOrder> update.data;

            if (update.updateType === UPDATES.ADD_ORDER) {
                this.orders[data.id] = data;
            } else if (update.updateType === UPDATES.CHANGE_ORDER) {
                this.orders[data.id] = data;
            } else if (update.updateType === UPDATES.REMOVE_ORDER) {
                delete this.orders[data.id];
            }
        }

        this.subject.next(_.values(this.orders));
    }

    subscribe(callback: (orders: OrderBookOrder[]) => any) {
        return this.subject.subscribe({ next: callback });
    }
}