import { createElement as h } from 'react'
import { compose, setDisplayName, setPropTypes } from 'recompose'
import PropTypes from 'prop-types'
import classNames from 'classnames'

const enhance = compose(

	setDisplayName('Message'),

	setPropTypes({
		status: PropTypes.string,
		className: PropTypes.string,
		children: PropTypes.node.isRequired
	})

)

const Component = (props) => (

	h('div', {
		className: classNames({
			message: true,
			[`message--${ props.status }`]: props.status != null
		}, props.className)
	}, props.children)

)

export default enhance(Component)