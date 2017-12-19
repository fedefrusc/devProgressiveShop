'use strict';

var db = require("./db.js");

module.exports.getProducts = (event, context, callback) => {
  db.getProduct()
    .then(items => callback(null, {
      headers: {
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Request-Method": "*",
        "Access-Control-Allow-Methods": "*",
        "Access-Control-Allow-Headers": "Content-Type, Accept"
      },
      body: JSON.stringify(items)
    }))
    .catch(err => callback(err))
}


module.exports.getCategories = (event, context, callback) => {
  db.getCategory()
    .then(items => callback(null, {
      headers: {
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Request-Method": "*",
        "Access-Control-Allow-Methods": "*",
        "Access-Control-Allow-Headers": "Content-Type, Accept"
      },
      body: JSON.stringify(items)
    }))
    .catch(err => callback(err))
}

module.exports.getShoppingCart = (event, context, callback) => {
  db.getShoppingCart()
    .then(items => callback(null, {
      headers: {
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Request-Method": "*",
        "Access-Control-Allow-Methods": "*",
        "Access-Control-Allow-Headers": "Content-Type, Accept"
      },
      body: JSON.stringify(items)
    }))
    .catch(err => callback(err))
}
module.exports.addToCart = (event, context, callback) => {
  var id = JSON.parse(event.body).id;
  var quantity = parseInt(JSON.parse(event.body).quantity);
  db.getShoppingCartProductById(id)
    .then(cartItem => db.updateQuantityInShoppingCart(id, quantity))
    .catch(error =>
      db.getProductById(id)
        .then(product => db.putProductInShoppingCart(product, quantity)))
    .then(item => callback(null, {
      headers: {
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Request-Method": "*",
        "Access-Control-Allow-Methods": "*",
        "Access-Control-Allow-Headers": "Content-Type, Accept"
      }, body: event.body
    }
    )
    )
    .catch(err => callback(null, {
      headers: {
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Request-Method": "*",
        "Access-Control-Allow-Methods": "*",
        "Access-Control-Allow-Headers": "Content-Type, Accept"
      }, body: console.log(JSON.parse(event.body).quantity, "catch")
    }
    )
    )
}
module.exports.removeToCart = (event, context, callback) => {
  var id = parseInt(JSON.parse(event.body).id);
  db.deleteProductFromShoppingCart(id)
    .then(items => callback(null, {
      headers: {
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Request-Method": "*",
        "Access-Control-Allow-Methods": "*",
        "Access-Control-Allow-Headers": "Content-Type, Accept"
      },
      body: JSON.stringify(items)
    }))
    .catch(err => callback(err,console.log("catch", id)))
}
