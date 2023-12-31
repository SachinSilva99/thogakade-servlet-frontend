import OrderService from "../db/OrderService.js";
import {CustomerService} from "../db/CustomerService.js";

export class OrderController {

    constructor() {
        this.orderService = new OrderService();
        this.orders = this.orderService.getAllItems();
        this.customerService = new CustomerService();
        this.customers = [];
        this.orderDetails = this.orderService.getAllOrderDetails();
        $('select#orderId').change(this.loadOrders.bind(this));
        $('.nav-link').click(this.loadOrdersIfAvailable.bind(this));
    }

    async loadOrders(e) {
        this.orders = await this.orderService.getAllItems();
        this.orderDetails = await this.orderService.getAllOrderDetails();
        const customers = await this.customerService.getAllCustomers();
        const orderId = $(e.target).children("option:selected").val();
        if (orderId) {
            const ods = this.orderDetails.filter(o => o.orderId === orderId);
            const order = this.orders.find(o => o.id === orderId);
            const customerId = order.customer;
            const customer = customers.find(customer => customer.id === customerId);

            $('#customer_id_o').val(customer.id);
            $('#customer_name_o').val(customer.name);
            $('#customer_address_o').val(customer.address);
            let tr = ``;
            ods.forEach(od => {
                tr += `
                <tr>
                    <td>${od.orderId}</td>
                    <td>${od.itemDes}</td>
                    <td>${od.itemPrice}</td>
                    <td>${od.qty}</td>
                    <td>${order.date}</td>
                </tr>
            `;
            });
            $('#ordersTbody').html(tr);
        }
    }

    async loadOrdersIfAvailable() {
        $('#ordersTbody').html(``);
        $('#customer_id_o').val('');
        $('#customer_name_o').val('');
        $('#customer_address_o').val('');
        this.orders = await this.orderService.getAllItems();
        $('#orderId').empty();
        $('#orderId').append(`<option value='Select an order'>Select an order</option>`);
        //load order ids
        this.orders.map(od => {
            $('#orderId').append(`<option value=${od.id}>${od.id}</option>`);
        });
    }
}

new OrderController();