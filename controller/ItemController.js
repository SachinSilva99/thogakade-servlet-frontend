import {Item} from "../model/Item.js";
import ItemService from "../db/ItemService.js";


export class ItemController {
    constructor() {
        this.itemService = new ItemService();
        this.items = this.itemService.getAllItems();
        $('.nav-link').click(this.loadItemsTbl.bind(this));
        $('#addItem').click(this.addItem.bind(this));
        $('#itemUpdate').click(this.updateItem.bind(this));
        $('#itemTbl').on('click', 'tr', this.clickOnTableItemLoadFields.bind(this));
        $("#itemTbl").on("click", ".item_delete", this.deleteItem.bind(this));
        $('.itemfields').on('keyup', this.validateItemDetails.bind(this));
        $('#item_search_field').on('keyup', this.search.bind(this));
        this.allFiledsValidated = false;
        this.itemCodeOriginalBorderStyle = $('.itemfields').css('border');

    }
    async search(){
        const data = $('#item_search_field').val();
        const matchedData = this.items.filter(item => item.code.includes(data) || item.des.includes(data));
        this.setUpTable(matchedData);
    }
    setUpTable(items){
        let tr = ``;
        items.map(item => {
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
    async loadItemsTbl() {
        this.items = await this.itemService.getAllItems();
        this.setUpTable(this.items);
    }

    //add item-------------------------------------------------------------
    addItem(e) {

        e.preventDefault();
        const itemCode = $('#item_code').val();
        const des = $('#item_description').val();
        const price = $('#item_price').val();
        const qty = $('#item_qty').val();
        const item = new Item(itemCode, des, price, qty);
        if (!this.allFiledsValidated) {
            $('#msg').text('Check the fields again');
            $('#alertInfo').text('Success');
            $('#alertModal').modal('show');
            return;
        }


        // this.items.push(item);
        this.itemService.itemExists(itemCode).then(existingItem => {
            if (existingItem) {
                console.log(existingItem);
                $('#msg').text(itemCode + ' Item Already exists');
                $('#alertInfo').text('Error');
                $('#alertModal').modal('show');
            } else {
                console.log("works");
                this.itemService.save(item.toJSON()).then(r => this.loadItemsTbl());
                $('#item_code').val('');
                $('#item_description').val('');
                $('#item_price').val('');
                $('#item_qty').val('');
                $('#msg').text(itemCode + ' Added Successfully!');
                $('#alertInfo').text('Success');
                $('#alertModal').modal('show');
            }
        })
    }

    //update item-------------------------------------------------------------
    updateItem(e) {
        e.preventDefault();
        const itemCode = $('#item_code').val();
        const des = $('#item_description').val();
        const price = $('#item_price').val();
        const qty = $('#item_qty').val();
        const item = new Item(itemCode, des, price, qty);

        this.itemService.itemExists(itemCode)
            .then(existingItem => {
                if (existingItem) {
                    this.itemService.update(item.toJSON());
                    this.loadItemsTbl();
                    $('#msg').text(itemCode + ' updated Successfully!');
                    $('#alertInfo').text('Success');
                    $('#alertModal').modal('show');
                } else {
                    $('#msg').text("Item not available you should add");
                    $('#alertInfo').text('Error : ');
                    $('#alertModal').modal('show');
                }
            })
    }

    //click on item table row and load to the fields----------------------------------
    clickOnTableItemLoadFields(e) {
        const itemCode = $(e.target).closest('tr').find('td').eq(0).text();
        this.validateItemDetails();
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
        this.itemService.delete(itemCode).then(() => {
            this.loadItemsTbl();
            $('#msg').text('Item Deleted Successfully');
            $('#alertInfo').text('Error : ');
            $('#alertModal').modal('show');
        }).catch(er => {
            console.log("error");
            $('#msg').text('Item in use');
            $('#alertInfo').text('Success');
            $('#alertModal').modal('show');
        });
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
        $('.itemfields').css('border', this.itemCodeOriginalBorderStyle);
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