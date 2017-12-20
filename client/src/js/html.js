const config = require('./config')
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
    return fetch(config.serverUrl + '/products')
        .then(function (response) {
            return response.json();
        }).then(function (json) {
            return json.reduce(function (found, prod) {
                return prod.id == id ? prod : found;
            }, null);
        });
}
function getCategory() {
    return fetch(config.serverUrl + '/categories').then(function (response) {
        console.log(response);
        return response.json();
    }).then(function (json) {
        return json;
    });

}
function getProductByCategory(id) {
    return fetch(config.serverUrl + '/products')
        .then(function (response) {
            return response.json();
        }).then(function (json) {
            return json.filter(function (prod) {
                return prod.categoryId == id;
            });
        });
}

function getShoppingCartProduct() {
    return fetch(config.serverUrl + '/shoppingCart')
        .then(function (response) {
            return response.json();
        }).then(function (json) {
            return json;
        }).catch(function () { Materialize.toast('You are offline! ', 2000) })
}
function getProducts() {
    return fetch(config.serverUrl + '/products')
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
                                <img class="materialboxed" width="50" height="50" src="${product.src}">
                            </div>
                            <div class="col s4 m1 l1 xl1 ">
                                <img class="materialboxed" width="50" height="50" src="${product.src}">
                            </div>
                            <div class="col s4 m1 l1 xl1 ">
                                <img class="materialboxed" width="50" height="50" src="${product.src}">
                            </div>
                            <div class="col s4 m1 l1 xl1 ">
                                <img class="materialboxed" width="50" height="50" src="${product.src}">
                            </div>
                            <div class="col s4 m1 l1 xl1 ">
                                <img class="materialboxed" width="50" height="50" src="${product.src}">
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
    fetch(config.serverUrl + "/addToCart", {
        method: 'POST',
        body: JSON.stringify(data),
        headers: {
            "Accept": "application/json",
            "Content-Type": "application/json"
        }
    })
        .then(function (response) {
            Materialize.toast('Product add to shoppinCart! ', 2000);
            return response.json();
            
        })
        .then(function (json) {
            return console.log(json);
        })
        .catch(function(){Materialize.toast('You are offline! ', 2000)})
}
function removeToCart(id) {
    let data = {
        id: id
    }
    console.log(JSON.stringify(data));
    fetch(config.serverUrl + "/removeToCart", {
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
            <a class="waves-effect" href="/about">About</a>
            </li>
            </ul>`
}

function pageAbout(){
   return document.getElementById("grid-container").innerHTML =
`<div class="container">
            <h3 class="header center">About me</h3>
            <div class="container">
                <div class="col-lg-2">
                <img src="images/avatar.png" class="avatar avatar-100  photo" height="100" width="100"> </div>
                <div class="col-lg-10">
                <h5 class="typology-author-box-title">Federico Fruscella</h5>
                <div class="typology-author-desc">
                <p>I'm an informatic engineer student at Roma Tre university in Rome.
                   This project is my first experience in web development with javaScript.</p>
            </div>
        <div class="divider"></div>
        <h4 class="light red-text text-lighten-2 center">Use case of progressive web app.</h4>
        <blockquote><h5>An application born from Intership in a web development company</h5> </blockquote>
        <blockquote><h5>This web app is a simulation of an e-commerce application and have all characteristics of Progressive Web App</h5> </blockquote>
        <div class="divider"></div>
        <br></br>
        <ul class="collection with-header">
            <li class="collection-header"><h5>Characteristics</h5></li>
            <li class="collection-item">
                <h6><b>Progressive</b> - Work for every user, regardless of browser choice because they’re built with
                progressive enhancement as a core tenet.</h6>
            </li>
            <li class="collection-item">
                <b>Responsive</b> - Fit any form factor: desktop, mobile, tablet, or forms yet to emerge.</li>
            <li class="collection-item">
                <b>Connectivity independent</b> -
                Service workers allow work offline, or on low quality networks.</li>
            <li class="collection-item">
                <b>App-like</b> - Feel like an app to the user with app-style interactions and navigation.</li>
            <li class="collection-item">
                <b>Fresh</b> - Always up-to-date thanks to the service worker update process.</li>
            <li class="collection-item">
                <b>Safe</b> - Served via HTTPS to prevent snooping and ensure content hasn’t been tampered with.</li>
            <li class="collection-item">
                <b>Discoverable</b> - Are identifiable as “applications” thanks to W3C manifests
                    and service worker registration scope allowing search engines to find them.</li>
            <li class="collection-item">
                <b>Re-engageable</b> - Make re-engagement easy through features like push notifications.</li>
            <li class="collection-item">
                <b>Installable</b> - Allow users to “keep” apps they find most useful on their home screen without the hassle of an app
                store.</li>
            <li class="collection-item">
            <b>Linkable</b> - Easily shared via a URL and do not require complex installation.</li>
        </ul>
        <div class="divider"></div>
        <br>
        <b>GitHub link:</b><a href="https://github.com/fedefrusc/devProgressiveShop"> progressiveShop
        <br></br>

    </div>
</div>
  </div>`

}


export { pageMenu, pageProducts, pageCategories, pageDetails, pageShoppingCart, pageNav, addToCart, pageProductsByCategory , pageAbout};