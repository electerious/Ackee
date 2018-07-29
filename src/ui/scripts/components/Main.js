import { createElement as h } from 'react'
import { compose, setDisplayName } from 'recompose'

import Login from './Login'

const enhance = compose(

	setDisplayName('Main')

)

const Component = (props) => (

	h(Login, props)

)

export default enhance(Component)