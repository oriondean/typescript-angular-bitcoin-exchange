import { Injectable } from '@angular/core';
import { SocketService, OrderBookUpdate } from '../socket.service';
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

@Injectable()
export class OrderBookService {

    public orders: { [id: number] : OrderBookOrder } = {};

    private subject: Rx.Subject<{}> = new Rx.Subject();

    constructor(private socketService: SocketService, private accountService: AccountService) {
        this.socketService.on('private-order-book').subscribe((update: OrderBookUpdate) => {
            if (update.updateType === UPDATES.REFRESH) {
                this.orders = update.data.reduce((map, order) => {
                    map[order.id] = order;
                    return map;
                }, {});
            } else if (update.updateType === UPDATES.ADD_ORDER) {
                this.orders[update.data.id] = update.data;
            } else if (update.updateType === UPDATES.CHANGE_ORDER) {
                this.orders[update.data.id] = update.data;
            } else if (update.updateType === UPDATES.REMOVE_ORDER) {
                delete this.orders[update.data.id];
            }
            
            this.subject.next(_.values(this.orders));
        });

        this.socketService.emit(NAMESPACE, this.accountService.account); // subscribe

        this.accountService.subscribe(() => {
            this.orders = [];
            this.socketService.emit(NAMESPACE, this.accountService.account); // subscribe
        })
    }



    subscribe(callback: (orders: OrderBookOrder[]) => any) {
        return this.subject.subscribe({ next: callback });
    }
}