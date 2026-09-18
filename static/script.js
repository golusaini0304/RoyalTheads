let cart = [];
let wishlist = [];

let currentProduct = null;


// =========================
// MOBILE MENU
// =========================

function toggleMobileMenu() {
    document.getElementById("navLinks").classList.toggle("active");
}


// =========================
// SEARCH
// =========================

function openSearch() {

    document
        .getElementById("searchOverlay")
        .classList.add("active");

    setTimeout(() => {
        document.getElementById("searchInput").focus();
    }, 200);
}


function closeSearch() {

    document
        .getElementById("searchOverlay")
        .classList.remove("active");

    document.getElementById("searchInput").value = "";

    showAllProducts();
}


function searchProducts() {

    const query =
        document
            .getElementById("searchInput")
            .value
            .toLowerCase()
            .trim();

    const cards =
        document.querySelectorAll(".product-card");

    cards.forEach(card => {

        const name =
            card.dataset.name;

        if (name.includes(query)) {
            card.style.display = "";
        } else {
            card.style.display = "none";
        }

    });

    if (query !== "") {
        closeMobileMenu();
    }
}


// =========================
// FILTER PRODUCTS
// =========================

function filterProducts(category, button = null) {

    const cards =
        document.querySelectorAll(".product-card");

    cards.forEach(card => {

        if (
            category === "All" ||
            card.dataset.category === category
        ) {
            card.style.display = "";
        } else {
            card.style.display = "none";
        }

    });


    document.querySelectorAll(".filter")
        .forEach(btn => btn.classList.remove("active"));


    if (button) {
        button.classList.add("active");
    } else {

        document.querySelectorAll(".filter")
            .forEach(btn => {

                if (
                    btn.innerText.trim().toLowerCase()
                    === category.toLowerCase()
                ) {
                    btn.classList.add("active");
                }

            });

    }

    document
        .getElementById("collection")
        .scrollIntoView({
            behavior: "smooth"
        });

    closeMobileMenu();
}


function showAllProducts() {

    document
        .querySelectorAll(".product-card")
        .forEach(card => {
            card.style.display = "";
        });
}


// =========================
// CART
// =========================

function addToCart(productId) {

    const product =
        products.find(p => p.id === productId);

    const existing =
        cart.find(item => item.id === productId);


    if (existing) {
        existing.quantity++;
    } else {

        cart.push({
            ...product,
            quantity: 1
        });

    }

    updateCart();

    showToast(product.name + " added to your bag");
}


function removeFromCart(productId) {

    cart =
        cart.filter(item => item.id !== productId);

    updateCart();
}


function changeQuantity(productId, amount) {

    const item =
        cart.find(item => item.id === productId);

    if (!item) return;

    item.quantity += amount;

    if (item.quantity <= 0) {
        removeFromCart(productId);
        return;
    }

    updateCart();
}


function updateCart() {

    const cartCount =
        cart.reduce(
            (total, item) =>
                total + item.quantity,
            0
        );


    document.getElementById("cartCount")
        .innerText = cartCount;


    const cartItems =
        document.getElementById("cartItems");


    if (cart.length === 0) {

        cartItems.innerHTML = `
            <div class="empty-cart">

                <i class="fa-solid fa-bag-shopping"></i>

                <h3>Your bag is empty</h3>

                <p>Add something you love.</p>

                <button onclick="closeCart(); location.href='#collection'">
                    SHOP NOW
                </button>

            </div>
        `;

    } else {

        cartItems.innerHTML =
            cart.map(item => `

                <div class="cart-item">

                    <img
                        src="${item.image}"
                        alt="${item.name}">

                    <div class="cart-item-details">

                        <h4>${item.name}</h4>

                        <span>${item.category}</span>

                        <div class="cart-item-price">
                            ₹${item.price.toLocaleString("en-IN")}
                        </div>

                        <div style="
                            display:flex;
                            gap:10px;
                            align-items:center;
                            margin-top:12px;
                        ">

                            <button
                                onclick="changeQuantity(${item.id}, -1)"
                                style="
                                    width:25px;
                                    height:25px;
                                    border:1px solid #ddd;
                                    background:white;
                                ">
                                -
                            </button>

                            <span>${item.quantity}</span>

                            <button
                                onclick="changeQuantity(${item.id}, 1)"
                                style="
                                    width:25px;
                                    height:25px;
                                    border:1px solid #ddd;
                                    background:white;
                                ">
                                +
                            </button>

                        </div>

                    </div>

                    <button
                        class="remove-item"
                        onclick="removeFromCart(${item.id})">

                        <i class="fa-solid fa-trash"></i>

                    </button>

                </div>

            `).join("");

    }


    const total =
        cart.reduce(
            (sum, item) =>
                sum + item.price * item.quantity,
            0
        );


    document.getElementById("cartTotal")
        .innerText =
        "₹" + total.toLocaleString("en-IN");
}


