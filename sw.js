const CACHE_NAME = 'bible-300-v2.0.0';
const STATIC_CACHE = 'bible-300-static-v2.0.0';
const DYNAMIC_CACHE = 'bible-300-dynamic-v2.0.0';

// Static assets to cache immediately
const STATIC_ASSETS = [
    '/',
    '/index.html',
    '/manifest.json',
    '/styles/main.css',
    '/js/app.js',
    '/data/reading-plan.js',
    '/data/bible-text.js',
    '/fonts/Noto_Sans/NotoSans-VariableFont_wdth,wght.ttf',
    '/fonts/Noto_Sans/NotoSans-Italic-VariableFont_wdth,wght.ttf',
    '/fonts/Noto_Serif/NotoSerif-VariableFont_wdth,wght.ttf',
    '/fonts/Noto_Serif/NotoSerif-Italic-VariableFont_wdth,wght.ttf',
    'https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css'
];

// All Bible content is now cached via the single bible-text.js file

// Install event - cache static assets
self.addEventListener('install', event => {
    console.log('Service Worker installing...');
    event.waitUntil(
        caches.open(STATIC_CACHE)
            .then(cache => {
                console.log('Caching static assets...');
                return cache.addAll(STATIC_ASSETS);
            })
            .then(() => {
                console.log('Static assets cached successfully');
                return self.skipWaiting();
            })
            .catch(error => {
                console.error('Failed to cache static assets:', error);
            })
    );
});

// Activate event - clean up old caches
self.addEventListener('activate', event => {
    console.log('Service Worker activating...');
    event.waitUntil(
        caches.keys()
            .then(cacheNames => {
                return Promise.all(
                    cacheNames.map(cacheName => {
                        if (cacheName !== STATIC_CACHE && cacheName !== DYNAMIC_CACHE) {
                            console.log('Deleting old cache:', cacheName);
                            return caches.delete(cacheName);
                        }
                    })
                );
            })
            .then(() => {
                console.log('Cache cleanup complete');
                return self.clients.claim();
            })
    );
});

// Fetch event - serve from cache when offline
self.addEventListener('fetch', event => {
    const request = event.request;
    const url = new URL(request.url);

    // Handle different types of requests
    if (request.method === 'GET') {
        if (STATIC_ASSETS.some(asset => url.pathname.includes(asset))) {
            // Static assets (including complete bible-text.js) - cache-first strategy
            event.respondWith(handleStaticAssets(request));
        } else {
            // Other requests - network-first with cache fallback
            event.respondWith(handleDynamicContent(request));
        }
    }
});


// Handle static assets with cache-first strategy
async function handleStaticAssets(request) {
    const cachedResponse = await caches.match(request);
    
    if (cachedResponse) {
        return cachedResponse;
    }
    
    try {
        const networkResponse = await fetch(request);
        if (networkResponse.ok) {
            const cache = await caches.open(STATIC_CACHE);
            cache.put(request, networkResponse.clone());
        }
        return networkResponse;
    } catch (error) {
        return new Response('Asset not available', {
            status: 404,
            statusText: 'Not Found'
        });
    }
}

// Handle dynamic content with network-first strategy
async function handleDynamicContent(request) {
    try {
        const networkResponse = await fetch(request);
        
        if (networkResponse.ok) {
            const cache = await caches.open(DYNAMIC_CACHE);
            cache.put(request, networkResponse.clone());
        }
        
        return networkResponse;
    } catch (error) {
        const cachedResponse = await caches.match(request);
        return cachedResponse || new Response('Content not available offline', {
            status: 503,
            statusText: 'Service Unavailable'
        });
    }
}

// Background sync for reading progress
self.addEventListener('sync', event => {
    if (event.tag === 'sync-reading-progress') {
        event.waitUntil(syncReadingProgress());
    }
});

async function syncReadingProgress() {
    // This would sync reading progress when back online
    console.log('Syncing reading progress...');
}

// Push notifications for daily reading reminders
self.addEventListener('push', event => {
    if (event.data) {
        const data = event.data.json();
        const options = {
            body: data.body || "Don't forget your daily Bible reading!",
            icon: '/icons/icon-192x192.png',
            badge: '/icons/badge-72x72.png',
            vibrate: [200, 100, 200],
            data: {
                url: data.url || '/?tab=reading-plan'
            },
            actions: [
                {
                    action: 'read-now',
                    title: 'Read Now',
                    icon: '/icons/action-read.png'
                },
                {
                    action: 'remind-later',
                    title: 'Remind Later',
                    icon: '/icons/action-later.png'
                }
            ]
        };
        
        event.waitUntil(
            self.registration.showNotification(data.title || 'Bible 300', options)
        );
    }
});

// Handle notification clicks
self.addEventListener('notificationclick', event => {
    event.notification.close();
    
    if (event.action === 'read-now') {
        event.waitUntil(
            clients.openWindow(event.notification.data.url || '/?tab=reading-plan')
        );
    } else if (event.action === 'remind-later') {
        // Set a reminder for later (would integrate with push service)
        console.log('Setting reminder for later...');
    } else {
        // Default action - open the app
        event.waitUntil(
            clients.openWindow(event.notification.data.url || '/')
        );
    }
});

// Cache size management
self.addEventListener('message', event => {
    if (event.data && event.data.type === 'CACHE_SIZE') {
        getCacheSize().then(size => {
            event.ports[0].postMessage({ size });
        });
    } else if (event.data && event.data.type === 'CLEAR_CACHE') {
        clearDynamicCache().then(() => {
            event.ports[0].postMessage({ cleared: true });
        });
    }
});

async function getCacheSize() {
    const cacheNames = await caches.keys();
    let totalSize = 0;
    
    for (const cacheName of cacheNames) {
        const cache = await caches.open(cacheName);
        const requests = await cache.keys();
        
        for (const request of requests) {
            const response = await cache.match(request);
            if (response) {
                const blob = await response.blob();
                totalSize += blob.size;
            }
        }
    }
    
    return totalSize;
}

async function clearDynamicCache() {
    await caches.delete(DYNAMIC_CACHE);
    console.log('Dynamic cache cleared');
}