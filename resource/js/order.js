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