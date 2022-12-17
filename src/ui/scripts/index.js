import { createElement as h, useState, useCallback } from 'react'
import { createRoot } from 'react-dom/client'
import { ApolloProvider } from '@apollo/client/react'

import createStatusLink from './api/links/createStatusLink'
import createAuthLink from './api/links/createAuthLink'
import createHttpLink from './api/links/createHttpLink'
import createClient from './api/utils/createClient'

import useCustomScrollbar from './hooks/useCustomScrollbar'
import useScrollReset from './hooks/useScrollReset'
import useRouter from './hooks/useRouter'
import useToken from './hooks/useToken'
import useModals from './hooks/useModals'
import useFilters from './hooks/useFilters'

import Main from './components/Main'
import ErrorBoundary from './components/ErrorBoundary'

if (window.env.isDemoMode === true) {
	console.warn('Ackee runs in demo mode')
}

const {
	statusLink,
	useLoading,
	useErrors,
} = createStatusLink()

const client = createClient([
	statusLink,
	createAuthLink(),
	createHttpLink(),
])

const App = () => {
	// Change the key to re-render the whole application. This will
	// reset the states of hooks inside the Main component and therefore
	// all existing GraphQL errors that occurred before the reset.
	// https://github.com/molindo/react-apollo-network-status/issues/45
	const [ key, setKey ] = useState(Date.now())

	const loading = useLoading()
	const router = useRouter()
	const token = useToken()
	const modals = useModals()
	const filters = useFilters()

	const reset = useCallback(() => {
		// Reset everything that has a local or saved state
		token.resetToken()
		modals.resetModals()
		filters.resetFilters()

		// Reset the cache of the client
		client.clearStore()

		// Reset the main component and the states it contains
		setKey(Date.now())
	}, [ token.resetToken, modals.resetModals, filters.resetFilters, client.resetStore, setKey ])

	useCustomScrollbar()
	useScrollReset(router.route)

	return (
		h(ApolloProvider, { client },
			h(ErrorBoundary, { reset },
				h(Main, {
					key,
					reset,
					useErrors,
					loading,
					...status,
					...router,
					...token,
					...modals,
					...filters,
				}),
			),
		)
	)
}

const container = document.querySelector('#main')
const root = createRoot(container)

root.render(h(App))