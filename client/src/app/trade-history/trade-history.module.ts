import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TradeHistoryComponent } from './trade-history.component';

@NgModule({
    imports: [CommonModule],
    declarations: [TradeHistoryComponent],
    exports: [TradeHistoryComponent],
    providers: []
})
export class TradeHistoryModule {}
