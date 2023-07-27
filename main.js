import OrderService from "./db/OrderService.js";
import {CustomerService} from "./db/CustomerService.js";


hideAll();
$('#home').show();
$('.navbar-nav .nav-link').click(function () {
    const targetId = $(this).attr('href');
    hideAll();
    $(targetId).show();
    count();
});
count();
async function count() {
    let orders = await new OrderService().getAllItems();
    let ordersCount = orders.length;
    console.log(ordersCount);

    let customers = await new CustomerService().getAllCustomers();
    let customersCount = customers.length;
    $('#customersCount').text(customersCount);
    $('#ordersCount').text(ordersCount);
}


function hideAll() {
    $('#home, #customers, #orders,#placeOrder, #items').hide();
}










