import { createElement as h } from 'react'
import { compose, setDisplayName } from 'recompose'

const enhance = compose(

	setDisplayName('Line')

)

const Component = () => (

	h('hr', {
		className: 'line'
	})

)

export default enhance(Component)