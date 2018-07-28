import { createElement as h } from 'react'
import { compose, setDisplayName, setPropTypes } from 'recompose'
import PropTypes from 'prop-types'
import classNames from 'classnames'

const enhance = compose(

	setDisplayName('Text'),

	setPropTypes({
		spacing: PropTypes.bool,
		className: PropTypes.string,
		children: PropTypes.node.isRequired
	})

)

const Component = (props) => (

	h('p', {
		className: classNames({
			'text': true,
			'text--no-spacing': props.spacing === false
		}, props.className)
	}, props.children)

)

export default enhance(Component)