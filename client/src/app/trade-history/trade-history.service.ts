import { Injectable } from '@angular/core';
import { SocketService } from '../socket.service';
import { Trade } from './trade';
import { Subject } from 'rxjs/Subject';
import { ISocketUpdate } from '../ISocketUpdate';

const UPDATES = {
    REFRESH: 'initial',
    ADD_TRADE: 'new'
};

@Injectable()
export class TradeHistoryService {

    private tradeHistory: Trade[] = [];

    private subject: Subject<Trade[]> = new Subject<Trade[]>();

    constructor(private socketService: SocketService) {
        this.socketService.emit('trade-history')
            .on('trade-history').subscribe((update: ISocketUpdate<Trade | Trade[]>) => this.handleUpdate(update));
    }

    handleUpdate(update: ISocketUpdate<Trade | Trade[]>) {
        if (update.type === UPDATES.REFRESH) {
            this.tradeHistory = <Trade[]> update.data;
        } else if (update.type === UPDATES.ADD_TRADE) {
            this.tradeHistory.unshift(<Trade> update.data);
        }

        this.subject.next(this.tradeHistory);
    }

    subscribe(callback: (trades: Trade[]) => any) {
        return this.subject.subscribe({ next: callback });
    }
}