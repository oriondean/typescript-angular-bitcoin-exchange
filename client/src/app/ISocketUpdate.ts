export interface ISocketUpdate<T> {
    type: string;
    data: T;
    orderAction?: string;
}