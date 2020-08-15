export default class HandledError extends Error {
	constructor(message) {
		super(message)
		this.name = 'HandledError'
		this.message = message
	}
}