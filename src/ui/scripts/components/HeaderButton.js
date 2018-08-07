import { createElement as h } from 'react'
import { compose, setDisplayName, setPropTypes } from 'recompose'
import PropTypes from 'prop-types'
import classNames from 'classnames'

const enhance = compose(

	setDisplayName('HeaderButton'),

	setPropTypes({
		active: PropTypes.bool,
		children: PropTypes.node.isRequired
	})

)

const Component = (props) => (

	h('button', {
		className: classNames({
			'headerButton': true,
			'active': props.active === true,
			'link': true,
			'c-white': props.active === true
		}),
		onClick: props.onClick
	}, props.children)

)

export default enhance(Component)