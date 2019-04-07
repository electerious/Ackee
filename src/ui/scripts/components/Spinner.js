import { createElement as h } from 'react'

const Component = () => (

	h('div', { className: 'spinner' },
		h('div', { className: 'spinner__circle spinner__circle--primary' }),
		h('div', { className: 'spinner__circle spinner__circle--white' }),
		h('div', { className: 'spinner__circle spinner__circle--dimmed' })
	)

)

Component.displayName = 'Spinner'

export default Component