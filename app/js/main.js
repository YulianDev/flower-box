$(function () {
    $('.filter-price__input').ionRangeSlider({
        type: 'double',
        onStart: function (data) {
            $('.filter-price__from').text(data.from);
            $('.filter-price__to').text(data.to);
        },
        onChange: function (data) {
            $('.filter-price__from').text(data.from);
            $('.filter-price__to').text(data.to);
        },
    });
    /* $('.reply-form__text-area').on('scroll', function() {
        let currentHeight = 0;
        if($(this).scrollTop() > 0) {
            currentHeight = ($(this).scrollTop())
        }
        let newHeight = 50 + currentHeight + 5;
        $(this).css({height:newHeight})
    }); */

    $('.product-tabs__top-item').on('click', function (e) {
        e.preventDefault();
        $('.product-tabs__top-item').removeClass('product-tabs__top-item--active');
        $(this).addClass('product-tabs__top-item--active');

        $('.product-tabs__content-item').removeClass('product-tabs__content-item--active');
        $($(this).attr('href')).addClass('product-tabs__content-item--active');
    })

    $('.count-input, .filter__select').styler();

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
        arrows: false,
        fade: true,
    });

    $('.star').rateYo({
        starWidth: '16px',
        fullStar: true,
        readOnly: true,
        spacing: '5px',
        ratedFill: '#fd3068',
        starSvg: '<svg xmlns="http://www.w3.org/2000/svg"xmlns:xlink="http://www.w3.org/1999/xlink" width="18pt" height="16pt"viewBox="0 0 18 16" version="1.1"><path d="M 8.101562 0.554688 L 6.0625 4.695312 L 1.496094 5.359375 C 0.679688 5.476562 0.351562 6.488281 0.945312 7.066406 L 4.246094 10.285156 L 3.464844 14.832031 C 3.324219 15.652344 4.191406 16.269531 4.914062 15.882812 L 9 13.738281 L 13.085938 15.882812 C 13.808594 16.265625 14.675781 15.652344 14.535156 14.832031 L 13.753906 10.285156 L 17.054688 7.066406 C 17.648438 6.488281 17.320312 5.476562 16.503906 5.359375 L 11.9375 4.695312 L 9.898438 0.554688 C 9.53125 -0.179688 8.472656 -0.191406 8.101562 0.554688 Z M 8.101562 0.554688 " /></svg>'
    });

    const menuMarginTop = $('.menu').offset().top;
    const menuHeight = $('.menu').height();
    const headerHeight = $('.header').height();
    const main = $('main');
    const windowWidth = $(window).width();

    $(window).on('scroll', function () {
        let scrolled = $(this).scrollTop();
        if(windowWidth > 1040) {
            if (scrolled > menuMarginTop) {
                $('.header').addClass('header-fixed');
                $('.header__inner').css({ marginBottom: menuHeight });
            } else if (scrolled < menuMarginTop) {
                $('.header').removeClass('header-fixed');
                $('.header__inner').css({ marginBottom: 0 });
            }
        } else {
            $('.header').addClass('header-mobile');
            main.css({marginTop: headerHeight});
        }
    });



    /* let mixer = mixitup('.product__items') */
});

let map;

function initMap() {
  map = new google.maps.Map(document.getElementById("map"), {
    center: { lat: 45.439740913794644, lng: 29.265136288809067 },
    zoom: 17,
  });
}

            /* Chat functionality */
let chatTextarea = document.querySelector('.chat__textarea');
let chatTextareaComputed = getComputedStyle(chatTextarea);
let chatDefaultTextareaHeight = chatTextareaComputed.height;
let chat = document.querySelector('.chat');
let chatHeader = document.querySelector('.chat__header');


/* Show/hide chat */
chat.addEventListener('click', (e) => {
    let target = e.target;
    let isHeader = target == chatHeader || chatHeader.contains(target);
    let isCloseBtn = target == document.querySelector('.chat__close-btn');
    if(isHeader) {
        chat.classList.add('chat--active');
    
    } else if (isCloseBtn) {
        chat.classList.remove('chat--active');
    }
});

/* Resize input */ 
chatTextarea.addEventListener('keyup', () => {
    if(chatTextarea.scrollTop > 0) {
        chatTextarea.style.height = chatTextarea.scrollHeight + 'px'; 
    } else if(chatTextarea.scrollHeight > parseInt(chatTextareaComputed.maxHeight)) {
        chatTextarea.style.overflowY = 'scroll';
    } else if(chatTextarea.value == "") {
        chatTextarea.style.height = chatDefaultTextareaHeight;
    }
});

        /* Send messages */
let chatMessagesField = document.querySelector('.chat__messages');
let chatSendBtn = document.querySelector('.chat__btn');

const webSocket = new WebSocket('ws://localhost:8081');

/* Get message from Server */
webSocket.onmessage = (e) => {
    const data = JSON.parse(e.data);
    chatMessagesField.innerHTML += '<div class="chat__message chat__message--server">'
    + data.message + '</div>';
};

/* Get massage and send to server */
chatSendBtn.addEventListener('click', (e) => {
    e.preventDefault();
    let message = chatTextarea.value;
    
    if(message != '') {
        webSocket.send(JSON.stringify({
            'message':message
        }));
        chatMessagesField.innerHTML += '<div class="chat__message chat__message--client">'
        + message + '</div>';
        chatTextarea.value = '';
    };
});


/* Menu functionality */
const menuIcon = document.querySelector('.header__menu-icon');
const menuList = document.querySelector('.menu');
const body = document.querySelector('body');


menuIcon.addEventListener('click', displayMenu);
window.addEventListener('click', (e) => {inMenu(e)});

function displayMenu() {
    menuIcon.classList.toggle('active');
    menuList.classList.toggle('active');
    body.classList.toggle('lock-body');
};

function inMenu(e) {
    const target = e.target;
    const isMenu = target == menuList || menuList.contains(target);
    const isMenuActive = menuList.classList.contains('active');
    const isMenuIcon = target == menuIcon;


    if(!isMenu && !isMenuIcon && isMenuActive) {
        displayMenu();
    }
};

