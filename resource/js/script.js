let header = document.querySelector('.menu');
let origOffsetY = header.offsetTop;

function onScroll(e) {
    window.scrollY >= origOffsetY ? header.classList.add('sticky') :
        header.classList.remove('sticky');
};
document.addEventListener('scroll', onScroll);

sum();

$('.plus').click(function (e) {
    e.preventDefault();
    let sp = parseFloat($(this).prev('span').text());
    $(this).prev('span').text(sp + 1);
    sum();
});

$('.minus').click(function (e) {
    e.preventDefault();
    let sp = parseFloat($(this).next('span').text());
    $(this).next('span').text(sp - 1);
    if (!isNaN(sp) && sp > 0) {
        $(this).next('span').text(sp - 1);
        sum();
    } else {
        $(this).next('span').text(0);
    }
});

$("[id*=remove]").each(function () {
    $(this).click(function () {
        $(this).parent().parent().remove();
        sum();
    })
})

function sum() {
    let cash = 0;
    let sumproduct = 0;
    $('tr').each(function () {
        let price = $(this).find('#cellprice').text();
        let amount = $(this).find('#cellamount').text();
        $(this).find('#cellsum').html(price * amount);
    });
    $("[id*=cellsum]").each(function () {
        cash += parseFloat($(this).text());
    })
    $('#sum').html(cash + ' VND');
    
    $("[id*=cellamount]").each(function () {
        sumproduct += parseFloat($(this).text());
    })
    $('#sumproduct').html(sumproduct);
}

$('.unsignin').hide();
$('.manage-pet').hide();
$('.profile-edit').hide();
$('#login-btn').click(function (){
    $('.sign-in').show();
    $('.unsignin').hide();
});
$('.logout').click(function (){
    $('.sign-in').hide();
    $('.unsignin').show();
});
$('.show-history').click(function (){
    $('.manage-pet').hide();
    $('.profile-edit').hide();
    $('.history-cart').show();
});
$('.show-manage').click(function (){
    $('.manage-pet').show();
    $('.history-cart').hide();
    $('.profile-edit').hide();
});
$('.update-profile').click(function (){
    $('.manage-pet').hide();
    $('.history-cart').hide();
    $('.profile-edit').show();
});