
var cacheName = 'v4';

var cacheFiles = [
    './',
    './index.html',
    './css/stylesheet.css',
    './css/materialize.css',
    './css/materialize.min.css',
    'https://fonts.googleapis.com/icon?family=Material+Icons',
    './dist/main.bundle.js',
    './images/offline.png',
    './fonts/roboto/Roboto-Bold.woff2',
    './fonts/roboto/Roboto-Medium.woff2',
    './fonts/roboto/Roboto-Regular.woff2',
    './fonts/roboto/Roboto-Light.woff2',
    './manifest.json'
]
var upgredeResource = [
    'http://localhost:3000/categories',
    'http://localhost:3000/products',

]
var syncResource = [];

self.addEventListener('install', function (e) {
    console.log("[ServiceWorker] Installed");
    e.waitUntil(
        caches.open(cacheName)
            .then(cache => addFilesToCache(cacheFiles, cache))
    )
})
//aggiunge tutti i file nell'array alla cache
function addFilesToCache(cacheFiles, cache) {
    console.log("[ServiceWorker] Caching cacheFiles ");
    return cache.addAll(cacheFiles);
}

self.addEventListener('activate', function (e) {
    console.log("[ServiceWorker] Activated")
    e.waitUntil(
        caches.keys()
            .then(cacheNames => filterKeysByOld(cacheNames, cacheName))
            .then(oldCacheNames => deleteCachces(oldCacheNames))
    )
})
//trovo tutti i nomi delle cache e filtro l'array per trovare tutte quelle che non corrispondono alla cache corrente
function filterKeysByOld(array, keyName) {
    return array.filter(name => name !== keyName)
}
// rimuove tutte le caches vecchie
function deleteCachces(oldCacheNames) {
    var arrayPromise = oldCacheNames.map(element => {
        console.log("[ServiceWorker] Removing Cached Files from ", element);
        return caches.delete(element);
    })
    return Promise.all(arrayPromise);
}


self.addEventListener('fetch', function (e) {

    if (/\b\.jpg\b/.test(e.request.url)) {
        console.log('[SW] Risorsa richiesta IMG: ', e.request.url)
        e.respondWith(
            fetch(e.request)
                .catch(() => checkInCache(e.request))
                .catch(() => getOfflineImage())
        );
        return;
    } 
    
    if((upgredeResource.indexOf(e.request.url) > -1)) {
            console.log('[SW] Risorsa richiesta Upgrade: ', e.request.url)
            e.respondWith(
                fetch(e.request)
                    .then(response => putInCache(e.request,response))
                    .catch(() => checkInCache(e.request))
            );
            return;
    }
    if(syncResource.indexOf(e.request.url) > -1){
        console.log('[SW] Risorsa richiesta Sync: ', e.request.url)
        
    }
    console.log('[SW] Risorsa richiesta non presente: ', e.request.url)
    e.respondWith(
        checkInCache(e.request)
            .catch(() => fetch(e.request)).catch(getOfflineImage())
    );
})


function getOfflineImage() {
    return caches.match(new Request("./images/offline.png"));
}
function putInCache(request,response) {
    var responseClone = response.clone();
        caches.open(cacheName)
            .then(function (cache) {
                console.log("Put File In cache ")
                cache.put(request, responseClone);
            });
    return response;
}

function checkInCache(eventRequest) {
    return caches.match(eventRequest)
        .then(response => {
            if (response) {
                console.log("[ServiceWorker] Is resource in cache? ", !!response);
                return response;
            }
            throw new Error('');
        });
}


