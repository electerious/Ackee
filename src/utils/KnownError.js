module.exports = class KnownError extends Error {
	constructor(message) {
		super(message)
		this.name = 'KnownError'
		this.message = message
	}
}