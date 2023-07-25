export class OrderDetail{
    constructor(orderId, itemCode, itemDes, qty, itemPrice) {
        this._orderId = orderId;
        this._itemCode = itemCode;
        this._itemDes = itemDes;
        this._qty = qty;
        this._itemPrice = itemPrice;
    }

    get itemPrice() {
        return this._itemPrice;
    }

    set itemPrice(value) {
        this._itemPrice = value;
    }

    get orderId() {
        return this._orderId;
    }

    set orderId(value) {
        this._orderId = value;
    }

    get itemCode() {
        return this._itemCode;
    }

    set itemCode(value) {
        this._itemCode = value;
    }

    get itemDes() {
        return this._itemDes;
    }

    set itemDes(value) {
        this._itemDes = value;
    }

    get qty() {
        return this._qty;
    }

    set qty(value) {
        this._qty = value;
    }

    get order() {
        return this._order;
    }

    set order(value) {
        this._order = value;
    }
}