import {orderDetails, orders} from "../db/DB.js";

export class OrderController {

    constructor() {
        this.orders = orders;
        this.orderDetails = orderDetails;
        $('select#orderId').change(this.loadOrders.bind(this));
        $('.nav-link').click(this.loadOrdersIfAvailable.bind(this));

    }

    loadOrders(e) {
        this.orders = orders;
        this.orderDetails = orderDetails;
        const orderId = $(e.target).children("option:selected").val();
        if (orderId) {
            const ods = this.orderDetails.filter(o => o._orderId === orderId);
            const order = this.orders.find(o => o._id === orderId);
            const customer = order.customer;
            $('#customer_id_o').val(customer.id);
            $('#customer_name_o').val(customer.name);
            $('#customer_address_o').val(customer.address);
            let tr = ``;
            ods.forEach(od => {
                tr += `
                <tr>
                    <td>${od._orderId}</td>
                    <td>${od._itemDes}</td>
                    <td>${od._itemPrice}</td>
                    <td>${od._qty}</td>
                    <td>${order._date}</td>
                </tr>
            `;
            });
            $('#ordersTbody').html(tr);
        }
    }

    loadOrdersIfAvailable() {
        $('#ordersTbody').html(``);
        $('#customer_id_o').val('');
        $('#customer_name_o').val('');
        $('#customer_address_o').val('');
        this.orders = orders;
        $('#orderId').empty();
        $('#orderId').append(`<option value='Select an order'>Select an order</option>`);
        //load order ids
        this.orders.map(od => {
            $('#orderId').append(`<option value=${od._id}>${od._id}</option>`);
        });
    }
}

new OrderController();