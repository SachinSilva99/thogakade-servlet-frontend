import {Item} from "../model/Item.js";
import {API} from "./API.js";

export default class OrderService {
    constructor() {
        this.api = new API();
    }

    async getAllItems() {
        try {
            const data = await this.api.getAll('order');
            console.log('Data retrieved successfully:', data)
            return data.map(order => new Item(order.orderId, order.date, order.customerId));
        } catch (error) {
            console.error('Failed to retrieve data. Error:', error);
            return [];
        }
    }

    async generateOrderId() {
        return await this.api.get('order', 'orderId');
    }

    async placeOrder(placeOrder) {
        await this.api.save('order', JSON.stringify(placeOrder)).then(r => r);
    }
}