import { createElement as h } from 'react'
import { compose, setDisplayName, setPropTypes } from 'recompose'
import PropTypes from 'prop-types'
import classNames from 'classnames'

const enhance = compose(

	setDisplayName('Headline'),

	setPropTypes({
		type: PropTypes.string.isRequired,
		small: PropTypes.bool,
		spacing: PropTypes.bool,
		className: PropTypes.string,
		children: PropTypes.node.isRequired
	})

)

const Component = (props) => (

	h(props.type, {
		className: classNames({
			'headline': true,
			'headline--small': props.small === true,
			'headline--no-spacing': props.spacing === false
		}, props.className)
	}, props.children)

)

export default enhance(Component)