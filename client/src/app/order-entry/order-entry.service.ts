import {Injectable} from "@angular/core";
import {SocketService} from "../socket.service";
import {Order} from "./order";

@Injectable()
export class OrderEntryService {
    constructor(private socketService: SocketService) {

    }

    placeOrder(order: Order) {
        this.socketService.socket.emit('order', order);
    }
}