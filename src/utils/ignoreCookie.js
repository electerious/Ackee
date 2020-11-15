'use static'

const COOKIE_NAME = 'ackee_ignore'

module.exports = {
	isSet: (cookie = '') => cookie.includes(`${ COOKIE_NAME }=1`),
	on: {
		name: COOKIE_NAME,
		value: '1',
		options: {
			maxAge: 365 * 24 * 60 * 60,
			sameSite: 'none',
			secure: true
		}
	},
	off: {
		name: COOKIE_NAME,
		value: '0',
		options: {
			maxAge: -1,
			sameSite: 'none',
			secure: true
		}
	}
}