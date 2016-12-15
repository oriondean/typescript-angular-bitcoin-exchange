import { Injectable } from '@angular/core';
import { SocketService } from '../socket.service';
import { Trade } from './trade';
import * as Rx from 'rxjs';

const UPDATES = {
    REFRESH: 'initial',
    ADD_TRADE: 'new'
};

export interface TradeHistoryUpdate {
    updateType: string;
    data: Trade | Trade[];
}

@Injectable()
export class TradeHistoryService {

    private tradeHistory: Trade[] = [];

    private subject: Rx.Subject<Trade[]> = new Rx.Subject<Trade[]>();

    constructor(private socketService: SocketService) {
        this.socketService.emit('trade-history')
            .on('trade-history').subscribe((update: TradeHistoryUpdate) => this.handleUpdate(update));
    }

    handleUpdate(update: TradeHistoryUpdate) {
        if (update.updateType === UPDATES.REFRESH) {
            this.tradeHistory = <Trade[]>update.data;
        } else if (update.updateType === UPDATES.ADD_TRADE) {
            this.tradeHistory.unshift(<Trade>update.data);
        }

        this.subject.next(this.tradeHistory);
    }

    subscribe(callback: (trades: Trade[]) => any) {
        return this.subject.subscribe({ next: callback });
    }
}