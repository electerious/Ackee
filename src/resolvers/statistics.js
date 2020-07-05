'use strict'

const domains = require('../database/domains')
const views = require('../database/views')
const pages = require('../database/pages')
const referrers = require('../database/referrers')
const durations = require('../database/durations')
const systems = require('../database/systems')
const devices = require('../database/devices')
const browsers = require('../database/browsers')
const sizes = require('../database/sizes')
const languages = require('../database/languages')
const pipe = require('../utils/pipe')
const requireAuth = require('../middlewares/requireAuth')

const getIds = async (domain) => {

	if (domain.id == null) {
		const allDomains = await domains.all()
		return allDomains.map((domain) => domain.id)
	}

	return [ domain.id ]

}

module.exports = {
	Statistics: {
		views: pipe(requireAuth, async (domain, { type, interval, limit }) => {

			const ids = await getIds(domain)
			return views.get(ids, type, interval, limit)

		}),
		pages: pipe(requireAuth, async (domain, { sorting, range, limit }) => {

			const ids = await getIds(domain)
			return pages.get(ids, sorting, range, limit)

		}),
		referrers: pipe(requireAuth, async (domain, { sorting, range, limit }) => {

			const ids = await getIds(domain)
			return referrers.get(ids, sorting, range, limit)

		}),
		durations: pipe(requireAuth, async (domain, { interval, limit }) => {

			const ids = await getIds(domain)
			return durations.get(ids, interval, limit)

		}),
		systems: pipe(requireAuth, async (domain, { sorting, type, range, limit }) => {

			const ids = await getIds(domain)
			return systems.get(ids, sorting, type, range, limit)

		}),
		devices: pipe(requireAuth, async (domain, { sorting, type, range, limit }) => {

			const ids = await getIds(domain)
			return devices.get(ids, sorting, type, range, limit)

		}),
		browsers: pipe(requireAuth, async (domain, { sorting, type, range, limit }) => {

			const ids = await getIds(domain)
			return browsers.get(ids, sorting, type, range, limit)

		}),
		sizes: pipe(requireAuth, async (domain, { sorting, type, range, limit }) => {

			const ids = await getIds(domain)
			return sizes.get(ids, sorting, type, range, limit)

		}),
		languages: pipe(requireAuth, async (domain, { sorting, range, limit }) => {

			const ids = await getIds(domain)
			return languages.get(ids, sorting, range, limit)

		})
	},
	Query: {
		statistics: () => ({})
	}
}