const CACHE='site-survey-shell-2';
const SHELL=['./index.html','./manifest.webmanifest','./icons/icon-192.png','./icons/icon-512.png'];
const PDF='https://cdn.jsdelivr.net/npm/pdfjs-dist@4.10.38/legacy/build/';
self.addEventListener('install',e=>e.waitUntil(caches.open(CACHE).then(c=>c.addAll(SHELL)).then(()=>self.skipWaiting())));
self.addEventListener('activate',e=>e.waitUntil(caches.keys().then(keys=>Promise.all(keys.filter(k=>k.startsWith('site-survey-shell-')&&k!==CACHE).map(k=>caches.delete(k)))).then(()=>self.clients.claim())));
self.addEventListener('fetch',e=>{let r=e.request;if(r.method!=='GET')return;if(r.url.startsWith(PDF)){e.respondWith(caches.open(CACHE).then(async c=>{let v=await c.match(r.url);if(v)return v;v=await fetch(r);if(v.ok)await c.put(r.url,v.clone());return v}));return}if(!r.url.startsWith(self.registration.scope))return;if(r.mode==='navigate'){e.respondWith(fetch(r).catch(()=>caches.open(CACHE).then(c=>c.match('./index.html'))));return}e.respondWith(caches.open(CACHE).then(async c=>await c.match(r)||fetch(r)))});
