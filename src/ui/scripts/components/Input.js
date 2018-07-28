import { compose, setDisplayName } from 'recompose'

import h from '../utils/h'

const enhance = compose(

	setDisplayName('Input')

)

const Component = (props) => (

	h('input', {
		className: 'input',
		...props
	})

)

export default enhance(Component)