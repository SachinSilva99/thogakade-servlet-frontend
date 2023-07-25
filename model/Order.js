export class Order {
    constructor(id,date,customer) {
        this._id = id;
        this._date = date;
        this._customer = customer;
    }

    get id() {
        return this._id;
    }

    set id(value) {
        this._id = value;
    }

    get date() {
        return this._date;
    }

    set date(value) {
        this._date = value;
    }

    get customer() {
        return this._customer;
    }

    set customer(value) {
        this._customer = value;
    }
}