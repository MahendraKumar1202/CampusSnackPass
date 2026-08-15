const menu = [
    {
        name: "Pizza",
        price: 200,
        category: "Pizza",
        image: "images/pizza.jpg",
        quantity: 0,
        popular: true
    },
    {
        name: "Burger",
        price: 100,
        category: "Burger",
        image: "images/Burger.jpg",
        quantity: 0,
        popular: true
    },
    {
        name: "coke",
        price: 80,
        category: "Drinks",
        image: "images/coke.jpg",
        quantity: 0,
        popular: true
    },
    {
        name: "Desserts",
        price: 70,
        category: "Desserts",
        image: "images/Desserts.jpg",
        quantity: 0,
        popular: false
    },
    {
        name: "TEA",
        price: 30,
        category: "Drinks",
        image: "images/Tea.jpg",
        quantity: 0,
        popular: false
    },
    {
        name: "Cofee",
        price: 30,
        category: "Drinks",
        image: "images/Cofee.jpg",
        quantity: 0,
        popular: false
    },
    {
        name: "Fresh Juice",
        price: 50,
        category: "Drinks",
        image: "images/Freshjuice.jpg",
        quantity: 0,
        popular: false
    },
    {
        name: "Veg-Burger",
        price: 120,
        category: "Burger",
        image: "images/Vegburger.jpg",
        quantity: 0,
        popular: true
    },
    {
        name: "Cheese-burger",
        price: 200,
        category: "Burger",
        image: "images/cheeseBurger.jpg",
        quantity: 0,
        popular: true
    },
    {
        name: "Cheese-pizza",
        price: 180,
        category: "Pizza",
        image: "images/cheesepizza.jpg",
        quantity: 0,
        popular: true
    }
];

let cart = [];
let orderHistory = [];
let rating = 0;

const menuSection = document.getElementById("menu");
const cartitems = document.getElementById("cart-items");
const message = document.getElementById("message");
const prices = document.getElementById("prices");

function displaymenu(items) {

    menuSection.innerHTML = "";

    items.forEach(function(x) {

        menuSection.innerHTML += `
        <div class="card">

            <img src="${x.image}">

            <h3>${x.name}</h3>

            <p>Rs.${x.price}</p>

            ${x.popular ? `<span class="popular">🔥 POPULAR</span>` : ""}

            <button class="cartbtn" value="${menu.indexOf(x)}">
                Add to Cart
            </button>

            <button class="favbtn" value="${menu.indexOf(x)}">
                ♡
            </button>

        </div>
        `;
    });

    setupcartButtons();
}

displaymenu(menu);


// FAVORITES

document.addEventListener("click", function(e) {

    if(e.target.classList.contains("favbtn")) {

        if(e.target.innerHTML === "♡") {
            e.target.innerHTML = "❤️";
        }
        else {
            e.target.innerHTML = "♡";
        }
    }
});


// CATEGORY FILTER

const categoryButtons =
    document.querySelectorAll(".categories-btn");

categoryButtons.forEach(function(button) {

    button.addEventListener("click", function() {

        const category = button.textContent;

        if(category === "All") {

            displaymenu(menu);
            return;
        }

        if(category === "Popular") {

            const popularmenu = menu.filter(function(item) {
                return item.popular === true;
            });

            displaymenu(popularmenu);
            return;
        }

        const filteredmenu = menu.filter(function(item) {
            return item.category === category;
        });

        displaymenu(filteredmenu);

    });

});


// ADD TO CART

function setupcartButtons() {

    const cartbuttons =
        document.querySelectorAll(".cartbtn");

    cartbuttons.forEach(function(button) {

        button.addEventListener("click", function() {

            const item = menu[button.value];

            if(item.quantity === 0) {

                cart.push(item);
            }

            item.quantity++;

            displaycart();

        });

    });

}


// DISPLAY CART

function displaycart() {

    cartitems.innerHTML = "";

    let sum = 0;

    if(cart.length === 0) {

        cartitems.innerHTML = "No Items Selected";
        prices.innerHTML = "TOTAL PRICE:0";

        return;
    }

    cart.forEach(function(item, index) {

        cartitems.innerHTML += `
        <div class="cart-row">

            <span>
                ${item.name} : ${item.price}
            </span>

            <button class="minus" value="${index}">
                −
            </button>

            <span>
                ${item.quantity}
            </span>

            <button class="plus" value="${index}">
                +
            </button>

            <button class="rembtn" value="${index}">
                REMOVE
            </button>

        </div>
        `;

        sum += item.price * item.quantity;

    });

    prices.innerHTML = "TOTAL PRICE:" + sum;

    setupCartControls();
}


// PLUS / MINUS / REMOVE

function setupCartControls() {

    const plusbuttons =
        document.querySelectorAll(".plus");

    plusbuttons.forEach(function(button) {

        button.addEventListener("click", function() {

            cart[button.value].quantity++;

            displaycart();

        });

    });


    const minusbuttons =
        document.querySelectorAll(".minus");

    minusbuttons.forEach(function(button) {

        button.addEventListener("click", function() {

            const item = cart[button.value];

            item.quantity--;

            if(item.quantity === 0) {

                cart.splice(button.value, 1);
            }

            displaycart();

        });

    });


    const rembuttons =
        document.querySelectorAll(".rembtn");

    rembuttons.forEach(function(button) {

        button.addEventListener("click", function() {

            cart[button.value].quantity = 0;

            cart.splice(button.value, 1);

            displaycart();

        });

    });

}


