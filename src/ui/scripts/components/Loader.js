import { createElement as h } from 'react'

const Loader = () => {

	return (
		h('div', { className: 'loader' },
			h('div', { className: 'loader__circle' })
		)
	)

}

export default Loader