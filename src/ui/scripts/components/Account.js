import { createElement as h } from 'react'
import { compose, setDisplayName } from 'recompose'

import Spacer from './Spacer'
import Headline from './Headline'
import LinkItem from './LinkItem'
import Line from './Line'

const enhance = compose(

	setDisplayName('Account')

)

const Component = (props) => (

	h('div', { className: 'card card--wide' },
		h('div', { className: 'card__inner' },

			h(Headline, {
				type: 'h2',
				small: true,
				className: 'color-white'
			}, 'Account'),

			h(Spacer, { size: 1 }),

			h(LinkItem, {
				type: 'button',
				onClick: () => props.deleteToken(props)
			}, 'Sign Out'),

			h(Line),

			h(LinkItem, {
				type: 'button',
				href: '#'
			}, 'Change username or password')

		)
	)

)

export default enhance(Component)