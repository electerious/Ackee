import { createElement as h } from 'react'
import { compose, setDisplayName } from 'recompose'

const enhance = compose(

	setDisplayName('Input')

)

const Component = (props) => (

	h('input', {
		className: 'input',
		...props
	})

)

export default enhance(Component)