import { setContext } from '@apollo/client/link/context'

import { get as getToken } from '../../reducers/token'

export default () => {

	return setContext((request, { headers }) => {
		const token = getToken()

		return {
			headers: {
				...headers,
				Authorization: `Bearer ${ token }`
			}
		}
	})

}