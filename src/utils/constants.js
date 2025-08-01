'use strict'

const constants = require('../database/constants')
const { second } = require('./times')

class LastRecentlyUsedCache {
	#data = new Map()
	#lru = {}
	#ttl = 0
	#fetchMethod = () => {}
	#defaults = {}

	#isOutdated(key) {
		return !this.has(key) || Date.now() - this.#lru[key] >= this.#ttl
	}

	constructor(ttl, fetchMethod, defaults) {
		this.#ttl = ttl
		this.#fetchMethod = fetchMethod
		this.#defaults = defaults
	}

	has(key) {
		return this.#data.has(key)
	}

	get(key) {
		if (this.#isOutdated(key)) this.#fetchMethod(key).catch((e) => {
			console.error('Fetch method failed!', e)
			this.set(key, this.#defaults[key])
		})
		return this.#data.get(key)
	}

	set(key, value) {
		this.#lru[key] = Date.now()
		return this.#data.set(key, value)
	}
}

const customise = (obj, keys) => {
	const defaults = {}
	const cache = new LastRecentlyUsedCache(
		5 * second,
		(name) => constants.get(name)
			.then((v) => v?.value ?? defaults[name])
			.then((v) => cache.set(name, v)),
		defaults,
	)
	keys.forEach((k) => {
		defaults[k] = obj[k]
	})
	return new Proxy(obj, {
		get(_, prop) {
			if (!keys.includes(prop)) return Reflect.get(...arguments)
			return cache.get(prop) ?? defaults[prop]
		},
	})
}

module.exports = {
	customise,
}