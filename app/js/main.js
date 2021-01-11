$(function(){

    $('.product-card__input').styler();

    $('.product-slide__thumb').slick({
        asNavFor: '.product-slide__big',
        slidesToShow: 4,
        slidesToScroll: 1,
        focusOnSelect: true,
        draggable: false,
        arrows: false,

    });
    $('.product-slide__big').slick({
        asNavFor: '.product-slide__thumb',
        arrows:false, 
        fade: true,
    });

    $('.star').rateYo({
        starWidth: '16px',
        fullStar: true,
        readOnly: true,
        spacing: '5px',
    });

    const menuMarginTop = $('.menu').offset().top;
    const menuHeight = $('.menu').height();
    $(window).on('scroll', function(){
        const scrolled = $(this).scrollTop();
        if(scrolled > menuMarginTop) {
            $('.header').addClass('header-fixed');
            $('.header__inner').css({marginBottom:menuHeight});
        } else if(scrolled < menuMarginTop) {
            $('.header').removeClass('header-fixed');
            $('.header__inner').css({marginBottom:0});
        }
    });

    /* let mixer = mixitup('.product__items') */
});