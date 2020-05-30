let shoppingCartItems = [];
// Kiểm tra nếu đã có sessionStorage["shopping-cart-items"] hay chưa?
if (sessionStorage["shopping-cart-items"] != null) {
    shoppingCartItems = JSON.parse(sessionStorage["shopping-cart-items"].toString());
    $(".dropdown > .badge").html(shoppingCartItems.length);
}

// Hiển thị thông tin từ giỏ hàng
displayShoppingCartItems();

$(".add-to-cart").click(function () {
    let button = $(this); // Lấy đối tượng mà người dùng click đặt tên là button
    let name = button.attr("data-name"); // name của sản phẩm là thuộc tính data-name của button
    let price = button.attr("data-price"); // price của sản phẩm là thuộc tính data-price của button
    let image = button.attr("data-img"); //image của sản phẩm là thuộc tính data-img của button
    let quantity = 1; // Số lượng

    let item = {
        name: name,
        price: price,
        quantity: quantity,
        image: image
    };

    let exists = false;
    if (shoppingCartItems.length > 0) {
        $.each(shoppingCartItems, function (index, value) {
            // Nếu mặt hàng đã tồn tại trong giỏ hàng thì chỉ cần tăng số lượng mặt hàng đó trong giỏ hàng.
            if (value.name == item.name) {
                value.quantity++;
                exists = true;
                return false;
            }
        });
    }

    // Nếu mặt hàng chưa tồn tại trong giỏ hàng thì bổ sung vào mảng
    if (!exists) {
        shoppingCartItems.push(item);
        $('.badge').html(shoppingCartItems.length);
    }

    // Lưu thông tin vào sessionStorage
    sessionStorage["shopping-cart-items"] = JSON.stringify(shoppingCartItems); // Chuyển thông tin mảng shoppingCartItems sang JSON trước khi lưu vào sessionStorage
    // Gọi hàm hiển thị giỏ hàng
    displayShoppingCartItems();
});

function displayShoppingCartItems() {
    if (sessionStorage["shopping-cart-items"] != null) {
        shoppingCartItems = JSON.parse(sessionStorage["shopping-cart-items"].toString()); // Chuyển thông tin từ JSON trong sessionStorage sang mảng shoppingCartItems.

        $(".shopping-cart > .shopping-cart-items").html("");
        // Duyệt qua mảng shoppingCartItems để append từng item
        $.each(shoppingCartItems, function (index, item) {
            let htmlString = "";
            htmlString += "<li>";
            htmlString += "<img src='" + item.image +"' alt='' />";
            htmlString += "<span class='item-name'>" + item.name + "</span>";
            htmlString += "<span class='item-price'>" + item.price + "</span>";
            htmlString += "<span class='item-quantity'>Số lượng: " + item.quantity + "</span>";
            htmlString += "</li>";
            htmlString += "<div class='dropdown-divider'></div>";
            $(".shopping-cart > .shopping-cart-items:last").append(htmlString);
        });
    }
}