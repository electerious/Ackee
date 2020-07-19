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
		views: pipe(requireAuth, async (domain, { type, interval, limit }, { dateDetails }) => {

			const ids = await getIds(domain)
			return views.get(ids, type, interval, limit, dateDetails)

		}),
		pages: pipe(requireAuth, async (domain, { sorting, range, limit }, { dateDetails }) => {

			const ids = await getIds(domain)
			return pages.get(ids, sorting, range, limit, dateDetails)

		}),
		referrers: pipe(requireAuth, async (domain, { sorting, range, limit }, { dateDetails }) => {

			const ids = await getIds(domain)
			return referrers.get(ids, sorting, range, limit, dateDetails)

		}),
		durations: pipe(requireAuth, async (domain, { interval, limit }, { dateDetails }) => {

			const ids = await getIds(domain)
			return durations.get(ids, interval, limit, dateDetails)

		}),
		systems: pipe(requireAuth, async (domain, { sorting, type, range, limit }, { dateDetails }) => {

			const ids = await getIds(domain)
			return systems.get(ids, sorting, type, range, limit, dateDetails)

		}),
		devices: pipe(requireAuth, async (domain, { sorting, type, range, limit }, { dateDetails }) => {

			const ids = await getIds(domain)
			return devices.get(ids, sorting, type, range, limit, dateDetails)

		}),
		browsers: pipe(requireAuth, async (domain, { sorting, type, range, limit }, { dateDetails }) => {

			const ids = await getIds(domain)
			return browsers.get(ids, sorting, type, range, limit, dateDetails)

		}),
		sizes: pipe(requireAuth, async (domain, { sorting, type, range, limit }, { dateDetails }) => {

			const ids = await getIds(domain)
			return sizes.get(ids, sorting, type, range, limit, dateDetails)

		}),
		languages: pipe(requireAuth, async (domain, { sorting, range, limit }, { dateDetails }) => {

			const ids = await getIds(domain)
			return languages.get(ids, sorting, range, limit, dateDetails)

		})
	},
	Query: {
		statistics: () => ({})
	}
}