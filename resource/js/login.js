"use strict";
let login = false;
if (sessionStorage["isLogin"] != null) {
    login = JSON.parse(sessionStorage["isLogin"].toString());
}
console.log(false);
if (login == false) {
    $(".sign-in").hide();
    $(".unsignin").show();
} else {
    $(".sign-in").show();
    let name = "";
    if (sessionStorage["user"] != null) {
        name = JSON.parse(sessionStorage["user"].toString());
    }
    $(".username").html(name);
    $(".unsignin").hide();
}
$("#login-btn").click(function () {
    let phone = $("#login-phone").val();
    let psw = $("#login-psw").val();
    fetch("./resource/json/user.json")
        .then(function (resp) {
            return resp.json();
        })
        .then(function (data) {
            data.forEach((element) => {
                if (phone === element.phonenumber && psw === element.password) {
                    $(".sign-in").show();
                    $(".unsignin").hide();
                    let user = element.username;
                    login = true;
                    sessionStorage["isLogin"] = JSON.stringify(login);
                    sessionStorage["user"] = JSON.stringify(user);
                    $(".username").html(user);
                }
            });
        });
});
$(".logout").click(function () {
    $(".sign-in").hide();
    login = false;
    sessionStorage["isLogin"] = JSON.stringify(login);
    $(".unsignin").show();
});
