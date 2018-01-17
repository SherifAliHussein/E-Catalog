const cacheName = 'E-Catalog-v1.3.2';
const RUNTIME = 'runtime';

// A list of local resources we always want to be cached.
const files = [
  // 'index.html',
  // './', // Alias for index.html
  'bundle-en.css',
  'bundle-ar.css',
  'app.js',
  'core.js',
  'libs.js',
  'templates.js',
  'turn.min-en.js',
  'turn.min-ar.js',
  'assets/img/back.png',
  'assets/img/back-ar.png',
  'assets/img/book.png',
  'assets/img/book-ar.png',
  'assets/img/page1.png',
  'assets/img/page2.png',
  'assets/img/plus.png',
  'assets/img/view.png'
];

self.addEventListener('install', (event) => {
    console.info('Event: Install');

    event.waitUntil(
      caches.open(cacheName)
      .then((cache) => {
        //[] of files to cache & if any of the file not present `addAll` will fail
        return cache.addAll(files)
        .then(() => {
          console.info('All files are cached');
          console.log(files);
          return self.skipWaiting(); //To forces the waiting service worker to become the active service worker
        })
        .catch((error) =>  {
          console.error('Failed to cache', error);
          console.log(error);
        })
      })
    );
  });


  self.addEventListener('fetch', (event) => {
  console.info('Event: Fetch');

  var request = event.request;
  
  //Tell the browser to wait for newtwork request and respond with below
  event.respondWith(
    //If request is already in cache, return it
    caches.match(request).then((response) => {
      if (response && !navigator.onLine) {
        return response;
      }

      //if request is not cached, add it to cache
      return fetch(request).then((response) => {
        var responseToCache = response.clone();
        caches.open(cacheName).then((cache) => {
            cache.put(request, responseToCache).catch((err) => {
              console.warn(request.url + ': ' + err.message);
            });
          });

        return response;
      });
    })
  );
});

/*
  ACTIVATE EVENT: triggered once after registering, also used to clean up caches.
*/

//Adding `activate` event listener
self.addEventListener('activate', (event) => {
  console.info('Event: Activate');

  //Remove old and unwanted caches
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames.map((cache) => {
          if (cache !== cacheName) {     //cacheName = 'cache-v1'
            return caches.delete(cache); //Deleting the cache
          }
        })
      );
    })
  );
});

self.addEventListener('message', (event) => {
  console.info('Event: message');

  event.waitUntil(
    caches.open(cacheName)
    .then((cache) => {
      //[] of files to cache & if any of the file not present `addAll` will fail
      return cache.add(event.data )
      .then(() => {
        console.info('All files are cached');
        return self.skipWaiting(); //To forces the waiting service worker to become the active service worker
      })
      .catch((error) =>  {
        console.error('Failed to cache', error);
        console.log(error);
      })
    })
  );
});
