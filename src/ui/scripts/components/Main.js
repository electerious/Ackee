import { createElement as h, Fragment } from 'react'
import { compose, setDisplayName } from 'recompose'

import Login from './Login'
import Dashboard from './Dashboard'

const enhance = compose(

	setDisplayName('Main')

)

const Component = (props) => (

	h(Fragment, {},
		props.token.value == null && h(Login, props),
		props.token.value != null && h(Dashboard, props)
	)

)

export default enhance(Component)