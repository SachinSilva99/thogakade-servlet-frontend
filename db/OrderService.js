import {Item} from "../model/Item.js";
import {API} from "./API.js";
import {Order} from "../model/Order.js";
import {OrderDetail} from "../model/OrderDetail.js";

export default class OrderService {
    constructor() {
        this.api = new API();
    }

    async getAllItems() {
        try {
            const data = await this.api.getAll('order');
            console.log('Data retrieved successfully:', data)
            return data.map(order => new Order(order.orderId, order.date, order.customerId));
        } catch (error) {
            console.error('Failed to retrieve data. Error:', error);
            return [];
        }
    }

    async generateOrderId() {
        return await this.api.get('order', 'lastOrder', 'true');
    }

    async placeOrder(placeOrder) {
        await this.api.save('order', JSON.stringify(placeOrder)).then(r => r);
    }

    async getAllOrderDetails() {
        try {
            const data = await this.api.getAll('order', 'includeDetails=true');
            console.log('Data retrieved successfully:', data);
            return data.map(order => new OrderDetail(order.orderId, order.itemCode, order.itemDes, order.qty, order.itemPrice).toJson());
        } catch (error) {
            console.error('Failed to retrieve data. Error:', error);
            return [];
        }
    }
}