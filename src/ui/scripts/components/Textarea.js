import { createElement as h } from 'react'

const Textarea = (props) => {

	return (
		h('textarea', {
			className: 'input',
			...props
		})
	)

}

export default Textarea