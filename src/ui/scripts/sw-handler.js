if ('serviceWorker' in navigator) {
	navigator.serviceWorker.register('sw.js')
	// Directly reload when update found.
	onUpdate((doUpdate) => doUpdate())
}

const onUpdate = async (updateReadyCB) => {

	if (!navigator.serviceWorker || !navigator.serviceWorker.controller) {
		return
	}

	navigator.serviceWorker.addEventListener('controllerchange', () => {
		location.reload()
	})

	const updateFactory = (sw) => () => sw.postMessage({ msg: 'update-sw' })

	const registration = await navigator.serviceWorker.getRegistration()

	if (registration.waiting) {
		updateReadyCB(updateFactory(registration.waiting))
		return
	}

	if (registration.installing) {
		updateReadyCB(updateFactory(registration.installing))
		return
	}

	registration.addEventListener('updatefound', () => {
		const sw = registration.installing
		if (!sw) {
			return
		}
		sw.addEventListener('statechange', () => {
			if (sw.state === 'installed') {
				updateReadyCB(updateFactory(sw))
			}
		})
	})
}