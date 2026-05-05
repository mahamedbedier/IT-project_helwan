const CartManager = {
    getCart: () => JSON.parse(localStorage.getItem('muntaj_cart')) || [],
    saveCart: (cart) => localStorage.setItem('muntaj_cart', JSON.stringify(cart)),
    addToCart: (product) => {
        let cart = CartManager.getCart();
        const existing = cart.find(item => item.title === product.title);
        if (existing) {
            existing.qty = (parseInt(existing.qty) || 1) + 1;
        } else {
            product.qty = 1;
            cart.push(product);
        }
        CartManager.saveCart(cart);
        CartManager.updateGlobalTotal();
    },
    removeFromCart: (title) => {
        let cart = CartManager.getCart();
        cart = cart.filter(item => item.title !== title);
        CartManager.saveCart(cart);
        CartManager.updateGlobalTotal();
    },
    updateQty: (title, newQty) => {
        let cart = CartManager.getCart();
        const item = cart.find(item => item.title === title);
        if (item) {
            item.qty = parseInt(newQty) || 1;
            CartManager.saveCart(cart);
            CartManager.updateGlobalTotal();
        }
    },
    updateGlobalTotal: () => {
        const cart = CartManager.getCart();
        let grandTotal = 0;
        cart.forEach(item => {
            const cleanPrice = parseFloat(item.price.replace(/[^\d.]/g, '')) || 0;
            grandTotal += (cleanPrice * (parseInt(item.qty) || 1));
        });
        localStorage.setItem('orderTotal', grandTotal.toFixed(2) + " EGP");
    }
};

document.addEventListener('DOMContentLoaded', () => {
    const themeBtn = document.getElementById('theme-switcher');
    if (themeBtn) {
        const currentTheme = localStorage.getItem('theme') || 'light';
        document.body.classList.toggle('dark-theme', currentTheme === 'dark');
        themeBtn.onclick = () => {
            const isDark = document.body.classList.toggle('dark-theme');
            localStorage.setItem('theme', isDark ? 'dark' : 'light');
        };
    }

    if (document.getElementById('cartbody')) {
        renderCartUI();
    }

    if (document.getElementById('price')) {
        const savedTotal = localStorage.getItem('orderTotal') || "0.00 EGP";
        document.getElementById('price').innerText = savedTotal;
    }

    if (window.location.pathname.includes('product-details.html')) {
        if (typeof loadProductDetails === 'function') loadProductDetails();
    }
});

document.addEventListener('click', (e) => {
    const atcBtn = e.target.closest('#atcbutton');
    if (atcBtn) {
        const product = {
            title: document.getElementById('details_title').innerText,
            price: document.getElementById('details_price').innerText,
            image: document.getElementById('details_img').src
        };
        CartManager.addToCart(product);
        alert("Product added to cart!");
    }

    const bnBtn = e.target.closest('#bnbutton') || e.target.closest('.checkoutbutton');
    if (bnBtn) {
        if (document.getElementById('details_price')) {
            localStorage.setItem('orderTotal', document.getElementById('details_price').innerText);
        }
    }
});

function renderCartUI() {
    const tbody = document.getElementById('cartbody');
    const totalDisplay = document.getElementById('totalprice');
    if (!tbody) return;

    const cart = CartManager.getCart();
    tbody.innerHTML = "";
    let grandTotal = 0;

    if (cart.length === 0) {
        tbody.innerHTML = '<tr><td colspan="4" style="text-align:center; padding:50px;">Your cart is empty</td></tr>';
        if (totalDisplay) totalDisplay.innerText = "0.00 EGP";
        localStorage.setItem('orderTotal', "0.00 EGP");
        return;
    }

    cart.forEach(item => {
        const cleanPrice = parseFloat(item.price.replace(/[^\d.]/g, '')) || 0;
        const itemTotal = cleanPrice * (parseInt(item.qty) || 1);
        grandTotal += itemTotal;
        
        tbody.innerHTML += `
            <tr>
                <td>
                    <div class="productsection">
                        <img src="${item.image}" alt="${item.title}">
                        <div><h3>${item.title}</h3></div>
                    </div>
                </td>
                <td>
                    <div class="quantitybox">
                        <input type="number" value="${item.qty || 1}" min="1" onchange="updateQtyHandler('${item.title}', this.value)">
                    </div>
                </td>
                <td><strong>${item.price}</strong></td>
                <td>
                    <button class="iconbutton deletebutton" onclick="removeHandler('${item.title}')">
                        <i class="fas fa-trash-alt"></i>
                    </button>
                </td>
            </tr>`;
    });

    const finalTotal = grandTotal.toFixed(2) + " EGP";
    if (totalDisplay) totalDisplay.innerText = finalTotal;
    localStorage.setItem('orderTotal', finalTotal);
}

window.updateQtyHandler = (title, val) => {
    CartManager.updateQty(title, val);
    renderCartUI();
};

window.removeHandler = (title) => {
    CartManager.removeFromCart(title);
    renderCartUI();
};
