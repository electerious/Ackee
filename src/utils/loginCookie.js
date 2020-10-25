'use static'

module.exports = {
	isSet: (req) => {
		const cookies = req.headers.cookie || ''
		return cookies.includes('ackee_login=1')
	},
	set: (res) => {
		// Set cookie for one year to avoid reporting own visits
		res.setHeader('Set-Cookie', `ackee_login=1; SameSite=None; Secure; Max-Age=${ 365 * 24 * 60 * 60 }`)
	},
	unset: (res) => {
		res.setHeader('Set-Cookie', 'ackee_login=0; SameSite=None; Secure; Max-Age=-1')
	}
}