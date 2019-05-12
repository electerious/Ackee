import { createElement as h } from 'react'

const Label = (props) => {

	return (
		h('label', {
			className: 'label',
			...props
		})
	)

}

export default Label