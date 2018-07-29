import { createElement as h } from 'react'
import { compose, setDisplayName } from 'recompose'

const enhance = compose(

	setDisplayName('Spinner')

)

const Component = () => (

	h('div', { className: 'spinner' },
		h('div', { className: 'spinner__circle spinner__circle--main' }),
		h('div', { className: 'spinner__circle spinner__circle--white' }),
		h('div', { className: 'spinner__circle spinner__circle--dimmed' })
	)

)

export default enhance(Component)