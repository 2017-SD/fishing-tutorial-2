/** SERVICE WORKER */

self.addEventListener('install', function (event) {
    self.skipWaiting()
        caches.open('fish')
            .then(function (cache) {
                return cache.addAll(
                    [
                        '/',
                        '/assets/bundle.js?compile=false',
                        '/assets/favicon.ico',
                        '/assets/bootstrap.css?compile=false',
                        '/assets/bootstrap.js?compile=false',
                        '/assets/jquery-2.2.0.min.js?compile=false'
                    ]
                );
            })
            .catch(e => {console.error(`error in caches: ${e}`)})
    console.log('Install event:', event);
});


// Cache falling back to the network
// https://developers.google.com/web/ilt/pwa/caching-files-with-service-worker
self.addEventListener('fetch', function(event) {
    event.respondWith(
        caches.match(event.request).then(function(response) {
            return response || fetch(event.request);
        })
    );
});

