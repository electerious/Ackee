import { createElement as h } from 'react'
import { compose, setDisplayName } from 'recompose'

const enhance = compose(

	setDisplayName('HeaderLogo')

)

const Component = () => (

	h('div', { className: 'headerLogo' })

)

export default enhance(Component)