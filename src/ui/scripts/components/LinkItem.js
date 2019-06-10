import { createElement as h } from 'react'
import PropTypes from 'prop-types'
import classNames from 'classnames'

const LinkItem = (props) => {

	return (
		h(props.type, {
			onClick: props.onClick,
			href: props.href,
			target: props.target,
			className: classNames({
				'linkItem': true,
				'linkItem--disabled': props.disabled === true,
				'link': true
			})
		},
			h('span', {}, props.children),
			props.text != null && h('span', {}, props.text)
		)
	)

}

LinkItem.propTypes = {
	type: PropTypes.oneOf([ 'p', 'a', 'button' ]).isRequired,
	href: PropTypes.string,
	target: PropTypes.string,
	onClick: PropTypes.func,
	disabled: PropTypes.bool,
	text: PropTypes.string,
	children: PropTypes.node.isRequired
}

export default LinkItem