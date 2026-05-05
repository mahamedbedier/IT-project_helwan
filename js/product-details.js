function saveProduct(title, price, image, desc, imaged1, imaged2, imaged3, imaged4) {
    const product = {
        title: title,
        price: price,
        image: image,
        desc: desc,
        imaged1: imaged1,
        imaged2: imaged2,
        imaged3: imaged3,
        imaged4: imaged4,
    };

    localStorage.setItem('selectedProduct', JSON.stringify(product));
    window.location.href = 'product-details.html';
}

function loadProductDetails() {
    const storedData = localStorage.getItem('selectedProduct');
    if (storedData) {
        const product = JSON.parse(storedData);

        document.getElementById('details_title').innerText = product.title;
        document.getElementById('details_price').innerText = product.price;
        document.getElementById('details_description').innerText = product.desc;
        
        const mainImg = document.getElementById('details_img');
        mainImg.src = product.image;

        const thumb1 = document.getElementById('thumb1');
        const thumb2 = document.getElementById('thumb2');
        const thumb3 = document.getElementById('thumb3');
        const thumb4 = document.getElementById('thumb4');

        thumb1.src = product.imaged1;
        thumb2.src = product.imaged2;
        thumb3.src = product.imaged3;
        thumb4.src = product.imaged4;

        thumb1.onclick = function() {
            mainImg.src = thumb1.src;
        };
        
        thumb2.onclick = function() {
            mainImg.src = thumb2.src;
        };
        
        thumb3.onclick = function() {
            mainImg.src = thumb3.src;
        };
        
        thumb4.onclick = function() {
            mainImg.src = thumb4.src;
        };
    }
}
