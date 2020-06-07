import { createElement as h } from 'react'
import PropTypes from 'prop-types'

import Headline from '../Headline'
import Text from '../Text'

const PresentationValueText = (props) => {

	return (
		h('div', {
			className: 'valueText'
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
	value: PropTypes.oneOfType([
		PropTypes.number,
		PropTypes.string
	]).isRequired,
	text: PropTypes.string.isRequired
}

export default PresentationValueText