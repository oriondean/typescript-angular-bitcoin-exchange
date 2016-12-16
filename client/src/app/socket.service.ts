import * as io from 'socket.io-client';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { ISocketUpdate } from './ISocketUpdate';
import { Observer } from 'rxjs/Observer';

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

    on<T>(subject: string) {
        return Observable.create((observer: Observer<ISocketUpdate<T>>) => {
            this.socket.on(subject, function(type: string, orderAction: any, data: T) {
                if (arguments.length === 2) {
                    observer.next({ type, data: orderAction })
                } else {
                    observer.next({ type, data, orderAction });
                }
            });
        });
    }
}
