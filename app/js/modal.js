

let productBtnList = document.querySelectorAll('.product-item__link');
let modalInfoWindow = document.querySelector('.modal-dialog');
let modalInfoTab = document.querySelector('.modal')
let modalInfoCloseBtn = document.querySelector('.modal__close-btn');


let modalCartWindow = document.querySelector('.cart-modal');
let modalCartTab = document.querySelector('.cart');
let modalCartCloseBtn = document.querySelector
('.cart__close');




let cartTotalPrice = document.querySelector('.cart__total-num');



let product = {
    name: '',
    price: '',
    img: '',
};



modalCartWindow.addEventListener('click', e => {
    /* e.preventDefault(); */
    let target = e.target;


    deleteItem(target);
    closeModal(target, modalCartWindow, modalCartTab, modalCartCloseBtn);
    changeInputCount(target);
});




modalInfoWindow.addEventListener('click', e => {
    e.preventDefault();
    let target = e.target;

    closeModal(target, modalInfoWindow, modalInfoTab, modalInfoCloseBtn);

    if(target == modalInfoTab.querySelector('.modal__link')) {
        displayWindow(modalInfoWindow);
        displayWindow(modalCartWindow);
    }
});

function closeModal(target, modalWindow, modalTab, closeBtn) {

    let isModalTab = target == modalTab || modalTab.contains(target);
    let isCloseBtn = target == closeBtn || closeBtn.contains(target);

    if(!isModalTab || isCloseBtn) {
        displayWindow(modalWindow);
    } 
};

function displayWindow(modalWindow) {
    modalWindow.classList.toggle('active');
    document.querySelector('body').classList.toggle('lock-body');
};

productBtnList.forEach(btn => {
    btn.addEventListener('click', addToCart);
});

function addToCart(e) {
    e.preventDefault();
    let target = e.target;

    let productCard = target.parentElement.parentElement;

    product.name = productCard.querySelector('.product-item__title-link').innerText;
    product.price = parseInt(productCard.querySelector('.product-item__current-price').innerText);
    product.img = productCard.querySelector('.product-item__img').getAttribute('src');

    if((product.name != '' && product.name != null) && (product.price != '' && product.price != null) && (product.img != '' && product.img != null) ) {
        fillModal(product.name, product.price, product.img);
        displayWindow(modalInfoWindow);
        pushToCart();
        calcTotalSum();
    }
};


function fillModal(productName, productPrice, productImage = '../images/icons/flower-frame.png') {
    let title = modalInfoWindow.querySelector('.modal__name');
    let price = modalInfoWindow.querySelector('.modal__price span');
    let img = modalInfoWindow.querySelector('.modal__img');

    title.innerText = productName;
    price.innerText = productPrice;
    img.setAttribute('src', productImage);
};


/* Push to cart */
let cartTable = document.querySelector('.cart-modal .table__body');
let rowTemplate = '<tr class="table__row"><td class="table__cell table__cell-img"><img class="table__img" src="" alt="Товар"></td><td class="table__cell table__cell-name"><p class="table__name"></p></td><td class="table__cell"><p class="table__price"><span class="table__price-num"></span> грн</p></td><td class="table__cell"><div class="table__input-box"><div class="table__input-minus">-</div><input class="table__input-field" type="number" value="1" min="1" max="100" readonly><div class="table__input-plus">+</div></div></td><td class="table__cell"><p class="table__sum"><span class="table__sum-num"></span> грн</p></td><td class="table__cell"><span class="table__delete"></span></td></tr>'


function pushToCart() {
    cartTable.innerHTML += rowTemplate;
    let row = cartTable.lastChild;
    /* Finding vars in our added template */
    let imgField = row.querySelector('.table__img');
    let nameField = row.querySelector('.table__name');
    let priceField = row.querySelector('.table__price-num');
    let sumField = row.querySelector('.table__sum-num');

    imgField.setAttribute('src', product.img);
    nameField.textContent = product.name;
    priceField.textContent = product.price;
    sumField.textContent = product.price;
}

function deleteItem(e) {
    if(e.classList.contains('table__delete')) {
        let item = e.parentElement.parentElement;
        item.remove();
        calcTotalSum();
    };
};





/* Calculations in cart */


function calcTotalSum() {
    let prices = document.querySelectorAll('.table__sum-num');
    let currentSum = 0;

    prices.forEach(price => {
        let productPrice = parseInt(price.textContent);
        if(Number.isInteger(productPrice)){
            currentSum += parseInt(productPrice);
        }
    });

    cartTotalPrice.innerText = currentSum;
};


function changeProductSum(target) {
    let parentElement = target.parentElement.parentElement.parentElement;
    let sumElement = parentElement.querySelector('.table__sum-num');
    let price = parseInt(parentElement.querySelector('.table__price-num').textContent);
    let inputValue = parseInt(parentElement.querySelector('.table__input-field').value);
    sumElement.innerText = price * inputValue;

}


/* Input changes */

function changeInputCount(target) {
    let element = null;
    if(target.classList.contains('table__input-plus')) {
        element = target;
        target.previousElementSibling.stepUp();
    } else if(target.classList.contains('table__input-minus')) {
        element = target;
        target.nextElementSibling.stepDown();
    }
    changeProductSum(target);
    calcTotalSum();
};