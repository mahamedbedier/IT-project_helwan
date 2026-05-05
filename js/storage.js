const StorageManager = {
    saveTheme: (isDark) => {
        localStorage.setItem('muntaj_theme', isDark ? 'dark' : 'light');
    },
    getTheme: () => {
        return localStorage.getItem('muntaj_theme') || 'light';
    },
    getCart: () => {
        const cart = localStorage.getItem('muntaj_cart');
        return cart ? JSON.parse(cart) : [];
    },
    saveCart: (cart) => {
        localStorage.setItem('muntaj_cart', JSON.stringify(cart));
    },
    addToCart: (product) => {
        let cart = StorageManager.getCart();
        const existing = cart.find(item => item.name === product.name);
        if (existing) {
            existing.qty += 1;
        } else {
            cart.push({ ...product, qty: 1 });
        }
        StorageManager.saveCart(cart);
    },
    updateQuantity: (productName, newQty) => {
        let cart = StorageManager.getCart();
        const product = cart.find(item => item.name === productName);
        if (product) {
            product.qty = parseInt(newQty);
            if (product.qty <= 0) {
                cart = cart.filter(item => item.name !== productName);
            }
        }
        StorageManager.saveCart(cart);
    },
    removeFromCart: (productName) => {
        let cart = StorageManager.getCart();
        cart = cart.filter(item => item.name !== productName);
        StorageManager.saveCart(cart);
    },
    clearCart: () => {
        localStorage.removeItem('muntaj_cart');
    }
};

(function init() {
    const theme = StorageManager.getTheme();
    if (theme === 'dark') {
        document.body.classList.add('dark-theme');
    }
})();
