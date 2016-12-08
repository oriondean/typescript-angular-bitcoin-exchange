import {Injectable} from "@angular/core";

@Injectable()
export class AccountService {
    public account: string;

    constructor() {
        this.account = 'dkerr'; // TODO: unhardcode
    }
}
