import { setContext } from '@apollo/client/link/context'

export default () => {

	return setContext((request, { headers }) => {

		const state = localStorage.getItem('ackee_state_3.0.6')
		if (state == null) return { headers }

		const token = JSON.parse(state).token.value

		return {
			headers: {
				...headers,
				Authorization: `Bearer ${ token }`
			}
		}

	})

}