import { createElement as h, useState } from 'react'
import PropTypes from 'prop-types'
import classNames from 'classnames'

import Headline from '../Headline'
import Text from '../Text'
import Updating from '../Updating'
import PresentationEmptyState, { ICON_LOADING, ICON_WARNING } from '../presentations/PresentationEmptyState'
import status from '../../utils/status'

const CardWidget = (props) => {

	const {
		isEmpty,
		isStale,
		isLoading
	} = status(props.widget.value, props.widget.fetching)

	// Use thin space as initial value to avoid that the label changes the height once rendered
	const [ textLabel, setTextLabel ] = useState(' ')

	const presentation = (() => {
		if (isLoading === true) {
			return h(PresentationEmptyState, {
				icon: ICON_LOADING
			}, 'Loading data')
		}

		if (isEmpty === true) {
			h(PresentationEmptyState, {
				icon: ICON_WARNING
			}, 'No data')
		}

		return h(props.widget.Renderer, {
			widget: props.widget,
			setTextLabel
		})
	})()

	return (
		h('div', {
			className: classNames({
				'card': true,
				'card--wide': props.wide === true
			})
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
				}, isStale === true ? h(Updating) : textLabel),
				presentation
			)
		)
	)

}

CardWidget.propTypes = {
	wide: PropTypes.bool,
	headline: PropTypes.string.isRequired,
	widget: PropTypes.object.isRequired,
	onMore: PropTypes.func
}

export default CardWidget