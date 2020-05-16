import { createElement as h } from 'react'
import PropTypes from 'prop-types'
import classNames from 'classnames'

export const HORIZONTAL = Symbol('horizontal')
export const VERTICAL = Symbol('vertical')

const Stack = (props) => {

	return (
		h('div', {
			className: classNames({
				'stack': true,
				'stack--horizontal': props.direction === HORIZONTAL,
				'stack--vertical': props.direction === VERTICAL
			})
		},
			...props.children
		)
	)

}

Stack.propTypes = {
	direction: PropTypes.oneOf([ HORIZONTAL, VERTICAL ]).isRequired
}

export default Stack