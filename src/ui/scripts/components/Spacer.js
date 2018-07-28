import { compose, setDisplayName, setPropTypes } from 'recompose'
import PropTypes from 'prop-types'

import h from '../utils/h'

const enhance = compose(

	setDisplayName('Spacer'),

	setPropTypes({
		size: PropTypes.number.isRequired
	})

)

const Component = (props) => (

	h('div', {
		className: 'spacer',
		style: {
			'--size': props.size
		}
	})

)

export default enhance(Component)