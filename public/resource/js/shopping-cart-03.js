$(document).ready(function () {
    let shoppingCartItems = [];

    // Kiểm tra nếu đã có sessionStorage["shopping-cart-items"] hay chưa?
    if (sessionStorage["shopping-cart-items"] != null) {
        shoppingCartItems = JSON.parse(sessionStorage["shopping-cart-items"].toString());
        // Hiển thị thông tin từ giỏ hàng
        displayShoppingCartItems();
    }

    let clickBuy = new Audio()
    clickBuy.src = "https://www.soundjay.com/button/beep-07.wav"


    

    function displayShoppingCartItems() {
        let count = 0
        let sum = 0
        if (sessionStorage["shopping-cart-items"] != null) {
            shoppingCartItems = JSON.parse(sessionStorage["shopping-cart-items"].toString()); // Chuyển thông tin từ JSON trong sessionStorage sang mảng shoppingCartItems.       

            shoppingCartItems.forEach(element => {
                count += element.quantity;
            });

            $("#quantity-cart").html(count);
            $(".shopping-cart > .shopping-cart-items").html("");
            // Duyệt qua mảng shoppingCartItems để append từng item
            $.each(shoppingCartItems, function (index, item) {
                let price = item.price
                let htmlString = "";
                htmlString += "<li>";
                htmlString += "<img src='../../../" + item.image + "' alt='' />";
                htmlString += "<span class='item-name'>" + item.name + "</span>";
                htmlString += "<span class='item-price'>" + price + "</span>";
                htmlString += "<span class='item-quantity'>Số lượng: " + item.quantity + "</span>";
                htmlString += "</li>";
                htmlString += "<div class='dropdown-divider'></div>";
                $(".shopping-cart > .shopping-cart-items:last").append(htmlString);
                sum += item.price * item.quantity;
            });
            let cost = convert(sum);
            $(".total-cost").html("Tổng Tiền: " + cost)
        }
    }
})
