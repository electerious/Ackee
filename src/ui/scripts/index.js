import { createElement as h, useCallback } from 'react'
import { render } from 'react-dom'
import { ApolloProvider } from '@apollo/client/react'

import createStatusLink from './api/links/createStatusLink'
import createAuthLink from './api/links/createAuthLink'
import createHttpLink from './api/links/createHttpLink'
import createClient from './api/utils/createClient'

import useCustomScrollbar from './hooks/useCustomScrollbar'
import useRouter from './hooks/useRouter'
import useToken from './hooks/useToken'
import useModals from './hooks/useModals'
import useFilters from './hooks/useFilters'
import useAuthenticated from './hooks/useAuthenticated'

import Main from './components/Main'
import ErrorBoundary from './components/ErrorBoundary'

if (window.env.isDemoMode === true) {
	console.warn('Ackee runs in demo mode')
}

const { statusLink, useStatus } = createStatusLink()
const client = createClient([
	statusLink,
	createAuthLink(),
	createHttpLink()
])

const App = () => {

	useCustomScrollbar()

	const status = useStatus()
	const router = useRouter()
	const token = useToken()
	const modals = useModals()
	const filters = useFilters()

	const reset = useCallback(() => {
		token.resetToken()
		modals.resetModals()
		filters.resetFilters()
		client.clearStore()
	}, [ token.resetToken, client.resetStore ])

	const authenticated = useAuthenticated(token.token, status.errors, reset)

	return (
		h(ApolloProvider, { client },
			h(ErrorBoundary, { reset },
				h(Main, {
					authenticated,
					reset,
					...status,
					...router,
					...token,
					...modals,
					...filters
				})
			)
		)
	)

}

render(h(App), document.querySelector('#main'))