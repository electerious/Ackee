import { createElement as h } from 'react'
import classNames from 'classnames'
import PropTypes from 'prop-types'

import IconArrowRight from './icons/IconArrowRight'

const type = (value) => {
	if (value > 5) return 'positive'
	if (value < -5) return 'negative'

	return 'neutral'
}

const title = (value, formattedValue) => {
	if (value > 0) return `A ${ formattedValue } increase when comparing the last 7 days with the previous 7 days`
	if (value < 0) return `A ${ formattedValue } decrease when comparing the last 7 days with the previous 7 days`

	return `No change when comparing the last 7 days with the previous 7 days`
}

const ChangeBadge = (props) => {
	const value = props.value
	const formattedValue = `${ Math.abs(props.value) }%`

	return (
		h('div', {
			className: classNames(
				'badge',
				'badge--with-icon',
				`badge--${ type(value) }`,
			),
			title: title(value, formattedValue),
		},
			h(IconArrowRight, { className: 'badge__icon' }),
			h('span', { className: 'badge__value' }, formattedValue),
		)
	)
}

ChangeBadge.propTypes = {
	value: PropTypes.number.isRequired,
}

export default ChangeBadge