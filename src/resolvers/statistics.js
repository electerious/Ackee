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

module.exports = {
	Interval: {
		DAILY: require('../constants/intervals').INTERVALS_DAILY,
		MONTHLY: require('../constants/intervals').INTERVALS_MONTHLY,
		YEARLY: require('../constants/intervals').INTERVALS_YEARLY
	},
	Sorting: {
		TOP: require('../constants/sortings').SORTINGS_TOP,
		RECENT: require('../constants/sortings').SORTINGS_RECENT,
		NEW: require('../constants/sortings').SORTINGS_NEW
	},
	// TODO: Enable when bug is fixed
	// https://github.com/apollographql/apollo-server/issues/2908
	// Range: {
	// 	LAST_24_HOURS: require('../constants/ranges').RANGES_LAST_24_HOURS,
	// 	LAST_7_DAYS: require('../constants/ranges').RANGES_LAST_7_DAYS,
	// 	LAST_30_DAYS: require('../constants/ranges').RANGES_LAST_30_DAYS,
	// 	ALL_TIME: require('../constants/ranges').RANGES_ALL_TIME
	// },
	ViewType: {
		UNIQUE: require('../constants/views').VIEWS_TYPE_UNIQUE,
		TOTAL: require('../constants/views').VIEWS_TYPE_TOTAL
	},
	SystemType: {
		WITH_VERSION: require('../constants/systems').SYSTEMS_TYPE_WITH_VERSION,
		NO_VERSION: require('../constants/systems').SYSTEMS_TYPE_NO_VERSION
	},
	DeviceType: {
		WITH_MODEL: require('../constants/devices').DEVICES_TYPE_WITH_MODEL,
		NO_MODEL: require('../constants/devices').DEVICES_TYPE_NO_MODEL
	},
	BrowserType: {
		WITH_VERSION: require('../constants/browsers').BROWSERS_TYPE_WITH_VERSION,
		NO_VERSION: require('../constants/browsers').BROWSERS_TYPE_NO_VERSION
	},
	SizeType: {
		BROWSER_HEIGHT: require('../constants/sizes').SIZES_TYPE_BROWSER_HEIGHT,
		BROWSER_RESOLUTION: require('../constants/sizes').SIZES_TYPE_BROWSER_RESOLUTION,
		BROWSER_WIDTH: require('../constants/sizes').SIZES_TYPE_BROWSER_WIDTH,
		SCREEN_HEIGHT: require('../constants/sizes').SIZES_TYPE_SCREEN_HEIGHT,
		SCREEN_RESOLUTION: require('../constants/sizes').SIZES_TYPE_SCREEN_RESOLUTION,
		SCREEN_WIDTH: require('../constants/sizes').SIZES_TYPE_SCREEN_WIDTH
	},
	Statistics: {
		// TODO: Add enhancer
		views: async (domain, { type, interval }) => {

			const response = (entry) => ({
				id: new Date(entry._id.year, entry._id.month == null ? 0 : entry._id.month - 1, entry._id.day == null ? 1 : entry._id.day),
				count: entry.count
			})

			const entries = await views.get(domain.id, type, interval)

			return entries.map(response)

		},
		pages: async (domain, { sorting, range, limit }) => {

			return pages.get(domain.id, sorting, range, limit)

		},
		referrers: async (domain, { sorting, range, limit }) => {

			return referrers.get(domain.id, sorting, range, limit)

		},
		// TODO: Add enhancer
		durations: async (domain, { interval }) => {

			const response = (entry) => ({
				id: new Date(entry._id.year, entry._id.month == null ? 0 : entry._id.month - 1, entry._id.day == null ? 1 : entry._id.day),
				count: entry.average
			})

			const entries = await durations.get(domain.id, interval)

			return entries.map(response)

		},
		systems: async (domain, { sorting, type, range, limit }) => {

			return systems.get(domain.id, sorting, type, range, limit)

		},
		devices: async (domain, { sorting, type, range, limit }) => {

			return devices.get(domain.id, sorting, type, range, limit)

		},
		browsers: async (domain, { sorting, type, range, limit }) => {

			return browsers.get(domain.id, sorting, type, range, limit)

		},
		sizes: async (domain, { sorting, type, range, limit }) => {

			return sizes.get(domain.id, sorting, type, range, limit)

		},
		languages: async (domain, { sorting, range, limit }) => {

			return languages.get(domain.id, sorting, range, limit)

		}
	}
}