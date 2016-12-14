import { Component } from '@angular/core';
import { OrderEntryOrder } from './order-entry-order';
import {OrderEntryService} from "./order-entry.service";
import {AccountService} from "../account.service";

@Component({
    selector: 'order-entry',
    styleUrls: ['./order-entry.css'],
    templateUrl: './order-entry.html',
    providers: [OrderEntryService, AccountService]
})
export class OrderEntryComponent {
    private model: OrderEntryOrder = new OrderEntryOrder(0, 0, 'bid', this.accountService.account);

    constructor(private orderEntryService: OrderEntryService, private accountService: AccountService) {
    }

    placeBid() {
        this.model.action = 'bid';
        this.orderEntryService.placeOrder(this.model);
    }

    placeAsk() {
        this.model.action = 'ask';
        this.orderEntryService.placeOrder(this.model);
    }
}
