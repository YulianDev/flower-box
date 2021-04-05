/* Filter btn on the flowers page  */
const filterBtn = document.querySelector('.filter__btn');
const filterList = document.querySelector('.filter__items');

    if(filterBtn !== undefined) {
        filterBtn.addEventListener('click', () => {
            filterBtn.classList.toggle('active');
            filterList.classList.toggle('active');
            body.classList.toggle('lock-body');
        });
    };