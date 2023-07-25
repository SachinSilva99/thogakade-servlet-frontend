import {API} from "./API.js";
import {Customer} from "../model/Customer.js";

export class CustomerService {
    constructor() {
        this.api = new API();
    }

    async getAllStudents() {
        try {
            const data = await this.api.getAll('customer');
            console.log('Data retrieved successfully:', data);
            return data.map(customer => new Customer(customer.id, customer.name, customer.address));
        } catch (error) {
            console.error('Failed to retrieve data. Error:', error);
            return [];
        }
    }

    async customerExists(pk) {
        try {
            return await this.api.existsByPk('customer', 'id', pk);
        } catch (error) {
            console.error('Failed to check if customer exists. Error:', error);
        }
    }

    async save(customer) {
        await this.api.save('customer', JSON.stringify(customer)).then(r => r);
    }

    async delete(customerId) {
        await this.api.delete('customer', 'id', customerId);
    }

    async update(customer) {
        await this.api.update('customer', JSON.stringify(customer));
    }
}