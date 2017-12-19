
//function that generate html page for each products
function generateProduct(product) {
    return ` <div class="col s12 m6 l6 xl4 ">
                <div class="card small">
                    <div class="card-image waves-effect waves-block waves-light"> 
                        <a href="/products/${product.id}" >
                            <img class="activator" src="${product.src}">
                        </a>
                    </div>
                    <div class="card-content">
                        <span class="card-title activator grey-text text-darken-4">${product.name}</span>
                         <p calss="prod-id" style="display:none">${product.id}</p>
                        <p class="caption"><b>Price</b>${product.price}</p>
                        <p class="caption-in-stock ${product.inStock ? "green" : "red"}-text">${product.inStock ? "In Stock" : "Out Of Stock"}</p>
                    </div>
                </div>
            </div>`;
}

function generateProducts(prodotti, i) {
    if (!prodotti[i])
        return "";
    return generateProduct(prodotti[i]) + generateProducts(prodotti, i + 1);
}


function generateCategory(category) {
    return `<div class="col s12 m6 l6 xl4 ">
            <div class="card">
                <div class="card-image waves-effect waves-block waves-light">
                    <a href="/categories/${category.id}" >
                    <img class="activator "  src="${category.src}">
                    </a>
                            </div>
                    <div class="card-content">
                        <span class="card-title activator grey-text text-darken-4">${category.name.toUpperCase()}</span>
                    </div>

                </div>
            </div>`;
}

function generateCategories(categories, i) {
    if (!categories[i])
        return "";
    return generateCategory(categories[i]) + generateCategories(categories, i + 1);
}


function generateShopProduct(shopProduct) {
    var html = `<tr>
                        <td>${shopProduct.name}</td>
                        <td>$${shopProduct.price}</td>
                        <td>${shopProduct.quantity}</td>
                        <td>$${shopProduct.price * shopProduct.quantity}</td>
                        <td>
                            <a class="btn-floating btn black ">
                                <i  class="material-icons deleteProd" data-idValue="${shopProduct.id}">delete</i>
                            </a>
                        </td>
                    </tr>`

    return html;
}

function generateShopProducts(shopProducts, i) {
    if (!shopProducts[i])
        return "";
    return generateShopProduct(shopProducts[i]) + generateShopProducts(shopProducts, i + 1);
}

function generateTotal(shopProducts, i) {
    if (!shopProducts[i]) return 0;
    return (parseInt(shopProducts[i].price) * parseInt(shopProducts[i].quantity)) + generateTotal(shopProducts, i + 1);
}

function getProductById(id) {
    return fetch('https://mpr75aa5n1.execute-api.eu-west-1.amazonaws.com/dev/products')
        .then(function (response) {
            return response.json();
        }).then(function (json) {
            return json.reduce(function (found, prod) {
                return prod.id == id ? prod : found;
            }, null);
        });
}
function getCategory() {
    return fetch('https://mpr75aa5n1.execute-api.eu-west-1.amazonaws.com/dev/categories').then(function (response) {
        console.log(response);
        return response.json();
    }).then(function (json) {
        return json;
    });

}
function getProductByCategory(id) {
    return fetch('https://mpr75aa5n1.execute-api.eu-west-1.amazonaws.com/dev/products')
        .then(function (response) {
            return response.json();
        }).then(function (json) {
            return json.filter(function (prod) {
                return prod.categoryId == id;
            });
        });
}

