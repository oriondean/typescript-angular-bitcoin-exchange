import {Injectable} from "@angular/core";
import {SocketService} from "../socket.service";
import {OrderEntryOrder} from "./order-entry-order";

@Injectable()
export class OrderEntryService {
    constructor(private socketService: SocketService) {

    }

    placeOrder(order: OrderEntryOrder) {
        this.socketService.emit('order', order);
    }
}