var page = require('page')
require('materialize-css')
require('jquery');
import { pageMenu, pageProducts, pageCategories, pageDetails, pageShoppingCart, pageNav, addToCart, pageProductsByCategory} from './html';
import { setInterval } from 'timers';



//Initialize html pages
//page.base("/")
pageMenu()
pageNav();
page('/',pageMenu)
page('/menu', pageMenu)
page('/products', pageProducts)
page('/products/:id', ctx => { pageDetails(ctx.params.id) })
page('/categories', pageCategories)
page('/categories/:id', ctx => {pageProductsByCategory(ctx.params.id)})
page('/shoppingCart', pageShoppingCart)
page({ hashbang: true })




$(".button-collapse").sideNav();
// Initialize collapsible (uncomment the line below if you use the dropdown variation)
$('.collapsible').collapsible();
$('.button-collapse').sideNav({
    menuWidth: 300, // Default is 300
    edge: 'left', // Choose the horizontal origin
    closeOnClick: true, // Closes side-nav on <a> clicks, useful for Angular/Meteor
    draggable: true, // Choose whether you can drag to open on touch screens,
    onOpen: function (el) { /* Do Stuff */ }, // A function to be called when sideNav is opened
    onClose: function (el) { /* Do Stuff*/ }, // A function to be called when sideNav is closed
}
);

if ('serviceWorker' in navigator) {

    navigator.serviceWorker
        .register('./sw.js', { scope: './' })
        .then(function (registration) {
            console.log("Service Worker Registered");
        })
        .catch(function (err) {
            console.log("Service Worker Failed to Register", err);
        })
}





