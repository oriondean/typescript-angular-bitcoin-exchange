export class OrderEntryOrder {
    constructor(public price: number, public quantity: number, public action: string, public account?: string) {
    }
}