function getShoppingCartProduct() {
    return fetch('https://mpr75aa5n1.execute-api.eu-west-1.amazonaws.com/dev/shoppingCart')
        .then(function (response) {
            return response.json();
        }).then(function (json) {
            return json;
        });
}
function getProducts() {
    return fetch('https://mpr75aa5n1.execute-api.eu-west-1.amazonaws.com/dev/products')
        .then(function (response) {
            return response.json();
        })
        .then(function (json) {
            return json;
        });
}
function renderDetails(product) {
    var section = `
    <div class="section scrollspy">
        <div class="col s12 m6 l6 xl4 ">
            <div class="card">
                <div class="card-image waves-effect waves-block waves-light">
                   <img class="activator" src="${product.src}">
                </div>
                <div class="card-content">
                    <span class="card-title activator grey-text text-darken-4">${product.name}</span>
                </div>
            </div>
    </div>`
    var col = `
    <div class="col s12 m6 l6 xl4">
        <h4 class="caption"> ${product.name}</h4>
        <p calss="prod-id" style="display:none">${product.id}</p>
        <p class="caption">
            <b>Price</b>:$${product.price}</p>
        <p class="caption-in-stock ${product.inStock ? "green" : "red"}-text">${product.inStock ? "In Stock " : "Out Of Stock"}.</p>
        <p class="caption "><b>Description:</b><br>Basic white background card with tabs.</p><br>
             Quantity
                <div class="input-field col s12">
                <select id="quantityProd" >
                            <option value="1" selected="">1</option>
                            <option value="2">2
                            </option>
                            <option value="3">3
                            </option>
                            <option value="4">4
                            </option>
                            <option value="5">5
                            </option>
                            <option value="6">6
                            </option>                       
                            <option value="7">7
                            </option>                       
                            <option value="8">8
                            </option>                        
                            <option value="9">9
                            </option>                        
                            <option value="10">10
                            </option>                  
                </select>
                </div>
                <button id="addToCart" class="btn waves-effect waves-light right" type="submit" name="action" >Add to Cart
                <i class="material-icons right">send</i>
                </button>
                </div>
    </div >`

    var gallery = `<h5 class="caption">Gallery</h5>
                        <div class="divider"></div>
                        <br>
                        <div class="row">
                            <div class="col s4 m1 l1 xl1 ">
                                <img class="materialboxed" width="50" height="50" src="images/clothing.jpg">
                            </div>
                            <div class="col s4 m1 l1 xl1 ">
                                <img class="materialboxed" width="50" height="50" src="images/clothing.jpg">
                            </div>
                            <div class="col s4 m1 l1 xl1 ">
                                <img class="materialboxed" width="50" height="50" src="images/clothing.jpg">
                            </div>
                            <div class="col s4 m1 l1 xl1 ">
                                <img class="materialboxed" width="50" height="50" src="images/clothing.jpg">
                            </div>
                            <div class="col s4 m1 l1 xl1 ">
                                <img class="materialboxed" width="50" height="50" src="images/clothing.jpg">
                            </div>
                        </div>`;
    
    document.getElementById("grid-container").innerHTML = ` <div class="row">${section}${col}</div>${gallery}<br><div class="divider"></div><h5 class="caption">Review</h5><br><div class="divider"></div><h5 class="caption">Other Products</h5>`
    $('select').material_select();
    $("#addToCart").click({ idProduct: product.id }, addToCart);


}

function renderNotFound() {
    document.getElementById("grid-container").innerHTML = `<div class="not found"> Product Not Found</div>`
}

function addToCart(event) {

    var id = event.data.idProduct;
    var quantity = parseInt(document.getElementById("quantityProd").value);
    let data = {
        id: id,
        quantity: quantity
    }
    console.log(JSON.stringify(data));
    fetch("https://mpr75aa5n1.execute-api.eu-west-1.amazonaws.com/dev/addToCart", {
        method: 'POST',
        body: JSON.stringify(data),
        headers: {
            "Accept": "application/json",
            "Content-Type": "application/json"
        }
    })
        .then(function (response) {
            return response.json();
        })
        .then(function (json) {
            return console.log(json);
        })
    Materialize.toast('Product add to shoppinCart! ', 2000)
}
function removeToCart(id) {
    let data = {
        id: id
    }
    console.log(JSON.stringify(data));
    fetch("https://mpr75aa5n1.execute-api.eu-west-1.amazonaws.com/dev/removeToCart", {
        method: 'POST',
        body: JSON.stringify(data),
        headers: {
            "Accept": "application/json",
            "Content-Type": "application/json"
        }
    })
        .then(function (response) {
            pageShoppingCart();
            return response.json()
        })
        .then(function (json) {
            return console.log(json);
        })

}
//function that generate html page 
function pageDetails(id) {
    getProductById(id)
        .then(prod => prod ? renderDetails(prod) : renderNotFound())
        .then(function () {
            $('.materialboxed').materialbox();

        });

}

