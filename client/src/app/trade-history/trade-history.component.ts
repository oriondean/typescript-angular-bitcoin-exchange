import { Component } from '@angular/core';
import { Trade } from './trade';
import { TradeHistoryService } from './trade-history.service';

@Component({
    selector: 'trade-history',
    styleUrls: ['./trade-history.css'],
    templateUrl: './trade-history.html'
})
export class TradeHistoryComponent {
    private trades: Trade[] = [];

    constructor(tradeHistoryService: TradeHistoryService) {
        tradeHistoryService.subscribe((trades: Trade[]) => this.trades = trades);
    }
}