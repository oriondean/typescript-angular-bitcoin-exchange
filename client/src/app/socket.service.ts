import * as io from 'socket.io-client';
import {Injectable} from "@angular/core";
import * as Rx from 'rxjs';

export interface OrderBookUpdate {
    updateType: string;
    data: any;
}

@Injectable()
export class SocketService {
    private socket: SocketIOClient.Socket;

    constructor() {
        this.socket = io.connect('http://localhost:8081', {transports: ['websocket']});
    }

    emit(subject: string, payload: any) {
        this.socket.emit(subject, payload);
    }

    on(subject: string) {
        return Rx.Observable.create((observer: Rx.Observer<OrderBookUpdate>) => {
            this.socket.on(subject, (updateType: string, data: any) => observer.next({ updateType, data }));
        });
    }
}
