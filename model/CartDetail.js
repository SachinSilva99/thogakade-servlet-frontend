export default class CartDetail {
    constructor(orderId, code, qty, description, unitPrice, qtyOnHand, itemDTO) {
        this._orderId = orderId;
        this._code = code;
        this._qty = qty;
        this._description = description;
        this._unitPrice = unitPrice;
        this._qtyOnHand = qtyOnHand;
        this._itemDTO = itemDTO;
    }

    // Getters
    get orderId() {
        return this._orderId;
    }

    get code() {
        return this._code;
    }

    get qty() {
        return this._qty;
    }

    get description() {
        return this._description;
    }

    get unitPrice() {
        return this._unitPrice;
    }

    get qtyOnHand() {
        return this._qtyOnHand;
    }

    get itemDTO() {
        return this._itemDTO;
    }

    // Setters (optional, can be omitted if you don't need them)

    set orderId(orderId) {
        this._orderId = orderId;
    }

    set code(code) {
        this._code = code;
    }

    set qty(qty) {
        this._qty = qty;
    }

    set description(description) {
        this._description = description;
    }

    set unitPrice(unitPrice) {
        this._unitPrice = unitPrice;
    }

    set qtyOnHand(qtyOnHand) {
        this._qtyOnHand = qtyOnHand;
    }

    set itemDTO(itemDTO) {
        this._itemDTO = itemDTO;
    }
    toJSON() {
        return {
            orderId: this._orderId,
            code: this._code,
            qty: this._qty,
            description: this._description,
            unitPrice: this._unitPrice,
            qtyOnHand: this._qtyOnHand,
            itemDTO: this._itemDTO
        };
    }
}
