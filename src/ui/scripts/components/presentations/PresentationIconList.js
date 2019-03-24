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

const Link = (props) => (

	h('a', {
		className: 'iconList__link',
		href: props.url.href,
		target: '_blank'
	}, props.url.hostname)

)

const Row = (props) => (

	h('div', { className: 'iconList__row' },
		h(Favicon, { url: props.url.href }),
		h(Link, props)
	)

)

const Component = (props) => (

	h('div', { className: 'iconList' },
		h('div', { className: 'iconList__inner' },
			props.items.map((item, index) => (
				h(Row, {
					key: index,
					...item
				})
			))
		)
	)

)

export default enhance(Component)