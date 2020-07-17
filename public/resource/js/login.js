let ref = database.ref('users');

let login = false;
if (sessionStorage["isLogin"] != null) {
    login = JSON.parse(sessionStorage["isLogin"].toString());
}

$(function () {
    // Ẩn thẻ span
    $("#fname_error_message").hide();
    $("#lname_error_message").hide();
    $("#addr_error_message").hide();
    $("#phone_error_message").hide();
    $("#psw_error_message").hide();
    $("#rpsw_error_message").hide();

    let error_fname = false;
    let error_lname = false;
    let error_addr = false;
    let error_phone = false;
    let error_psw = false;
    let error_rpsw = false;

    $("#sign_up_fname").focusout(function () {
        check_fname();
    });
    $("#sign_up_lname").focusout(function () {
        check_lname();
    });
    $("#sign_up_addr").focusout(function () {
        check_addr();
    })
    $("#sign_up_phone").focusout(function () {
        check_phone();
    })
    $("#sign_up_psw").focusout(function () {
        check_psw();
    });
    $("#sign_up_rpsw").focusout(function () {
        check_rpsw();
    });

    function check_fname() {
        let pattern = /\S/;
        let fname = $("#sign_up_fname").val();
        if (pattern.test(fname) && fname !== '') {
            $("#fname_error_message").hide();
            $("#sign_up_fname").css("border", "1px solid #34F458");
        } else {
            $("#fname_error_message").html("Vui lòng nhập tên của bạn");
            $("#fname_error_message").show();
            $("#sign_up_fname").css("border", "1px solid #F90A0A");
            error_fname = true;
        }
    };

    function check_lname() {
        let pattern = /\S/;
        let lname = $("#sign_up_lname").val();
        if (pattern.test(lname) && lname !== '') {
            $("#lname_error_message").hide();
            $("#sign_up_lname").css("border", "1px solid #34F458");
        } else {
            $("#lname_error_message").html("Vui lòng nhập họ của bạn");
            $("#lname_error_message").show();
            $("#sign_up_lname").css("border", "1px solid #F90A0A");
            error_lname = true;
        }
    };

    function check_addr() {
        let addr = $("#sign_up_addr").val();
        if (addr !== '') {
            $("#addr_error_message").hide();
            $("#sign_up_addr").css("border", "1px solid #34F458");
        } else {
            $("#addr_error_message").html("Vui lòng nhập địa chỉ");
            $("#addr_error_message").show();
            $("#sign_up_addr").css("border", "1px solid #F90A0A");
            error_addr = true;
        }
    };

    function check_phone() {
        let phone = $("#sign_up_phone").val();
        sessionStorage.setItem("phone-is-used", true);
        ref.orderByChild('phone').equalTo(phone).on('value', snapshop => {
            let resisterToken = JSON.stringify(snapshop.val())
            if (phone == '' || phone.length != 10) {
                $("#phone_error_message").html("Vui lòng nhập số điện thoại");
                $("#phone_error_message").show();
                $("#sign_up_phone").css("border", "1px solid #F90A0A");
                sessionStorage.setItem("phone-is-used", true);
            } else if (resisterToken !== "null") {
                $("#phone_error_message").html("Số điện thoại này đã được đăng ký vui lòng nhập số khác");
                $("#phone_error_message").show();
                $("#sign_up_phone").css("border", "1px solid #F90A0A");
                sessionStorage.setItem("phone-is-used", true);
            } else {
                $("#phone_error_message").hide();
                $("#sign_up_phone").css("border", "1px solid #34F458");
                sessionStorage.setItem("phone-is-used", false);
            }
        })
        return sessionStorage.getItem("phone-is-used");
    };

    function check_psw() {
        let pattern = /[\w\W]{6,18}/;
        let psw = $("#sign_up_psw").val();
        if (pattern.test(psw) && psw !== '') {
            $("#psw_error_message").hide();
            $("#sign_up_psw").css("border", "1px solid #34F458");
        } else {
            $("#psw_error_message").html("Mật khẩu phải từ 6-18 ký tự bất kì");
            $("#psw_error_message").show();
            $("#sign_up_psw").css("border", "1px solid #F90A0A");
            error_psw = true;
        }
    };

    function check_rpsw() {
        let psw = $("#sign_up_psw").val();
        let rpsw = $("#sign_up_rpsw").val();
        if (psw !== rpsw || rpsw == '') {
            $("#rpsw_error_message").html("Chưa chính xác");
            $("#rpsw_error_message").show();
            $("#sign_up_rpsw").css("border", "1px solid #F90A0A");
            error_rpsw = true;
        } else {
            $("#rpsw_error_message").hide();
            $("#sign_up_rpsw").css("border", "1px solid #34F458");
        }
    };

    $("#signupform").submit(function () {
        error_fname = false;
        error_lname = false;
        error_addr = false;
        error_phone = false;
        error_psw = false;
        error_rpsw = false;

        check_fname();
        check_lname();
        check_addr();
        check_phone();
        check_psw();
        check_rpsw();

        if (error_fname === false && error_lname === false && error_addr === false && error_phone === false && error_psw === false && error_rpsw === false) {
            let fname = $("#sign_up_fname").val();
            let lname = $("#sign_up_lname").val();
            let addr = $("#sign_up_addr").val();
            let phone = $("#sign_up_phone").val();
            let psw = $("#sign_up_psw").val();
            let info = {
                name: fname + " " + lname,
                address: addr,
                phone: phone,
                password: psw
            }
            ref.orderByChild('phone').equalTo(phone).on('value', snapshop => {
                let resisterToken = JSON.stringify(snapshop.val())
                if (resisterToken == "null") {
                    ref.push(info)
                    alert("Đăng ký thành công")
                }
            })
        } else {
            alert("Vui lòng đăng ký lại");
            return false;
        }
    });
})

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
    ref.orderByChild('phone').equalTo(phone).on('value', snapshop => {
        if (snapshop.val() == "null") {
            alert("Tài khoản này chưa tồn tại");
        } else {
            let keys = Object.keys(snapshop.val());
            let userdata = snapshop.val();
            userdata = userdata[keys];
            const originPassword = userdata.password;
            if (originPassword == psw) {
                $(".sign-in").show();
                $(".unsignin").hide();
                let user = userdata.name;
                login = true;
                sessionStorage["isLogin"] = JSON.stringify(login);
                sessionStorage["user"] = JSON.stringify(user);
                $(".username").html(user);
            } else {
                alert("Đăng nhập thất bại")
            }
        }
    })
});
$(".logout").click(function () {
    $(".sign-in").hide();
    login = false;
    sessionStorage["isLogin"] = JSON.stringify(login);
    $(".unsignin").show();
});