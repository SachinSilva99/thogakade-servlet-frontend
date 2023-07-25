export class Customer{
    constructor(id, name, address) {
        this._id = id;
        this._name = name;
        this._address = address;
    }

    get id() {
        return this._id;
    }

    set id(value) {
        this._id = value;
    }

    get name() {
        return this._name;
    }

    set name(value) {
        this._name = value;
    }

    get address() {
        return this._address;
    }

    set address(value) {
        this._address = value;
    }
    toJSON() {
        return {
            id: this._id,
            name: this._name,
            address: this._address
        };
    }
}