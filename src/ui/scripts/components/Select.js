import { createElement as h } from 'react'
import PropTypes from 'prop-types'

const Component = (props) => (

	h('select', {
		className: 'select',
		value: props.value,
		onChange: props.onChange
	},
		props.items.map((item, index) => (
			h('option', {
				key: index,
				value: item.value
			}, item.label)
		))
	)

)

Component.displayName = 'Select'

Component.propTypes = {
	value: PropTypes.string,
	onChange: PropTypes.func.isRequired,
	items: PropTypes.arrayOf(
		PropTypes.shape({
			value: PropTypes.string.isRequired,
			label: PropTypes.string.isRequired
		})
	).isRequired
}

export default Component