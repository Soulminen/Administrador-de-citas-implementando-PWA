
const nombreCache = 'apv-v2';
const archivos = [
    '/',
    '/index.html',
    '/error.html',
    '/css/bootstrap.css',
    '/css/styles.css',
    '/js/app.js',
    '/js/apv.js'
];



self.addEventListener('install', e => {
    console.log('Instalado el Service Worker');

    e.waitUntil(
        caches.open(nombreCache)
            .then( cache => {
                console.log('cacheando');
                cache.addAll(archivos)
            })
    )
});

self.addEventListener('activate', e => {
    console.log('Services Worker Activado');

    e.waitUntil(
        caches.keys()
        .then( keys => {
            
            return Promise.all(
                keys.filter( key => key !== nombreCache )
                .map(key => caches.delete(key)) // Borra los demas
            )
        })
    )
});

self.addEventListener('fetch', e => {
    console.log('Fetch... ', e);

    e.respondWitch(
        caches.match(e.request)
        .then( respuestaCache => {
            return respuestaCache 
        })
        .catch( () => caches.match('/error.html') )
    )
})