import * as io from 'socket.io-client';
import {Injectable} from "@angular/core";
import * as Rx from 'rxjs';

@Injectable()
export class SocketService {
    private socket: SocketIOClient.Socket;

    constructor() {
        this.socket = io.connect('http://localhost:8081', {transports: ['websocket']});
    }

    emit(subject: string, payload?: any) {
        this.socket.emit(subject, payload);
        return this;
    }

    on(subject: string) {
        return Rx.Observable.create((observer: Rx.Observer<{}>) => {
            this.socket.on(subject, function(updateType: string, orderAction: string, data: any) {
                if (arguments.length === 2) {
                    observer.next({ updateType, data: orderAction })
                } else {
                    observer.next({ updateType, data, orderAction });
                }
            });
        });
    }
}
