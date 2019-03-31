import { createElement as h } from 'react'
import { compose, setDisplayName, setPropTypes } from 'recompose'
import PropTypes from 'prop-types'

import Favicon from '../Favicon'

const enhance = compose(

	setDisplayName('PresentationIconList'),

	setPropTypes({
		items: PropTypes.arrayOf(PropTypes.object).isRequired
	})

)

const Row = (props) => (

	h('a', {
		className: 'iconList__row',
		href: props.url.href,
		target: '_blank',
		onMouseEnter: props.onEnter,
		onMouseLeave: props.onLeave
	},
		h(Favicon, { url: props.url.href }),
		h('span', { className: 'iconList__hostname' }, props.url.hostname),
		h('span', { className: 'iconList__pathname' }, props.url.pathname)
	)

)

const Component = (props) => (

	h('div', { className: 'iconList' },
		h('div', { className: 'iconList__inner' },
			props.items.map((item, index) => (
				h(Row, {
					key: index,
					onEnter: () => props.onEnter(index),
					onLeave: () => props.onLeave(index),
					...item
				})
			))
		)
	)

)

export default enhance(Component)