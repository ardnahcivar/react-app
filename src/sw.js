importScripts("https://storage.googleapis.com/workbox-cdn/releases/3.6.3/workbox-sw.js");


const precacheManifest = [];
workbox.precaching.suppressWarnings();
workbox.precaching.precacheAndRoute(precacheManifest);

const expiry = [
    new workbox.expiration.Plugin({
      maxAgeSeconds: 60 * 60 * 15,
    })
]
  
workbox.routing.registerRoute(new RegExp('^https://api.github.com/'),
 new workbox.strategies.CacheFirst({
     cacheName:'word-list',
     plugins:expiry
    }),
 'GET');

workbox.routing.registerRoute(new RegExp('^https://raw.githubusercontent.com/'),
 new workbox.strategies.CacheFirst({
     cacheName:'word-data',
     plugins:expiry
    }),
 'GET');


workbox.routing.registerRoute(
    /.*.(?:png|jpg|jpeg|svg)$/,
    workbox.strategies.cacheFirst({
        cacheName:'word-images',
        plugins:[
            new workbox.expiration.Plugin({
                maxAgeSeconds: 60 * 60 * 24 * 30,
            })
        ]
    }),
    'GET'
);

self.addEventListener('install',function(event){
    self.skipWaiting();
})