'use static'

const fs = require('fs')
const { day } = require('./times')

// Must be a function or object that loads and returns the env variables at runtime.
// Otherwise it wouldn't be possible to mock the env variables with mockedEnv.
module.exports = new Proxy({}, {
	get: function(target, prop) {
		const data = {
			ttl: configValueFromEnv('ACKEE_TTL') || day,
			port: configValueFromEnv('ACKEE_PORT', 'PORT') || 3000,
			dbUrl: configValueFromEnv('ACKEE_MONGODB', 'MONGODB_URI'),
			allowOrigin: configValueFromEnv('ACKEE_ALLOW_ORIGIN'),
			autoOrigin: configValueFromEnv('ACKEE_AUTO_ORIGIN') === 'true',
			username: configValueFromEnv('ACKEE_USERNAME'),
			password: configValueFromEnv('ACKEE_PASSWORD'),
			isDemoMode: configValueFromEnv('ACKEE_DEMO') === 'true',
			isDevelopmentMode: configValueFromEnv('NODE_ENV') === 'development',
			isPreBuildMode: configValueFromEnv('BUILD_ENV') === 'pre',
		}
		return data[prop]
	},
},
)

// Retrieves value of the environment variable, if it exists. We also check for
// another enviroment variable with the same name as the but with the suffix
// _FILE. If it exists, we read the value from the file and return it. This is
// useful for Docker secrets.
const configValueFromEnv = (...envVariable) => {
	for (const env of envVariable) {
		if (process.env[env]) {
			return process.env[env]
		}

		const envFile = process.env[`${ env }_FILE`]
		if (envFile) {
			return fs.readFileSync(envFile, 'utf8')
		}
	}

	return
}