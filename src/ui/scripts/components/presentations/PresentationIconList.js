import { createElement as h } from 'react'
import { compose, setDisplayName, setPropTypes } from 'recompose'
import PropTypes from 'prop-types'

const enhance = compose(

	setDisplayName('PresentationIconList'),

	setPropTypes({
		items: PropTypes.arrayOf(PropTypes.object).isRequired
	})

)

const Icon = (props) => (

	h('img', {
		className: 'iconList__icon',
		src: props.url.origin + '/favicon.ico'
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
		h(Icon, props),
		h(Link, props)
	)

)

const Component = (props) => (

	h('div', { className: 'iconList' },
		props.items.map((item, index) => (
			h(Row, {
				key: index,
				...item
			})
		))
	)

)

export default enhance(Component)