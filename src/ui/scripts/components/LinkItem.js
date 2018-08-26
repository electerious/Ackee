import { createElement as h } from 'react'
import { compose, setDisplayName, setPropTypes } from 'recompose'
import PropTypes from 'prop-types'

const enhance = compose(

	setDisplayName('LinkItem'),

	setPropTypes({
		type: PropTypes.oneOf([ 'a', 'button' ]).isRequired,
		href: PropTypes.string,
		onClick: PropTypes.func,
		children: PropTypes.node.isRequired
	})

)

const Component = (props) => (

	h(props.type, {
		onClick: props.onClick,
		href: props.href,
		className: 'linkItem link'
	},
		h('span', {}, props.children),
		h('span', {}, '→')
	)

)

export default enhance(Component)