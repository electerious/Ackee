import { ApolloProvider } from '@apollo/client/react'
import { createElement as h, useCallback, useState } from 'react'
import { createRoot } from 'react-dom/client'

import createAuthLink from './api/links/create-auth-link.js'
import createHttpLink from './api/links/create-http-link.js'
import createStatusLink from './api/links/create-status-link.js'
import createClient from './api/utils/create-client.js'

import useCustomScrollbar from './hooks/use-custom-scrollbar.js'
import useFilters from './hooks/use-filters.js'
import useModals from './hooks/use-modals.js'
import useRouter from './hooks/use-router.js'
import useScrollReset from './hooks/use-scroll-reset.js'
import useToken from './hooks/use-token.js'

import ErrorBoundary from './components/error-boundary.js'
import Main from './components/main.js'

if (globalThis.env.isDemoMode === true) {
  console.warn('Ackee runs in demo mode')
}

const { statusLink, useLoading, useErrors } = createStatusLink()

const client = createClient([statusLink, createAuthLink(), createHttpLink()])

const App = () => {
  // Change the key to re-render the whole application. This will
  // reset the states of hooks inside the Main component and therefore
  // all existing GraphQL errors that occurred before the reset.
  // https://github.com/molindo/react-apollo-network-status/issues/45
  const [key, setKey] = useState(Date.now())

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
  }, [token.resetToken, modals.resetModals, filters.resetFilters, client.resetStore, setKey])

  useCustomScrollbar()
  useScrollReset(router.route)

  return h(
    ApolloProvider,
    { client },
    h(
      ErrorBoundary,
      { reset },
      h(Main, {
        key,
        reset,
        useErrors,
        loading,
        ...router,
        ...token,
        ...modals,
        ...filters,
      }),
    ),
  )
}

const container = document.querySelector('#main')
const root = createRoot(container)

root.render(h(App))
