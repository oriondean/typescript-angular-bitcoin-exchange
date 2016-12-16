import { Component, ElementRef } from '@angular/core';
import * as d3 from 'd3';
import * as fc from 'd3fc';
import * as _ from 'underscore';

import {OrderDepthService, OrderDepths, OrderDepth} from '../order-depth/order-depth.service';
import {OrderDepthOrder} from '../order-depth/order-depth-order';

@Component({
    selector: 'order-depth-chart',
    styleUrls: ['./order-depth-chart.css'],
    templateUrl: './order-depth-chart.html'
})
export class OrderDepthChartComponent {

    // TODO: D3FC typings
    private chart: any;

    constructor(private elementRef: ElementRef, private orderDepthService: OrderDepthService) {
    }

    ngOnInit() {
        // create a series and associate it with the plot area
        const bidLine = fc.series.area()
            .xValue(d => d.price)
            .yValue(d => d.quantity)
            .interpolate('step-after')
            .decorate(selection => selection.attr('class', 'area bid-depth'));

        const askLine = fc.series.area()
            .xValue(d => d.price)
            .yValue(d => d.quantity)
            .interpolate('step-before')
            .decorate(selection => selection.attr('class', 'area ask-depth'));

        const multi = fc.series.multi()
            .series([bidLine, askLine])
            .mapping(function(series) {
                switch(series) {
                    case bidLine: return this[0];
                    case askLine: return this[1];
                }
            });

        this.chart = fc.chart.cartesian(d3.scale.linear(), d3.scale.linear())
            .plotArea(multi);

        this.orderDepthService.subscribe((depth: OrderDepths) => this.handleDepthUpdate(depth));
    }

    private handleDepthUpdate(depth: OrderDepths) {
        const cumulativeBidDepth = OrderDepthChartComponent.sumBidDepth(depth.bid);
        const cumulativeAskDepth = OrderDepthChartComponent.sumAskDepth(depth.ask);
        const data: OrderDepthOrder[] = cumulativeAskDepth.concat(cumulativeBidDepth);

        this.chart.xDomain(fc.util.extent().fields(['price'])(data))
            .yDomain([0, d3.max(data, tier => tier.quantity) + 5]);

        d3.select(this.elementRef.nativeElement.querySelector('.order-depth-chart'))
            .datum([cumulativeBidDepth, cumulativeAskDepth])
            .call(this.chart);
    }

    private static sumBidDepth(depth: OrderDepth): OrderDepthOrder[] {
        const bidDepth = OrderDepthChartComponent.cumulativelySum(depth);

        if(bidDepth.length > 0) {
            bidDepth.push({ price: bidDepth[bidDepth.length - 1].price + 5, quantity: bidDepth[bidDepth.length - 1].quantity });
        }

        return bidDepth;
    }

    private static sumAskDepth(depth: OrderDepth): OrderDepthOrder[] {
        const askDepth = OrderDepthChartComponent.cumulativelySum(depth, true)
            .reverse(); // reverse back into ascending order

        if(askDepth.length > 0) { // pad depth by hardcoded amount
            askDepth.unshift({ price: askDepth[0].price - 5, quantity: askDepth[0].quantity });
        }

        return askDepth;
    }

    private static cumulativelySum(depth: OrderDepth, sumDescending: boolean = false): OrderDepthOrder[] {
        const sortedKeys: string[] = _.keys(depth)
            .sort((a, b) => {
                const result = parseFloat(a[0]) - parseFloat(b[0]);
                return sumDescending ? -result : result
            });

        return _.reduce(sortedKeys, (summedDepth: OrderDepthOrder[], key: string) => {
            const previousQuantity: number = _.last(summedDepth) && _.last(summedDepth).quantity ||  0;
            summedDepth.push({ price: Number(key), quantity: depth[key] + previousQuantity });
            return summedDepth;
        }, []);
    }
}