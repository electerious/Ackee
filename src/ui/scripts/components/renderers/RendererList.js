import { createElement as h, useState, useEffect } from 'react'
import PropTypes from 'prop-types'

import { SORTINGS_TOP, SORTINGS_RECENT } from '../../../../constants/sortings'

import PresentationCounterList from '../presentations/PresentationCounterList'
import PresentationList from '../presentations/PresentationList'
import relativeDate from '../../utils/relativeDate'
import rangeLabel from '../../utils/rangeLabel'

const textLabel = (item, range, isRecent) => {

	if (item && item.date) return relativeDate(item.date)
	if (isRecent) return 'Recent'

	return rangeLabel(range)

}

const RendererList = (props) => {

	const items = props.widget.value
	const { range, sorting } = props.widget.variables

	// Index of the active element
	const [ active, setActive ] = useState()

	const onEnter = (index) => setActive(index)
	const onLeave = () => setActive()

	const label = textLabel(items[active], range, sorting === SORTINGS_RECENT)
	useEffect(() => props.setStatusLabel(label), [ label ])

	if (sorting === SORTINGS_TOP) return h(PresentationCounterList, {
		items
	})

	return h(PresentationList, {
		items,
		onEnter,
		onLeave
	})

}

RendererList.propTypes = {
	widget: PropTypes.object.isRequired,
	setStatusLabel: PropTypes.func.isRequired
}

export default RendererList