// CLEAR CART

const clearButton =
    document.getElementById("clear");

clearButton.addEventListener("click", function() {

    cart.forEach(function(item) {
        item.quantity = 0;
    });

    cart = [];

    displaycart();

});


// SEARCH

const search =
    document.querySelector(".search");

search.addEventListener("input", function() {

    const result = menu.filter(function(item) {

        return item.name
            .toLowerCase()
            .includes(search.value.toLowerCase());

    });

    displaymenu(result);

});


// SORT

const sort =
    document.querySelector(".Sort");

sort.addEventListener("click", function() {

    const ascending = [...menu].sort(function(a, b) {

        return a.price - b.price;

    });

    displaymenu(ascending);

});


// DARK MODE

const darkmode =
    document.getElementById("darkmode");

darkmode.addEventListener("click", function() {

    document.body.classList.toggle("dark");

    if(document.body.classList.contains("dark")) {

        darkmode.innerHTML = "☀️ Light Mode";

    }
    else {

        darkmode.innerHTML = "🌙 Dark Mode";

    }

});


// COUPON

const coupon =
    document.getElementById("coupon");

const apply =
    document.getElementById("apply");

const discount =
    document.getElementById("discount");

apply.addEventListener("click", function() {

    if(coupon.value.toUpperCase() === "CAMPUS10") {

        discount.innerHTML =
            "10% discount applied!";

    }
    else {

        discount.innerHTML =
            "Invalid coupon ❌";

    }

});


// ORDER

const confirmbtn =
    document.querySelector(".cnfrm-btn");

const statusBox =
    document.getElementById("order-status");

const summaryBox =
    document.getElementById("order-summary");


confirmbtn.addEventListener("click", function() {

    if(cart.length === 0) {

        message.innerHTML = "CART IS EMPTY ❌";

        return;
    }


    const token =
        Math.floor(1000 + Math.random() * 9000);


    let subtotal = 0;


    cart.forEach(function(item) {

        subtotal +=
            item.price * item.quantity;

    });


    let discountAmount = 0;


    if(coupon.value.toUpperCase() === "CAMPUS10") {

        discountAmount =
            subtotal * 0.10;

    }


    const finalAmount =
        subtotal - discountAmount;


    // ORDER HISTORY

    orderHistory.push({

        token: token,

        items: cart.map(function(item) {

            return {

                name: item.name,

                quantity: item.quantity

            };

        }),

        total: finalAmount

    });


    displayHistory();


    // SUCCESS MESSAGE

    message.innerHTML =
        "ORDERED SUCCESSFULLY ❤️ TOKEN NO: " + token;


    // ORDER SUMMARY

    summaryBox.innerHTML = `

        <h2>🧾 Order Summary</h2>

        <p>
            <b>Token:</b> ${token}
        </p>

        ${cart.map(function(item) {

            return `
                <p>
                    ${item.name} × ${item.quantity}
                    = ₹${item.price * item.quantity}
                </p>
            `;

        }).join("")}

        <hr>

        <p>Subtotal: ₹${subtotal}</p>

        <p>Discount: -₹${discountAmount}</p>

        <h3>
            Final Amount: ₹${finalAmount}
        </h3>

    `;


    // ORDER STATUS

    statusBox.innerHTML = `

        <h2>⏱️ Order Status</h2>

        <p>Token: ${token}</p>

        <div class="status">

            <div id="placed"
                 class="status-step active">

                ✓ Placed

            </div>

            <div id="preparing"
                 class="status-step">

                Preparing

            </div>

            <div id="ready"
                 class="status-step">

                Ready

            </div>

        </div>

    `;


    // PREPARING

    setTimeout(function() {

        document
            .getElementById("preparing")
            .classList.add("active");

    }, 3000);


    // READY

    setTimeout(function() {

        document
            .getElementById("ready")
            .classList.add("active");

        message.innerHTML =
            "🔔 ORDER READY! TOKEN: " + token;

    }, 6000);


    // CLEAR CART

    cart.forEach(function(item) {

        item.quantity = 0;

    });

    cart = [];

    displaycart();

});


// ORDER HISTORY

function displayHistory() {

    const historyList =
        document.getElementById("history-list");


    if(orderHistory.length === 0) {

        historyList.innerHTML =
            "No previous orders";

        return;
    }


    historyList.innerHTML = "";


    orderHistory.forEach(function(order) {

        historyList.innerHTML += `

            <div class="history-card">

                <h3>
                    🎟️ Token: ${order.token}
                </h3>

                ${order.items.map(function(item) {

                    return `
                        <p>
                            ${item.name} ×
                            ${item.quantity}
                        </p>
                    `;

                }).join("")}

                <strong>
                    Total: ₹${order.total}
                </strong>

            </div>

        `;

    });

}


// RATINGS

const stars =
    document.querySelectorAll(".star");

const reviewbtn =
    document.getElementById("reviewbtn");

const reviewmessage =
    document.getElementById("reviewmessage");


stars.forEach(function(star) {

    star.addEventListener("click", function() {

        rating = Number(star.value);


        stars.forEach(function(s) {

            if(Number(s.value) <= rating) {

                s.innerHTML = "★";

            }
            else {

                s.innerHTML = "☆";

            }

        });

    });

});


reviewbtn.addEventListener("click", function() {

    if(rating === 0) {

        reviewmessage.innerHTML =
            "Please select a rating.";

        return;
    }


    reviewmessage.innerHTML =
        "Thanks for your feedback! ⭐ "
        + rating + "/5";

});