import { createElement as h, Fragment } from 'react'
import { compose, setDisplayName, setPropTypes } from 'recompose'
import PropTypes from 'prop-types'

import Spacer from './Spacer'
import Headline from './Headline'
import Message from './Message'
import LinkItem from './LinkItem'
import Line from './Line'

const isLast = (index, arr) => index === (arr.length - 1)

const enhance = compose(

	setDisplayName('Setting'),

	setPropTypes({
		headline: PropTypes.string.isRequired,
		message: PropTypes.shape({
			status: PropTypes.string.isRequired,
			label: PropTypes.string.isRequired
		}),
		items: PropTypes.array.isRequired
	})

)

const Component = (props) => (

	h('div', { className: 'card card--wide' },
		h('div', { className: 'card__inner' },

			h(Headline, {
				type: 'h2',
				small: true,
				className: 'color-white'
			}, props.headline),

			h(Spacer, { size: 1 }),

			props.message != null && h(Message, { status: props.message.status }, props.message.label),

			props.items.map(
				(props, index, arr) => h(Fragment, { key: index },
					h(LinkItem, props, props.label),
					isLast(index, arr) === false && h(Line)
				)
			)

		)
	)

)

export default enhance(Component)