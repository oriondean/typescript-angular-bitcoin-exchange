import {Injectable} from "@angular/core";
import {SocketService} from "../socket.service";
import {AccountService} from "../account.service";
import {OrderBookOrder} from "./order-book-order";

const UPDATES = {
    REFRESH: 'ORDER_BOOK_REFRESH',
    ADD_ORDER: 'ORDER_BOOK_ADD_ORDER',
    CHANGE_ORDER: 'ORDER_BOOK_CHANGE_ORDER',
    REMOVE_ORDER: 'ORDER_BOOK_REMOVE_ORDER'
};

@Injectable()
export class OrderBookService {

    public orders: { [id: number] : OrderBookOrder } = {};

    constructor(private socketService: SocketService, private accountService: AccountService) {
        this.socketService.socket.emit('private-order-book', this.accountService.account); // subscribe

        this.socketService.socket.on('private-order-book', (updateType: string, data: any) => {
            console.log('order book update', updateType, data);
            if (updateType === UPDATES.REFRESH) {
                this.orders = data.reduce((map, order) => {
                    map[order.id] = order;
                    return map;
                }, {});
            } else if (updateType === UPDATES.ADD_ORDER) {
                this.orders[data.id] = data;
            } else if (updateType === UPDATES.CHANGE_ORDER) {
                this.orders[data.id] = data;
            } else if (updateType === UPDATES.REMOVE_ORDER) {
                delete this.orders[data.id];
            }
        });
    }
}