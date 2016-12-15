import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {OrderDepthComponent} from "./order-depth.component";

@NgModule({
    imports: [CommonModule],
    declarations: [OrderDepthComponent],
    exports: [OrderDepthComponent]
})
export class OrderDepthModule {}
