import {Injectable} from "@angular/core";
import {SocketService} from "../socket.service";
import {OrderEntryOrder} from "./order-entry-order";
import {AccountService} from "../account.service";

@Injectable()
export class OrderEntryService {
    constructor(private socketService: SocketService, private accountService: AccountService) {

    }

    placeOrder(order: OrderEntryOrder) {
        order.account = this.accountService.account;
        this.socketService.emit('order', order);
    }
}