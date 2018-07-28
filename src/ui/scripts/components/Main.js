import { createElement as h } from 'react'
import { compose, setDisplayName } from 'recompose'

import Login from './Login'

const enhance = compose(

	setDisplayName('Main')

)

const Component = () => (

	h(Login)

)

export default enhance(Component)