export class OrderItemTm {
    constructor(code, des, price, qty) {
        this._code = code;
        this._des = des;
        this._price = price;
        this._qty_need = qty;
    }

    get code() {
        return this._code;
    }

    set code(value) {
        this._code = value;
    }

    get des() {
        return this._des;
    }

    set des(value) {
        this._des = value;
    }

    get price() {
        return this._price;
    }

    set price(value) {
        this._price = value;
    }

    get qty_need() {
        return this._qty_need;
    }

    set qty_need(value) {
        this._qty_need = value;
    }
}