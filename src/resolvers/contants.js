const { DURATIONS_INTERVAL, DURATIONS_LIMIT } = require('../constants/durations')
const constants = require('../database/constants')
const requireAuth = require('../middlewares/requireAuth')
const pipe = require('../utils/pipe')

const response = (entry) => ({
	created: entry.created,
	updated: entry.updated,
	id: entry.name,
	value: entry.value,
	unit: entry.unit,
})

const toApi = ({ name, ...data }) => ({
	...data,
	id: name,
})
const interval = async () => {
	const name = 'DURATIONS_INTERVAL'
	return toApi(await constants.get(name) || {
		name,
		value: DURATIONS_INTERVAL,
		unit: 'seconds',
	})
}
const limit = async () => {
	const name = 'DURATIONS_LIMIT'
	return toApi(await constants.get(name) || {
		name,
		value: DURATIONS_LIMIT,
		unit: 'minutes',
	})
}

module.exports = {
	Query: {
		constants: pipe(requireAuth, async () => ({
			durationsInterval: await interval(),
			durationsLimit: await limit(),
		})),
	},
	Mutation: {
		setConstant: pipe(requireAuth, async (parent, { input }) => {
			const { id, value, unit } = input

			const entry = await constants.update(id, value, unit)
			return {
				success: true,
				payload: response(entry),
			}
		}),
	},
}