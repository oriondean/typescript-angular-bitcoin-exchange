import { Component } from '@angular/core';
import { AccountService } from '../account.service';

@Component({
    selector: 'account-selector',
    styleUrls: ['./account-selector.css'],
    templateUrl: './account-selector.html'
})
export class AccountSelectorComponent {
    private accounts: string[] = [];

    constructor(private accountService: AccountService) {
        this.accounts = accountService.accounts;
    }

    onChange(account: string) {
        this.accountService.changeAccount(account);
    }
}