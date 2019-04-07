import { createElement as h } from 'react'

const Component = (props) => (

	h('textarea', {
		className: 'input',
		...props
	})

)

Component.displayName = 'Textarea'

export default Component