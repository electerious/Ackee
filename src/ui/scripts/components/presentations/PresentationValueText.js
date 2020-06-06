import { createElement as h } from 'react'
import PropTypes from 'prop-types'
import classNames from 'classnames'

import Headline from '../Headline'
import Text from '../Text'

const PresentationValueText = (props) => {

	return (
		h('div', {
			className: classNames({
				valueText: true,
				visible: props.visible === true
			})
		},
			h(Headline, {
				type: 'div',
				spacing: false
			}, props.value),
			h(Text, {
				type: 'div',
				spacing: false
			}, props.text)
		)
	)

}

PresentationValueText.propTypes = {
	visible: PropTypes.bool.isRequired,
	value: PropTypes.oneOfType([
		PropTypes.number,
		PropTypes.string
	]).isRequired,
	text: PropTypes.string.isRequired
}

export default PresentationValueText