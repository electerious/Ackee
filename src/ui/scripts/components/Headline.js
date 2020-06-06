import { createElement as h } from 'react'
import PropTypes from 'prop-types'
import classNames from 'classnames'

const Headline = (props) => {

	const hasClick = props.onClick != null

	const button = h('button', {
		className: 'headline__button link',
		onClick: props.onClick
	}, props.children)

	return (
		h(props.type, {
			className: classNames({
				headline: true,
				[`headline--${ props.size }`]: props.size != null
			}, props.className)
		}, hasClick === true ? button : props.children)
	)

}

Headline.propTypes = {
	type: PropTypes.oneOf([ 'h1', 'h2', 'h3', 'h4', 'h5', 'h6' ]).isRequired,
	size: PropTypes.oneOf([ 'medium', 'small' ]),
	className: PropTypes.string,
	children: PropTypes.node.isRequired,
	onClick: PropTypes.func
}

export default Headline