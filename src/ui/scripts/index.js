import { createElement as h } from 'react'
import { render } from 'react-dom'
import { ApolloProvider } from '@apollo/client/react'

import createStatusLink from './api/links/createStatusLink'
import createAuthLink from './api/links/createAuthLink'
import createHttpLink from './api/links/createHttpLink'
import createClient from './api/utils/createClient'

import useToken from './reducers/token'
import useModals from './reducers/modals'
import useFilter from './reducers/filter'

import Main from './components/Main'

const { statusLink, useStatusLink } = createStatusLink()
const client = createClient([
	statusLink,
	createAuthLink(),
	createHttpLink()
])

if (window.env.isDemoMode === true) {
	console.warn('Ackee runs in demo mode')
}

const App = () => {

	const token = useToken()
	const modals = useModals()
	const filter = useFilter()

	return h(ApolloProvider, { client },
		h(Main, {
			useStatusLink,
			...token,
			...modals,
			...filter
		})
	)

}

render(h(App), document.querySelector('#main'))