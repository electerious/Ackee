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
const requireAuth = require('../middlewares/requireAuth')

module.exports = {
	Statistics: {
		views: pipe(requireAuth, async (domain, { type, interval, limit }) => {

			return views.get([ domain.id ], type, interval, limit)

		}),
		pages: pipe(requireAuth, async (domain, { sorting, range, limit }) => {

			return pages.get([ domain.id ], sorting, range, limit)

		}),
		referrers: pipe(requireAuth, async (domain, { sorting, range, limit }) => {

			return referrers.get([ domain.id ], sorting, range, limit)

		}),
		durations: pipe(requireAuth, async (domain, { interval, limit }) => {

			return durations.get([ domain.id ], interval, limit)

		}),
		systems: pipe(requireAuth, async (domain, { sorting, type, range, limit }) => {

			return systems.get([ domain.id ], sorting, type, range, limit)

		}),
		devices: pipe(requireAuth, async (domain, { sorting, type, range, limit }) => {

			return devices.get([ domain.id ], sorting, type, range, limit)

		}),
		browsers: pipe(requireAuth, async (domain, { sorting, type, range, limit }) => {

			return browsers.get([ domain.id ], sorting, type, range, limit)

		}),
		sizes: pipe(requireAuth, async (domain, { sorting, type, range, limit }) => {

			return sizes.get([ domain.id ], sorting, type, range, limit)

		}),
		languages: pipe(requireAuth, async (domain, { sorting, range, limit }) => {

			return languages.get([ domain.id ], sorting, range, limit)

		})
	}
}