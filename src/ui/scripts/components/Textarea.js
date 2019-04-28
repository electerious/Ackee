import { createElement as h } from 'react'

const Textarea = (props) => (

	h('textarea', {
		className: 'input',
		...props
	})

)

export default Textarea