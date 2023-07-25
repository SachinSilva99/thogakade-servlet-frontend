import {Item} from "../model/Item.js";
import {Customer} from "../model/Customer.js";

const items = [];
const customers = [];
const orderDetails = [];
const orders = [];
items.push(new Item("P001","Red Rice",1000,100));
items.push(new Item("P002","White Rice",1500,100));
customers.push(new Customer("C001","Sachin","Beruwala"));
export {items, customers, orders, orderDetails}
