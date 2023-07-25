import {API} from "./API.js";
import {Item} from "../model/Item.js";

export default class ItemService{
    constructor() {
        this.api = new API();
    }

    async getAllItems() {
        try {
            const data = await this.api.getAll('item');
            console.log('Data retrieved successfully:', data);
            return data.map(item => new Item(item.code, item.description, item.unitPrice, item.qtyOnHand));
        } catch (error) {
            console.error('Failed to retrieve data. Error:', error);
            return [];
        }
    }

    async itemExists(pk) {
        try {
            return await this.api.existsByPk('item', 'code', pk);
        } catch (error) {
            console.error('Failed to check if item exists. Error:', error);
        }
    }

    async save(item) {
        await this.api.save('item', JSON.stringify(item)).then(r => r);
    }

    async delete(code) {
        await this.api.delete('item', 'code', code)
            .then(r=>r)
            .catch(e=>{
                throw new Error("in Use");
            });
    }

    async update(item) {
        await this.api.update('item', JSON.stringify(item));
    }
}