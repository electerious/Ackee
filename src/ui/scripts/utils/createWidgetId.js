import { v5 as uuid } from 'uuid'

export default (type, domainId, opts) => {

	const name = `${ type }${ domainId || '' }${ JSON.stringify(opts) }`
	const namespace = '906d7dd0-b6e0-42c8-9270-436958c29c36'

	return uuid(name, namespace)

}