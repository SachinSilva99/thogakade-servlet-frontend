export class Item{
    constructor(code, des, price, qty) {
        this._code = code;
        this._des = des;
        this._price = price;
        this._qty = qty;
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

    get qty() {
        return this._qty;
    }

    set qty(value) {
        this._qty = value;
    }
}