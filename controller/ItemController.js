import {items} from "../db/DB.js";
import {Item} from "../model/Item.js";

export class ItemController {
    constructor() {
        this.items = items;
        $('.nav-link').click(this.loadingItemsIfAvailable.bind(this));
        $('#addItem').click(this.addItem.bind(this));
        $('#itemUpdate').click(this.updateItem.bind(this));
        $('#itemTbl').on('click', 'tr', this.clickOnTableItemLoadFields.bind(this));
        $("#itemTbl").on("click", ".item_delete", this.deleteItem.bind(this));
        $('.itemfields').on('keyup', this.validateItemDetails.bind(this));
        this.allFiledsValidated = false;

    }

    loadingItemsIfAvailable() {
        this.items = items;
        this.loadItemsTbl()
    }

    loadItemsTbl() {
        let tr = ``;
        this.items.map(item => {
            tr += `
            <tr >
                <td>${item.code}</td>
                <td>${item.des}</td>
                <td>${item.price}</td>
                <td>${item.qty}</td>
                <td>
                    <button class="item_delete btn btn-danger">Delete</button>
                </td>
            </tr>
        `;
        });
        $('#itemTbl').html(tr);
    }

    //add item-------------------------------------------------------------
    addItem(e) {

        e.preventDefault();
        const itemCode = $('#item_code').val();
        const des = $('#item_description').val();
        const price = $('#item_price').val();
        const qty = $('#item_qty').val();
        const item = new Item(itemCode, des, price, qty);
        const itemExists = this.items.some((i) => i.code === itemCode);
        if (itemExists) {
            $('#msg').text(itemCode, ' Item Already exists');
            $('#alertInfo').text('Success');
            $('#alertModal').modal('show');
            return;
        }
        if (!this.allFiledsValidated) {
            $('#msg').text('Check the fields again');
            $('#alertInfo').text('Success');
            $('#alertModal').modal('show');
            return;
        }


        this.items.push(item);
        $('#item_code').val('');
        $('#item_description').val('');
        $('#item_price').val('');
        $('#item_qty').val('');
        $('#msg').text(itemCode, ' Added Successfully!');
        $('#alertInfo').text('Success');
        $('#alertModal').modal('show');
        this.loadItemsTbl();
    }

    //update item-------------------------------------------------------------
    updateItem(e) {
        e.preventDefault();
        const itemCode = $('#item_code').val();
        const des = $('#item_description').val();
        const price = $('#item_price').val();
        const qty = $('#item_qty').val();
        let itemAvailable = this.items.some(item => item.code === itemCode);
        if (!itemAvailable) {
            $('#msg').text("Item doesn't available you should add instead");
            $('#alertInfo').text('Success');
            $('#alertModal').modal('show');
            return;
        }
        this.items.forEach((item) => {
            if (itemCode === item.code) {
                item.des = des;
                item.price = price;
                item.qty = qty;
                $('#msg').text(itemCode, ' Added Successfully!');
                $('#alertInfo').text('Success');
                $('#alertModal').modal('show');
            }
        });
        this.loadItemsTbl();
    }

    //click on item table row and load to the fields----------------------------------
    clickOnTableItemLoadFields(e) {
        const itemCode = $(e.target).closest('tr').find('td').eq(0).text();

        for (const item of this.items) {
            if (itemCode === item.code) {
                $('#item_code').val(item.code);
                $('#item_description').val(item.des);
                $('#item_price').val(item.price);
                $('#item_qty').val(item.qty);
                return;
            }
        }
    }

    //delete item
    deleteItem(e) {
        const itemCode = $(e.target).closest("tr").find("td").eq(0).text();
        const index = this.items.findIndex((item) => item.code === itemCode);
        if (index !== -1) {
            this.items.splice(index, 1);
        }
        this.loadItemsTbl();
    }

    validateItemDetails() {
        const itemCode = $('#item_code').val();
        const des = $('#item_description').val();
        const price = $('#item_price').val();
        const qty = $('#item_qty').val();
        const itemCodeRegex = /^P00\d+$/;
        const desReg = /^[A-Za-z0-9\s'-]+$/;
        const priceReg = /^\d+(\.\d{1,2})?$/;
        const qtyReg = /^\d+$/;

        $('.itemfields').css('border', 'none');
        if (!itemCodeRegex.test(itemCode)) {
            $('#item_code').css('border', '3px solid crimson');
            this.allFiledsValidated = false;
        } else if (!desReg.test(des)) {
            $('#item_description').css('border', '3px solid crimson');
            this.allFiledsValidated = false;
        } else if (!priceReg.test(price)) {
            $('#item_price').css('border', '3px solid crimson');
            this.allFiledsValidated = false;
        } else if (!qtyReg.test(qty)) {
            $('#item_qty').css('border', '3px solid crimson');
            this.allFiledsValidated = false;
        } else {
            this.allFiledsValidated = true;
        }
    }
}

new ItemController();