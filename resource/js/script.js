let header = document.querySelector('.menu');
let origOffsetY = header.offsetTop;

function onScroll(e) {
    window.scrollY >= origOffsetY ? header.classList.add('sticky') :
        header.classList.remove('sticky');
};
document.addEventListener('scroll', onScroll);

$('.sign-in').hide();
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