$(function(){
    $('.star').rateYo({
        starWidth: '16px',
        fullStar: true,
        readOnly: true,
        spacing: '5px',
    });

    const menu = $('.menu');
    const menuHeight = $(menu).height();
    const menuOffset = menu.offset().top;
    $(window).on('scroll', function(){
        const scrolled = $(this).scrollTop();
        if(scrolled > menuOffset) {
            $('.header').css({marginBottom: menuHeight});
        } else if (scrolled < menuOffset) {
            $('.header').css({marginBottom: 0});
        }
    })

    /* let mixer = mixitup('.product__items') */
});