export class OrderBookOrder {
    constructor(public price: number, public quantity: number, public action: string, public account: string,
        public id: number, public created: string) {
    }
}