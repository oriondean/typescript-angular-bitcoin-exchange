import { Component } from '@angular/core';
import {Trade} from "./trade";

@Component({
    selector: 'trade-history',
    styleUrls: ['./trade-history.css'],
    templateUrl: './trade-history.html'
})
export class TradeHistoryComponent {
    private trades: Trade[] = [
        new Trade(15, 10, 'bid', '15 mins ago'),
        new Trade(16, 11, 'bid', 'one year ago'),
        new Trade(17, 12, 'ask', '30 mins ago'),
    ];

    constructor() {
    }
}