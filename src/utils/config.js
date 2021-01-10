'use static'

const { day } = require('./times')

// Must be a function or object that load and returns the env variables at runtime.
// Otherwise it wouldn't be possible to mock the env variables with mockedEnv.
module.exports = new Proxy({}, {
	get: function(target, prop) {
		const data = {
			ttl: process.env.ACKEE_TTL || day,
			port: process.env.ACKEE_PORT || process.env.PORT || 3000,
			dbUrl: process.env.ACKEE_MONGODB || process.env.MONGODB_URI,
			allowOrigin: process.env.ACKEE_ALLOW_ORIGIN,
			username: process.env.ACKEE_USERNAME,
			password: process.env.ACKEE_PASSWORD,
			isDemoMode: process.env.ACKEE_DEMO === 'true',
			isDevelopmentMode: process.env.NODE_ENV === 'development',
			isPreBuildMode: process.env.BUILD_ENV === 'pre'
		}

		return data[prop]
	}
})