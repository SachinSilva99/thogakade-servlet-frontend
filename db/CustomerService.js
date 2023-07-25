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
                await this.api.existsByPk('customer', pk);
                return true; // Return true if the save operation is successful
            } catch (error) {
                console.error('Failed to save customer. Error:', error);
                return false; // Return false if there is an error during the save operation
            }



    }
}