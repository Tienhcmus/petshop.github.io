let header = document.querySelector('.menu');
let origOffsetY = header.offsetTop;

function onScroll(e) {
    window.scrollY >= origOffsetY ? header.classList.add('sticky') :
        header.classList.remove('sticky');
};
document.addEventListener('scroll', onScroll);


$('.manage-pet').hide();
$('.profile-edit').hide();
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