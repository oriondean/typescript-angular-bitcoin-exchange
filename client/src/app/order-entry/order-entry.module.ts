import { NgModule } from '@angular/core';

import { OrderEntryComponent } from './order-entry.component';
import { OrderEntryService } from "./order-entry.service";
import { FormsModule } from '@angular/forms';

@NgModule({
    imports: [FormsModule],
    declarations: [OrderEntryComponent],
    exports: [OrderEntryComponent],
    providers: [OrderEntryService]
})
export class OrderEntryModule {}
