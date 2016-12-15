import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import {AccountSelectorComponent} from "./account-selector.component";

@NgModule({
    imports: [CommonModule],
    declarations: [AccountSelectorComponent],
    exports: [AccountSelectorComponent]
})
export class AccountSelectorModule {}
