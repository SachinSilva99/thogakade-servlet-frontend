//customers page start---------------------------------------------------------------
import {Customer} from "../model/Customer.js";
import {CustomerService} from "../db/CustomerService.js";

export class CustomerController {
     constructor() {
        this.customerService = new CustomerService();
        $('#add_customer').click(this.addCustomer.bind(this));
        $('#update_customer').click(this.updateCustomer.bind(this));
        this.customers =  this.customerService.getAllStudents();
        $('.nav-link').click(this.loadCustomersTbl.bind(this));
        $('#customerTbl').on('click', 'tr', this.clickTableLoadFields.bind(this));
        $("#customerTbl").on("click", ".customer_delete", this.deleteCustomer.bind(this));
        $('.fields').on('keyup', this.validateCustomerDetails.bind(this));
        this.allFiledsValidated = false;
        this.customerIdElement = $('#customer_id');
        this.customerNameElement = $('#customer_name');
        this.customerAddressElement = $('#customer_address');
        $('#customerSearchField').on('keyup', this.searchCustomers.bind(this));

    }

    searchCustomers() {
        const searchField = $('#customerSearchField').val();
        const matchedCustomers = this.customers.filter(
            c => c.id.includes(searchField) || c.name.includes(searchField)
        );
        let tr = ``;
        matchedCustomers.map(customer => {
            tr += `
            <tr>
                <th scope="row">${customer.id}</th>
                <td>${customer.name}</td>
                <td>${customer.address}</td>
                <td>
                    <button class="customer_delete btn btn-danger">Delete</button>
                </td>
            </tr>
        `;
        });
        $('#customerTbl').html(tr);
    }

    async loadCustomersTbl() {
        this.customers = await this.customerService.getAllStudents();

        let tr = ``;
        this.customers.map(customer => {
            tr += `
            <tr>
                <th scope="row">${customer.id}</th>
                <td>${customer.name}</td>
                <td>${customer.address}</td>
                <td>
                    <button class="customer_delete btn btn-danger">Delete</button>
                </td>
            </tr>
        `;
        });
        $('#customerTbl').html(tr);
    }

    addCustomer(e) {
        e.preventDefault();
        if (!this.allFiledsValidated) {
            $('#msg').text('Check the invalid fields!!!');
            $('#alertInfo').text('Warning');
            $('#alertModal').modal('show');
            return;
        }
        const customer = new Customer(
            this.customerIdElement.val(),
            this.customerNameElement.val(),
            this.customerAddressElement.val()
        );

        let promise = this.customerService.customerExists();
        if (customerExists) {
            alert("Customer Already exists");
            return;
        }
        this.customers.push(customer);
        this.customerIdElement.val('');
        this.customerNameElement.val('');
        this.customerAddressElement.val('');
        $('#msg').text('Customer Added Successfully');
        $('#alertInfo').text('Success');
        $('#alertModal').modal('show');
        this.loadCustomersTbl();
    }

    updateCustomer(e) {
        e.preventDefault();
        const customerId = this.customerIdElement.val();
        const customerName = this.customerNameElement.val();
        const customerAddress = this.customerAddressElement.val();

        this.customers.forEach((customer) => {
            if (customerId === customer.id) {
                customer.name = customerName;
                customer.address = customerAddress;
                alert('customer updated successfully');
            }
        });
        this.loadCustomersTbl();
    }


    clickTableLoadFields(e) {
        const customerId = $(e.target).closest('tr').find('th').eq(0).text();

        for (const customer of this.customers) {
            if (customerId === customer.id) {
                this.customerIdElement.val(customer.customerId);
                this.customerNameElement.val(customer.name);
                this.customerAddressElement.val(customer.address);
                return;
            }
        }
    }

    deleteCustomer(e) {
        const customerId = $(e.target).closest("tr").find("th").eq(0).text();
        const index = this.customers.findIndex((customer) => customer.id === customerId);
        if (index !== -1) {
            this.customers.splice(index, 1);
        }
        $('#msg').text('Customer Deleted Successfully');
        $('#alertInfo').text('Success');
        $('#alertModal').modal('show');
        console.log(this.customers);
        this.loadCustomersTbl();
    }

    validateCustomerDetails() {
        const customerId = this.customerIdElement.val();
        const customerName = this.customerNameElement.val();
        const customerAddress = this.customerAddressElement.val();
        const cIdReg = /^C00\d+$/;
        const cNameReg = /^[A-Za-z\s'-]+$/;
        const cAddressReg = /^[0-9A-Za-z\s',.-]+$/;
        $('.fields').css('border', 'none');
        if (!cIdReg.test(customerId)) {
            this.customerIdElement.css('border', '3px solid crimson');
            this.allFiledsValidated = false;
        } else if (!cNameReg.test(customerName)) {
            this.customerNameElement.css('border', '3px solid crimson');
            this.allFiledsValidated = false;
        } else if (!cAddressReg.test(customerAddress)) {
            this.customerAddressElement.css('border', '3px solid crimson');
            this.allFiledsValidated = false;
        } else {
            this.allFiledsValidated = true;
        }
    }
}

new CustomerController();