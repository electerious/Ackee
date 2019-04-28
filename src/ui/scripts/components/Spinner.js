import { createElement as h } from 'react'

const Spinner = () => {

	return (
		h('div', { className: 'spinner' },
			h('div', { className: 'spinner__circle spinner__circle--primary' }),
			h('div', { className: 'spinner__circle spinner__circle--white' }),
			h('div', { className: 'spinner__circle spinner__circle--dimmed' })
		)
	)

}

export default Spinner