import {customers, orders} from "./db/DB.js";

hideAll();
$('#home').show();
$('.navbar-nav .nav-link').click(function () {
    const targetId = $(this).attr('href');
    hideAll();
    $(targetId).show();
    count();
});
count();
function count() {
    let ordersCount = orders.length;
    let customersCount = customers.length;
    console.log(ordersCount, customersCount)
    $('#customersCount').text(customersCount);
    $('#ordersCount').text(ordersCount);
}


function hideAll() {
    $('#home, #customers, #orders,#placeOrder, #items').hide();
}










