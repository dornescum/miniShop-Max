// clasa initiala
class Product {
    // asta e ca exercitiu=================
    title = "Default";
    imageUrl;
    description;
    price;

    // pt ca oricum le definim in constructor=============

    constructor(title, image, desc, price) {
        this.title = title;
        this.imageUrl = image;
        this.description = desc;
        this.price = price;
    }
}

// clasa 4
class ShoppingCart {
    items = [];

    addProduct(product){
        this.items.push(product);
        this.totalOutput.innerHTML =`<h2>Total \$ ${1}</h2> 
 `
    }

    render() {
        const cartEl = document.createElement('section');
        cartEl.innerHTML = `
        <h2>Total \$ ${0}</h2>
        <button>Order now!</button>
        `;
        cartEl.className = 'cart';
        // sa fac legatura intre cartEl si addProduct cu valoarea din h2
        this.totalOutput = cartEl.querySelector("h2")
        return cartEl;
    }
}

// clasa 3 produs individual
class ProductItem {
    constructor(product) {
        this.product = product;
    }

    addToCart() {
        App.addProductToCart(this.product)
    }

    render() {
        const prodEl = document.createElement("li");
        prodEl.classList = "product-item";
        prodEl.innerHTML = `
         <div>
            <img src="${this.product.imageUrl}" alt="${this.product.title}">
            <div class="product-item__content">     
                       <h2>${this.product.title}</h2>
                     <h3>\$${this.product.price}</h3>
                     <p>${this.product.description}</p>
            <button>Add to cart</button>
               </div>
         </div>
            `
        const addCartButton = prodEl.querySelector("button");
        // fara bind(this) nu accesa produsul si imi dadea undefined
        addCartButton.addEventListener("click", this.addToCart.bind(this))
        return prodEl;
    }
}

// clasa 2 unde listez toate produsele
class ProductList {
    products = [new Product(
        "a pillow",
        "https://images.unsplash.com/photo-1580460848618-b1a43e74519b?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=750&q=80",
        'lorem leorem lorem lorem pillow',
        29.99
    ),
        new Product(
            "a pillow",
            "https://images.unsplash.com/photo-1534889156217-d643df14f14a?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=700&q=80",
            'lorem leorem lorem lorem carpet',
            19.99
        ),
    ];

    constructor() {
    }

    render() {
        // legatura initiala cu html
        // const renderHook = document.getElementById("app");
        const prodList = document.createElement("ul");
        prodList.className = 'product-list';
        for (const prod of this.products) {
            const productItem = new ProductItem(prod);
            const prodEl = productItem.render()
            prodList.appendChild(prodEl)
        }
        // renderHook.append(prodList);
        return prodList;
    }
}

// clasa 5
class Shop {
    render() {
        const renderHook = document.getElementById("app");
// this.cart face legatura cu shopping cart pt ca am fol STATIC init in class App
        this.cart = new ShoppingCart();
        const cartEl = this.cart.render();
        const productList = new ProductList()
        const productListEl = productList.render();

        renderHook.append(cartEl);
        renderHook.append(productListEl);
    }
}
// clasa 6
class App{
    static cart;

    static init(){
        const shop = new Shop();
        shop.render();
        this.cart = shop.cart;
    }

    static addProductToCart(product){
        this.cart.addProduct(product)
    }
}

App.init();