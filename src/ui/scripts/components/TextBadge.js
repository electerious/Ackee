import { createElement as h } from 'react'
import classNames from 'classnames'
import PropTypes from 'prop-types'

const TextBadge = (props) => {
	return (
		h('div', {
			className: classNames(
				'badge',
				`badge--${ props.type }`,
			),
		},
			h('span', {
				className: 'badge__value',
			}, props.value),
		)
	)
}

TextBadge.propTypes = {
	type: PropTypes.oneOf([ 'positive', 'negative', 'neutral' ]).isRequired,
	value: PropTypes.string.isRequired,
}

export default TextBadge