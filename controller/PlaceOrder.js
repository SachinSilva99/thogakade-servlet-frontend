import {OrderItemTm} from "../model/tm/OrderItemTm.js";
import {Customer} from "../model/Customer.js";
import OrderService from "../db/OrderService.js";
import {CustomerService} from "../db/CustomerService.js";
import ItemService from "../db/ItemService.js";
import CartDetail from "../model/CartDetail.js";

export class PlaceOrder {

    constructor() {
        this.itemService = new ItemService();

        this.customerService = new CustomerService();
        this.orderService = new OrderService();
        this.orders = this.orderService.getAllItems();
        console.log(this.orders)
        this.customers = this.customerService.getAllCustomers();
        this.items = this.itemService.getAllItems();
        this.orderItems = [];
        this.allFiledsValidated = false;
        this.validateCustomerDetails();
        this.getLastOrderId();

        $('.nav-link').click(this.loadCustomerItems.bind(this));

        $('select#customerIds').change(this.customerSelectOnChange.bind(this));
        $('select#itemCodes').change(this.itemSelectOnChange.bind(this));
        $('#place-order-tbl').on('click', 'button', this.optionButtonClick.bind(this));
        $('#add-item-to-cart').click(this.addItemToCart.bind(this));
        $('#place-orderbtn').click(this.placeOrderBtnOnClick.bind(this));
        $('.pCustomerFields').on('keyup', this.validateCustomerDetails.bind(this));
        $('#item_qty_need_p').on('keyup', this.validateQtyNeed.bind(this));
    }

    async loadCustomerItems() {
        await this.getLastOrderId();
        this.customers = await this.customerService.getAllCustomers();
        $('#customerIds').empty();
        $('#customerIds').append(`<option value="Select Customer">Select Customer</option>`);
        this.customers.map(c => {
            $('#customerIds').append(`<option value=${c.id}>${c.id}</option>`);
        });
        this.items = await this.itemService.getAllItems();
        $('#itemCodes').empty();
        $('#itemCodes').append(`<option value="Select Item">Select Item</option>`);
        this.items.map(i => {
            $('#itemCodes').append(`<option value=${i.code}>${i.code}</option>`);
        });
    }

    async getLastOrderId() {
        if (this.orders.length === 0) return 'D001';
        const lastOrderId = await this.orderService.generateOrderId();
        console.log(lastOrderId);
        const generatedOrderId = this.generateOrderId(lastOrderId);
        $('#orderIdLabel').text(generatedOrderId);
        return generatedOrderId;
    }

    customerSelectOnChange(e) {
        const customerId = $(e.target).children("option:selected").val();

        for (const customer of this.customers) {
            if (customerId === customer.id) {
                $('#customer_id_p').val(customer.id);
                $('#customer_name_p').val(customer.name);
                $('#customer_address_p').val(customer.address);
                this.validateCustomerDetails();
                return;
            }
        }
        this.validateCustomerDetails();
    }

    itemSelectOnChange(e) {
        const itemCode = $(e.target).children("option:selected").val();
        for (const item of this.items) {
            if (itemCode === item.code) {
                $('#item_code_p').val(item.code);
                $('#item_description_p').val(item.des);
                $('#item_price_p').val(item.price);
                $('#item_qty_p').val(item.qty);
                return;
            }
        }
    }

    optionButtonClick(e) {
        const buttonId = e.target.id;
        const itemCode = $(e.target).closest('tr').find('td').eq(0).text();
        this.orderItems.forEach(ot => {
            if (ot.code === itemCode) {
                let total = parseFloat($('.total').text());
                if (buttonId === 'reduceQty') {
                    if (ot.qty_need !== 0) {
                        ot.qty_need -= 1;
                        total -= parseFloat(ot.price);
                        $('.total').text(total);
                    }
                } else {
                    if (ot.qty_need < $('#item_qty_p').val()) {
                        ot.qty_need = parseInt(ot.qty_need) + 1;
                        total += parseFloat(ot.price);
                        $('.total').text(total);
                    }
                }
            }
        });
        this.loadOrderTbl();
    }

    loadOrderTbl() {
        let tr = ``;
        this.orderItems.map(ot => {
            tr += `
            <tr>
                <td>${ot.code}</td>
                <td>${ot.des}</td>
                <td>${ot.price}</td>
                <td>${ot.qty_need}</td>
                <td>
                    <button id="reduceQty" class="btn btn-danger">-</button>
                    <button id="increseQty" class="btn btn-success">+</button>
                </td>
            </tr>`;
        });
        $('#place-order-tbl').html(tr);
    }

    addItemToCart() {
        const itemCode = $('#item_code_p').val();
        const item_des = $('#item_description_p').val();
        const itemPrice = $('#item_price_p').val();
        const itemQtyNeeded = $('#item_qty_need_p').val();
        const qty = $('#item_qty_p').val();
        if (itemQtyNeeded === '' || itemQtyNeeded < 0) {
            $('#msg').text("QTY needed cannot be empty or negative");
            $('#alertInfo').text('Error : ');
            $('#alertModal').modal('show');
            return;
        }
        if (qty < parseInt(itemQtyNeeded)) {
            $('#msg').text("QTY need cannot exceed qty");
            $('#alertInfo').text('Error : ');
            $('#alertModal').modal('show');
            return;
        }

        const itemInTable = this.orderItems.some(ot => ot.code === itemCode);
        if (itemInTable) {
            this.orderItems.forEach(ot => {
                if (ot.code === itemCode) {
                    if (qty < (parseInt(ot.qty_need) + parseInt(itemQtyNeeded))) {
                        $('#msg').text("QTY need cannot exceed qty");
                        $('#alertInfo').text('Error : ');
                        $('#alertModal').modal('show');
                        return;
                    } else {
                        ot.qty_need = parseInt(ot.qty_need) + parseInt(itemQtyNeeded);
                        this.loadOrderTbl();
                    }
                }
            });
            return;
        }
        let total = parseFloat($('.total').text());
        total += parseInt(itemPrice) * parseInt(itemQtyNeeded);
        $('.total').text(total);
        const orderItem = new OrderItemTm(itemCode, item_des, itemPrice, itemQtyNeeded);
        this.orderItems.push(orderItem);
        this.loadOrderTbl();
    }

