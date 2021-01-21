'use strict'

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
const domainIds = require('../utils/domainIds')
const requireAuth = require('../middlewares/requireAuth')

module.exports = {
	DomainStatistics: {
		views: pipe(requireAuth, async (domain, { type, interval, limit }, { dateDetails }) => {

			const ids = await domainIds(domain)
			return views.get(ids, type, interval, limit, dateDetails)

		}),
		pages: pipe(requireAuth, async (domain, { sorting, range, limit }, { dateDetails }) => {

			const ids = await domainIds(domain)
			return pages.get(ids, sorting, range, limit, dateDetails)

		}),
		referrers: pipe(requireAuth, async (domain, { sorting, type, range, limit }, { dateDetails }) => {

			const ids = await domainIds(domain)
			return referrers.get(ids, sorting, type, range, limit, dateDetails)

		}),
		durations: pipe(requireAuth, async (domain, { interval, limit }, { dateDetails }) => {

			const ids = await domainIds(domain)
			return durations.get(ids, interval, limit, dateDetails)

		}),
		systems: pipe(requireAuth, async (domain, { sorting, type, range, limit }, { dateDetails }) => {

			const ids = await domainIds(domain)
			return systems.get(ids, sorting, type, range, limit, dateDetails)

		}),
		devices: pipe(requireAuth, async (domain, { sorting, type, range, limit }, { dateDetails }) => {

			const ids = await domainIds(domain)
			return devices.get(ids, sorting, type, range, limit, dateDetails)

		}),
		browsers: pipe(requireAuth, async (domain, { sorting, type, range, limit }, { dateDetails }) => {

			const ids = await domainIds(domain)
			return browsers.get(ids, sorting, type, range, limit, dateDetails)

		}),
		sizes: pipe(requireAuth, async (domain, { sorting, type, range, limit }, { dateDetails }) => {

			const ids = await domainIds(domain)
			return sizes.get(ids, sorting, type, range, limit, dateDetails)

		}),
		languages: pipe(requireAuth, async (domain, { sorting, range, limit }, { dateDetails }) => {

			const ids = await domainIds(domain)
			return languages.get(ids, sorting, range, limit, dateDetails)

		})
	},
	Query: {
		statistics: () => ({})
	}
}