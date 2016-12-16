import { Injectable } from '@angular/core';
import { Subject } from 'rxjs/Subject';

@Injectable()
export class AccountService {
    public accounts: string[] = ['dkerr', 'bgates', 'dtrump', 'ashearer', 'emusk', 'jmadden'];
    public account: string = this.accounts[0];

    private subject: Subject<{}> = new Subject();

    constructor() {
    }

    changeAccount(account: string) {
        if(!~this.accounts.indexOf(account)) {
            throw new Error('New account must be in existing list of accounts');
        }
        this.account = account;

        this.subject.next(account);
    }

    subscribe(callback: (account: string) => any) {
        return this.subject.subscribe({ next: callback });
    }
}