function openCart() {

    document
        .getElementById("cartSidebar")
        .classList.add("active");

    document
        .getElementById("cartOverlay")
        .classList.add("active");

    document.body.style.overflow = "hidden";
}


function closeCart() {

    document
        .getElementById("cartSidebar")
        .classList.remove("active");

    document
        .getElementById("cartOverlay")
        .classList.remove("active");

    document.body.style.overflow = "";
}


// =========================
// CHECKOUT
// =========================

function checkout() {

    if (cart.length === 0) {

        showToast("Your bag is empty");

        return;
    }


    alert(
        "Checkout Demo\n\n" +
        "In the final website, this button can connect to " +
        "Razorpay / Cashfree and an order-management system."
    );
}


// =========================
// QUICK VIEW
// =========================

function quickView(productId) {

    const product =
        products.find(p => p.id === productId);

    if (!product) return;

    currentProduct = product;


    document.getElementById("modalImage")
        .src = product.image;


    document.getElementById("modalCategory")
        .innerText = product.category;


    document.getElementById("modalName")
        .innerText = product.name;


    document.getElementById("modalRating")
        .innerText =
        product.rating +
        " (" +
        product.reviews +
        " reviews)";


    document.getElementById("modalDescription")
        .innerText = product.description;


    document.getElementById("modalPrice")
        .innerText =
        "₹" +
        product.price.toLocaleString("en-IN");


    document.getElementById("modalAddButton")
        .onclick = function () {

            addToCart(product.id);

            closeModal();

        };


    document
        .getElementById("productModal")
        .classList.add("active");

    document.body.style.overflow = "hidden";
}


function closeModal() {

    document
        .getElementById("productModal")
        .classList.remove("active");

    document.body.style.overflow = "";
}


// =========================
// SIZE / COLOR
// =========================

function selectSize(button) {

    document
        .querySelectorAll(".sizes button")
        .forEach(btn =>
            btn.classList.remove("selected")
        );

    button.classList.add("selected");
}


function selectColor(button) {

    document
        .querySelectorAll(".color")
        .forEach(btn =>
            btn.classList.remove("selected")
        );

    button.classList.add("selected");
}


// =========================
// WISHLIST
// =========================

function toggleWishlist(button, productId) {

    const icon =
        button.querySelector("i");


    if (wishlist.includes(productId)) {

        wishlist =
            wishlist.filter(id =>
                id !== productId
            );

        icon.className =
            "fa-regular fa-heart";

        showToast("Removed from wishlist");

    } else {

        wishlist.push(productId);

        icon.className =
            "fa-solid fa-heart";

        showToast("Added to wishlist");

    }


    document.getElementById("wishlistCount")
        .innerText = wishlist.length;
}


function showWishlist() {

    if (wishlist.length === 0) {

        showToast("Your wishlist is empty");

        return;
    }

    showToast(
        wishlist.length +
        " item(s) in your wishlist"
    );
}


// =========================
// NEWSLETTER
// =========================

function subscribe(event) {

    event.preventDefault();

    const email =
        document
            .getElementById("emailInput")
            .value;

    if (!email) return;

    document.getElementById("emailInput")
        .value = "";

    showToast(
        "Welcome to Royal Threads!"
    );
}


// =========================
// TOAST
// =========================

let toastTimer;

function showToast(message) {

    const toast =
        document.getElementById("toast");

    document.getElementById("toastMessage")
        .innerText = message;


    toast.classList.add("active");


    clearTimeout(toastTimer);

    toastTimer =
        setTimeout(() => {

            toast.classList.remove("active");

        }, 2500);
}


// =========================
// MOBILE MENU CLOSE
// =========================

function closeMobileMenu() {

    document
        .getElementById("navLinks")
        .classList.remove("active");
}


// =========================
// ESC KEY
// =========================

document.addEventListener("keydown", function(event) {

    if (event.key === "Escape") {

        closeSearch();
        closeCart();
        closeModal();

    }

});