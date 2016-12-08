import { NgModule } from '@angular/core';

import { OrderEntryComponent } from './order-entry.component';
import { OrderEntryService } from "./order-entry.service";

@NgModule({
    declarations: [OrderEntryComponent],
    providers: [OrderEntryService]
})
export class OrderEntryModule {}
