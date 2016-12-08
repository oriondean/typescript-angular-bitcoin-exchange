import * as io from 'socket.io-client';
import {Injectable} from "@angular/core";

@Injectable()
export class SocketService {
    public socket: SocketIOClient.Socket;

    constructor() {
        this.socket = io.connect('http://localhost:8081', {transports: ['websocket']});
    }
}
