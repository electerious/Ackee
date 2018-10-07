import { createElement as h } from 'react'
import { compose, setDisplayName } from 'recompose'

const enhance = compose(

	setDisplayName('Textarea')

)

const Component = (props) => (

	h('textarea', {
		className: 'input',
		...props
	})

)

export default enhance(Component)