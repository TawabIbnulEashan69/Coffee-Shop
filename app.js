const nav = document.getElementById('nav');
const openBtn = document.getElementById('open-btn');
const searchBtn = document.getElementById('search-btn');
const searchInp = document.querySelector('.search_inp');
const shoppingCart = document.querySelector('.shopping-cart');
const cartBtn = document.getElementById('cart-shopping');
let myShopArr = JSON.parse(localStorage.getItem('myShopArr')) || [];

openBtn.addEventListener('click', () => {
    closeAll(searchInp, shoppingCart);
    nav.classList.toggle('open-menu');
});

searchBtn.addEventListener('click', () => {
    closeAll(nav, shoppingCart);
    searchInp.classList.toggle('open-search_inp');
});

cartBtn.addEventListener('click', () => {
    shoppingCart.classList.toggle('card-active');
    if (shoppingCart.classList.contains('card-active')) {
        const windowHeight = window.innerHeight;
        const cartTopOffset = shoppingCart.getBoundingClientRect().top;
        const availableHeight = windowHeight - cartTopOffset - 20;
        shoppingCart.style.maxHeight = `${availableHeight}px`;
        shoppingCart.style.overflowY = 'auto';
    } else {
        shoppingCart.style.maxHeight = '';
        shoppingCart.style.overflowY = '';
    }
});

window.onscroll = () => {
    closeAll(searchInp, shoppingCart, nav);
};

function closeAll(...elements) {
    elements.forEach(el => el.classList.remove('open-menu', 'open-search_inp', 'card-active'));
}

const menuCards = document.querySelectorAll('.menu .card');
menuCards.forEach((card, index) => {
    const addToCartBtn = card.querySelector('.btn');
    addToCartBtn.addEventListener('click', () => {
        const product = {
            id: `menu-${index + 1}`,
            img: card.querySelector('.card-img').src,
            name: card.querySelector('h4').textContent,
            price: parseFloat(card.querySelector('p').textContent.replace('$', '').split(' ')[0]),
            quantity: 1
        };
        addToCart(product);
    });
});

function addToCart(product) {
    const existingProduct = myShopArr.find(item => item.id === product.id);
    if (existingProduct) {
        existingProduct.quantity += 1;
    } else {
        myShopArr.push(product);
    }
    updateCart();
}

function createList() {
    let listItems = '';
    let totalItems = 0;
    let totalCost = 0;

    myShopArr.forEach(item => {
        totalItems += item.quantity;
        totalCost += item.price * item.quantity;
        listItems += `
            <div id='${item.id}' class="shop-card">
                <div class="prod-item">
                    <img src=${item.img} alt="cart-item">
                    <div class="item-desc">
                        <h3>${item.name}</h3>
                        <p>Price: $${item.price}</p>
                        <div class="quantity-controls">
                            <button class="decrease-btn" data-id="${item.id}">-</button>
                            <span>${item.quantity}</span>
                            <button class="increase-btn" data-id="${item.id}">+</button>
                        </div>
                    </div>
                </div>
                <div class="close-btn" data-id="${item.id}">
                    <i class="fa-solid fa-times"></i>
                </div>
            </div>
        `;
    });

    listItems += `
        <div class="cart-summary">
            <p>Total Items: ${totalItems}</p>
            <p>Total Cost: $${totalCost.toFixed(2)}</p>
        </div>
        <button class="btn checkout-btn" onclick="checkout()">Checkout</button>
    `;

    shoppingCart.innerHTML = listItems;
    attachCartEventListeners();
}

function attachCartEventListeners() {
    document.querySelectorAll('.increase-btn').forEach(button => {
        button.addEventListener('click', () => {
            const id = button.getAttribute('data-id');
            updateQuantity(id, 1);
        });
    });

    document.querySelectorAll('.decrease-btn').forEach(button => {
        button.addEventListener('click', () => {
            const id = button.getAttribute('data-id');
            updateQuantity(id, -1);
        });
    });

    document.querySelectorAll('.close-btn').forEach(button => {
        button.addEventListener('click', () => {
            const id = button.getAttribute('data-id');
            deleteItem(id);
        });
    });
}

function updateQuantity(id, change) {
    myShopArr = myShopArr.map(item => {
        if (item.id === id) item.quantity = Math.max(1, item.quantity + change);
        return item;
    });
    updateCart();
}

function deleteItem(id) {
    myShopArr = myShopArr.filter(item => item.id !== id);
    updateCart();
}

function updateCart() {
    localStorage.setItem('myShopArr', JSON.stringify(myShopArr));
    createList();
}

function checkout() {
    window.location.href = 'payment.html';
}

document.getElementById('contact-form').addEventListener('submit', function (e) {
    e.preventDefault();
    alert('Thank you for connecting!');
    this.reset();
});

createList();