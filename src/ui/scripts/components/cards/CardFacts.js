import { createElement as h } from 'react'
// import PropTypes from 'prop-types'

import Headline from '../Headline'

const CardFacts = () => {
	return (
		h('div', {
			className: 'card card--wide'
		},
			h('div', { className: 'card__facts' },
				h('div', { className: 'card__inner' },
					h(Headline, {
						type: 'h2',
						size: 'small'
					}, 'Active visitors')
				),
				h('div', { className: 'card__separator card__separator--vertical' }),
				h('div', { className: 'card__inner' },
					h(Headline, {
						type: 'h2',
						size: 'small'
					}, 'Average views')
				),
				h('div', { className: 'card__separator card__separator--vertical' }),
				h('div', { className: 'card__inner' },
					h(Headline, {
						type: 'h2',
						size: 'small'
					}, 'Average duration')
				)
			),
			h('div', { className: 'card__separator card__separator--horizontal' }),
			h('div', { className: 'card__facts' },
				h('div', { className: 'card__inner' },
					h(Headline, {
						type: 'h2',
						size: 'small'
					}, 'Views today')
				),
				h('div', { className: 'card__separator card__separator--vertical' }),
				h('div', { className: 'card__inner' },
					h(Headline, {
						type: 'h2',
						size: 'small'
					}, 'Views this month')
				),
				h('div', { className: 'card__separator card__separator--vertical' }),
				h('div', { className: 'card__inner' },
					h(Headline, {
						type: 'h2',
						size: 'small'
					}, 'Views this year')
				)
			)
		)
	)

}

CardFacts.propTypes = {
}

export default CardFacts