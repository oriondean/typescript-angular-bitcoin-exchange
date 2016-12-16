import { NgModule } from '@angular/core';
import { OrderDepthChartComponent } from './order-depth-chart.component';
import { OrderDepthModule } from '../order-depth/order-depth.module';

@NgModule({
    imports: [OrderDepthModule],
    declarations: [OrderDepthChartComponent],
    exports: [OrderDepthChartComponent],
})
export class OrderDepthChartModule {}
