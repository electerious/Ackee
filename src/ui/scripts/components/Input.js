import { createElement as h } from 'react'

const Input = (props) => {

	return (
		h('input', {
			className: 'input',
			...props
		})
	)

}

export default Input