    placeOrderBtnOnClick() {
        let total = parseFloat($('.total').text());
        const orderId = $('.order-id').text();
        if ($('#cash').val() === '') {
            $('#msg').text("Cash cannot be empty");
            $('#alertInfo').text('Success');
            $('#alertModal').modal('show');
            return;
        }
        const cash = parseFloat($('#cash').val());
        if ($('#customer_id_p').val().length === 0 ||
            $('#customer_name_p').val().length === 0 ||
            $('#customer_address_p').val().length === 0) {
            $('#msg').text("Customer cannot be empty");
            $('#alertInfo').text('Error:');
            $('#alertModal').modal('show');
            return;
        }
        if (this.orderItems.length === 0) {
            $('#msg').text("Please add some items");
            $('#alertInfo').text('Error:');
            $('#alertModal').modal('show');
            return;
        }
        if (cash.length === 0) {
            $('#msg').text('Please input the cash amount');
            $('#alertInfo').text('Error:');
            $('#alertModal').modal('show');
            return;
        }
        if (cash < total) {
            $('#msg').text("Cash isn't enough");
            $('#alertInfo').text('Error:');
            $('#alertModal').modal('show');
            return;
        }
        let discount = $('#discount').val();
        if (!/^([0-9]|[1-9][0-9]|100)$/.test(discount)) {
            $('#msg').text("Discount is invalid");
            $('#alertInfo').text('Error:');
            $('#alertModal').modal('show');
            return;
        }
        if (!this.allFiledsValidated) {
            $('#msg').text("Fields are invalid");
            $('#alertInfo').text('Error:');
            $('#alertModal').modal('show');
            return;
        }
        const discountAmount = (discount / 100) * total;
        total -= discountAmount;

        const customerId = $('#customer_id_p').val()
        const customerName = $('#customer_name_p').val()
        const customerAddress = $('#customer_address_p').val();
        const customer = new Customer(customerId, customerName, customerAddress).toJSON();
        const cartDetails = this.orderItems
            .map(ot =>
                new CartDetail(orderId,
                    ot.code,
                    ot.qty_need,
                    ot.des,
                    ot.price,
                    this.getQtyByCode(ot.code),
                    this.items.find(item => item.code === ot.code))
            );
        const placeOrder = {
            customerDto: customer,
            orderId: orderId,
            cartDetailDTOS: cartDetails
        };
        this.orderService.placeOrder(placeOrder);
        this.orderItems = [];
        this.loadOrderTbl();
        const balance = cash - total;
        $('#msg').text(`Order Placed Successfully Customer Balance is  ${balance}`);
        $('#alertInfo').text('Success');
        $('#alertModal').modal('show');
        const currentOrderId = $('#orderIdLabel').text();
        let nextOrderId = this.generateOrderId(currentOrderId);
        $('#orderIdLabel').text(nextOrderId);
        this.loadCustomerItems();
        this.clearFields();
    }

    getQtyByCode(code) {
        const foundItem = this.items.find(item => item.code === code);
        return foundItem ? foundItem.qty : null;
    }

    clearFields() {
        $('#item_code_p').val('');
        $('#item_description_p').val('');
        $('#item_price_p').val('');
        $('#item_qty_need_p').val('');
        $('#item_qty_p').val('');
        $('#customer_id_p').val('');
        $('#customer_name_p').val('');
        $('#customer_address_p').val('');
        $('#itemCodes').val('');
        $('#customerIds').val('');
        $('.total').text('0');
        $('#cash').val('');
    }


    validateQtyNeed() {
        const qtyNeeded = $('#item_qty_need_p').val();
        const qtyRegex = /^[1-9]\d*$/
        $('#item_qty_need_p').css('border', 'none');
        if (!qtyRegex.test(qtyNeeded)) {
            $('#item_qty_need_p').css('border', '3px solid crimson');
        }
    }

    validateCustomerDetails() {
        const customerId = $('#customer_id_p').val();
        const customerName = $('#customer_name_p').val();
        const customerAddress = $('#customer_address_p').val();
        const cIdReg = /^C00\d+$/;
        const cNameReg = /^[A-Za-z\s'-]+$/;
        const cAddressReg = /^[0-9A-Za-z\s',.-]+$/;
        $('.pCustomerFields').css('border', 'none');
        if (!cIdReg.test(customerId)) {
            $('#customer_id_p').css('border', '3px solid crimson');
            this.allFiledsValidated = false;
        } else if (!cNameReg.test(customerName)) {
            $('#customer_name_p').css('border', '3px solid crimson');
            this.allFiledsValidated = false;
        } else if (!cAddressReg.test(customerAddress)) {
            $('#customer_address_p').css('border', '3px solid crimson');
            this.allFiledsValidated = false;
        } else {
            this.allFiledsValidated = true;
        }
    }

    generateOrderId(currentOrderId) {
        if (!currentOrderId) {
            return 'D001';
        }
        const currentNumber = parseInt(currentOrderId.slice(1), 10);
        const nextNumber = currentNumber + 1;
        return 'D' + String(nextNumber).padStart(3, '0');
    }
}

new PlaceOrder();


//Place Order page End------------------------------------------------------------------------
