import { createElement as h } from 'react'
import { compose, setDisplayName, setPropTypes } from 'recompose'
import PropTypes from 'prop-types'
import classNames from 'classnames'

import Headline from './Headline'

const enhance = compose(

	setDisplayName('Card'),

	setPropTypes({
		wide: PropTypes.bool,
		title: PropTypes.string.isRequired
	})

)

const Component = (props) => (

	h('div', {
		className: classNames({
			'card': true,
			'card--wide': props.wide === true
		})
	},
		h('div', { className: 'card__inner' },
			h(Headline, {
				type: 'h2',
				small: true,
				spacing: false,
				className: 'c-white'
			}, props.title)
		)
	)

)

export default enhance(Component)