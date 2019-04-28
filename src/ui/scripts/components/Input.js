import { createElement as h } from 'react'

const Input = (props) => (

	h('input', {
		className: 'input',
		...props
	})

)

export default Input