import { v4 as uuid } from 'uuid'

const ids = new Map()

const existingId = (key) => {
	return ids.get(key)
}

const newId = (key) => {
	const id = uuid()
	ids.set(key, id)
	return id
}

export default (type, domainId, opts) => {

	const key = `${ type }${ domainId || '' }${ JSON.stringify(opts) }`
	const id = existingId(key)

	if (id == null) return newId(key)
	return id

}