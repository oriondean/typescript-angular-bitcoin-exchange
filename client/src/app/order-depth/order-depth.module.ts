import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { OrderDepthComponent } from './order-depth.component';
import { OrderDepthService } from './order-depth.service';

@NgModule({
    imports: [CommonModule],
    declarations: [OrderDepthComponent],
    exports: [OrderDepthComponent],
    providers: [OrderDepthService]
})
export class OrderDepthModule {}
