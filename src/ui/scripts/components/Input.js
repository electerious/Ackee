import { createElement as h } from 'react'

const Component = (props) => (

	h('input', {
		className: 'input',
		...props
	})

)

Component.displayName = 'Input'

export default Component