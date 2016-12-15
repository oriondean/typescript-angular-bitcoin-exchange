import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TradeHistoryComponent } from './trade-history.component';
import { TradeHistoryService } from './trade-history.service';

@NgModule({
    imports: [CommonModule],
    declarations: [TradeHistoryComponent],
    exports: [TradeHistoryComponent],
    providers: [TradeHistoryService]
})
export class TradeHistoryModule {}
