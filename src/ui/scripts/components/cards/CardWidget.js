import { createElement as h } from 'react'
import PropTypes from 'prop-types'

import Headline from '../Headline'
import Text from '../Text'
import PresentationEmptyState, { ICON_LOADING, ICON_WARNING } from '../presentations/PresentationEmptyState'
import status from '../../utils/status'

const CardWidget = (props) => {

	const {
		isEmpty,
		isStale,
		isLoading
	} = status(props.widget.value, props.widget.fetching)

	if (isLoading === true) {

		return (
			h('div', {
				className: 'card'
			},
				h('div', { className: 'card__inner' },
					h(Headline, {
						type: 'h2',
						size: 'medium',
						onClick: props.onMore
					}, props.headline),
					h(Text, {
						type: 'div',
						spacing: false
					}, 'Test'),
					h(PresentationEmptyState, {
						icon: ICON_LOADING
					}, 'Loading data')
				)
			)
		)

	}

	if (isEmpty === true) {

		return (
			h('div', {
				className: 'card'
			},
				h('div', { className: 'card__inner' },
					h(Headline, {
						type: 'h2',
						size: 'medium',
						onClick: props.onMore
					}, props.headline),
					h(Text, {
						type: 'div',
						spacing: false
					}, 'Test'),
					h(PresentationEmptyState, {
						icon: ICON_WARNING
					}, 'No data')
				)
			)
		)

	}

	return h(props.widget.Renderer, {
		headline: props.headline,
		widget: props.widget,
		stale: isStale,
		onMore: props.onMore
	})

}

CardWidget.propTypes = {
	headline: PropTypes.string.isRequired,
	widget: PropTypes.object.isRequired,
	onMore: PropTypes.func
}

export default CardWidget