function pageCategories() {
    getCategory().then(cat => document.getElementById("grid-container").innerHTML =
        `<div class="row"><div class="section scrollspy">
             ${generateCategories(cat, 0)}
        </div>
    </div>`);
    $('.selectProd').click(function () {
        var id = this.dataset.idvalue;
        pageProducts(id);
    });

}

function pageShoppingCart() {
    getShoppingCartProduct().then(prod => {
        var thead = `<thead>
                        <tr>
                            <th>Product</th>
                            <th>Price</th>
                            <th>Quantity</th>
                            <th>Total</th>
                            <th>Modify</th>
                        </tr>
                    </thead>`;
        var tfoot = `<tfoot>
                        <tr>
                            <td colspan="3" style="text-align: right">
                                <strong>Total</strong>
                            </td>
                            <td>$${generateTotal(prod, 0)}</td>
                            <td></td>
                        </tr>
                    </tfoot>`;
        var divider = `<div class="divider"></div>`;
        var btnCheckOut = `<button class="btn waves-effect waves-light right" type="submit" name="action">CheckOut
                                <i class="material-icons right">send</i>
                            </button>`;
        document.getElementById("grid-container").innerHTML = `<table class="bordered">${thead}<tbody>${generateShopProducts(prod, 0)}<tbody>${tfoot}</table>${divider}<br>${btnCheckOut}`
        $('.deleteProd').click(function () {
            var id = this.dataset.idvalue;
            removeToCart(id);
        });

    })
}

function pageProducts() {
    getProducts().then(prod => {
        document.getElementById("grid-container").innerHTML = `<div class="row"><div class="section scrollspy">${generateProducts(prod, 0)}</div></div>`;
    });
}

function pageProductsByCategory(id) {
    getProductByCategory(id).then(prod => { document.getElementById("grid-container").innerHTML = `<div class="row"><div class="section scrollspy">${generateProducts(prod, 0)}</div></div>`; })
}

function pageMenu() {
    document.getElementById("grid-container").innerHTML = `<div class="parallax-container">
                <div class="parallax">
                    <img class="activator" src="images/games.jpg">
                    <h1>GAMES</h1>
                </div>
            </div>
            <div class="divider">
            </div>
            <div class="parallax-container">
                <div class="parallax">
                    <img src="images/sports.jpg">
                    <h1>SPORTS</h1>
                </div>
            </div>

            <div class="divider">
            </div>
            <div class="parallax-container">
                <div class="parallax">
                    <img src="images/electronics.jpg">
                    <h1>ELECTRONICS</h1>
                </div>
            </div>

            <div class="divider"> </div>
            <div class="parallax-container">
                <div class="parallax">
                    <img src="images/music.jpg">
                    <h1>MUSIC</h1>
                </div>
            </div>
            <div class="parallax-container">
                <div class="parallax">
                    <img src="images/clothing.jpg">
                    <h1>CLOTHING</h1>
                </div>
            </div>`
    $(document).ready(function () {
        $('.parallax').parallax();
    });
};

function pageNav() {
    document.getElementById("nav").innerHTML = `<nav class="top-nav">
            <div class="container">
                <div class="nav-wrapper>">
                    <a href="#" data-activates="nav-mobile" class="button-collapse top-nav full hide-on-large-only">
                        <i class="material-icons">menu</i>
                    </a>
                    <a class="page-title">
                        <b>Progressive Shop</b>
                    </a>
                </div>
            </div>
        </nav>
        <ul id="nav-mobile" class="side-nav fixed" style="transform: translateX(0%);">
            <li class="logo">
                <div class="user-view">
                    <a id="logo-container" href="/menu">
                        <img src="images/logo.jpg" width="250" height="250">
                    </a>
                </div>
            </li>
            <li>
                <a href="/menu">Home</a>
            </li>
            <li>
                <a href="/categories">Categories</a>
            </li>
            <li>
                <a href="/products">Products</a>
            </li>
            <li>
                <a href="/shoppingCart">Shopping Cart</a>
            </li>
            <li>
                <div class="divider"></div>
            </li>
            <li>
                <a class="subheader">info</a>
            </li>
            <li>
                <a class="waves-effect" href="#!">The company</a>
            </li>
        </ul>`
}


export { pageMenu, pageProducts, pageCategories, pageDetails, pageShoppingCart, pageNav, addToCart, pageProductsByCategory };