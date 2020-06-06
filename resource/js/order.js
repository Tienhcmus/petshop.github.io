let orderList = [];

if (sessionStorage["shopping-cart-items"] != null) {
    orderList = JSON.parse(sessionStorage["shopping-cart-items"].toString());
    displayOrderList();

}
function displayOrderList() {
    let count = 0;
    if (sessionStorage["shopping-cart-items"] != null) {
        orderList = JSON.parse(sessionStorage["shopping-cart-items"].toString());

        orderList.forEach(element => {
            count += element.quantity;
        });

        $("#quantity-cart").html(count);
        $(".shopping-cart > .shopping-cart-items").html("");
        $("table > tbody").html("");
        // Duyệt qua mảng shoppingCartItems để append từng item
        $.each(orderList, function (index, item) {
            addcart(item);
            addtable(item);
        });
    }
    $('.plus').click(function () {
        let plus = $(this);
        let name = plus.attr('data-name');
    
        orderList.forEach(element => {
            if (element.name == name) {
                element.quantity++;
                sessionStorage["shopping-cart-items"] = JSON.stringify(orderList);
                displayOrderList();
                return false;
            }
        });
    });
    
    $('.minus').click(function () {
        let minus = $(this);
        let name = minus.attr('data-name');
    
        orderList.forEach(element => {
            if (element.name == name && element.quantity > 0) {
                element.quantity--;
                sessionStorage["shopping-cart-items"] = JSON.stringify(orderList);
                displayOrderList();
                return false;
            }
        });
    });

    $("[id*=remove]").each(function () {
        $(this).click(function () {
            let remove = $(this);
            let name = remove.attr('data-name');
            orderList.forEach(element => {
                if(element.name == name){
                    orderList.splice(orderList.indexOf(element), 1);
                    sessionStorage["shopping-cart-items"] = JSON.stringify(orderList);
                    displayOrderList();
                    return false;
                }
            });
        })
    })

}

function addcart(item) {
    let cartHtmlString = "";
    cartHtmlString += "<li>";
    cartHtmlString += "<img src='" + item.image + "' alt='' />";
    cartHtmlString += "<span class='item-name'>" + item.name + "</span>";
    cartHtmlString += "<span class='item-price'>" + item.price + "</span>";
    cartHtmlString += "<span class='item-quantity'>Số lượng: " + item.quantity + "</span>";
    cartHtmlString += "</li>";
    cartHtmlString += "<div class='dropdown-divider'></div>";
    $(".shopping-cart > .shopping-cart-items:last").append(cartHtmlString);
};

function addtable(item) {
    let orderlistHtmlString = "";
    orderlistHtmlString += "<tr>";
    orderlistHtmlString += "<td><img src='" + item.image + "' alt=''></td>";
    orderlistHtmlString += "<td id='cellname' class='cell'>" + item.name + " </td>";
    orderlistHtmlString += "<td class='cell'> <span id='cellprice'>" + item.price + "</span></td>";
    orderlistHtmlString += "<td class='cell'><button class='edit minus fas fa-minus' data-name='" + item.name + "'></button>";
    orderlistHtmlString += "<span id='cellamount'>" + item.quantity + "</span>";
    orderlistHtmlString += "<button class='edit plus fas fa-plus' data-name='" + item.name + "'></button></td>";
    orderlistHtmlString += "<td id='cellsum' class='cell'>" + Number(item.price) * Number(item.quantity) + "</td>";
    orderlistHtmlString += "<td class='cell'><button id='remove' type='button' data-name='" + item.name + "' class='btn btn-danger btn-sm'>X</button></td>";
    orderlistHtmlString += "</tr>";
    $("table > tbody:last").append(orderlistHtmlString);
};
