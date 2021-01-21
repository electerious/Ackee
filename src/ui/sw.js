const VERSION = process.env.BUILD
const CACHE_NAME = `CACHE_${ VERSION }`
const ASSETS = process.env.ASSETS

self.addEventListener('install', (ev) => {
	ev.waitUntil(
		(async () => {
			const cache = await caches.open(CACHE_NAME)
			await cache.addAll(ASSETS)
		})()
	)
})

self.addEventListener('activate', (ev) => {
	ev.waitUntil(
		(async () => {
			const keys = await caches.keys()

			await Promise.all(
				keys.map(async (key) => {
					if (key === CACHE_NAME) {
						return true
					}
					return caches.delete(key)
				})
			)
		})()
	)
})

self.addEventListener('fetch', (ev) => {
	const url = ev.request.url.startsWith('http://') ? ev.request.url.slice(7) : ev.request.url.slice(8)

	if (url.split('/')[1] === 'api') {
		return
	}

	ev.respondWith(
		(async () => {
			const cache = await caches.match(ev.request)
			if (cache) {
				return cache
			}

			return fetch(ev.request)
		})()
	)
})

self.addEventListener('message', (ev) => {
	if (ev.data && ev.data.msg === 'update-sw') {
		self.skipWaiting()
	}
})