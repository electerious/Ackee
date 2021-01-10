import { createElement as h, useState, useEffect } from 'react'
import PropTypes from 'prop-types'

import { SORTINGS_NEW, SORTINGS_RECENT } from '../../../../constants/sortings'

import PresentationIconList from '../presentations/PresentationIconList'
import relativeDate from '../../utils/relativeDate'
import rangeLabel from '../../utils/rangeLabel'

const textLabel = (item, range, isRecent, isNew) => {

	if (item && item.date) return relativeDate(item.date)
	if (item && item.count) return `${ item.count } ${ item.count === 1 ? 'visit' : 'visits' }`

	if (isRecent) return 'Recent'
	if (isNew) return 'New'

	return rangeLabel(range)

}

const RendererReferrers = (props) => {

	const items = props.widget.value
	const { range, sorting } = props.widget.variables

	// Index of the active element
	const [ active, setActive ] = useState()

	const onEnter = (index) => setActive(index)
	const onLeave = () => setActive()

	const label = textLabel(items[active], range, sorting === SORTINGS_RECENT, sorting === SORTINGS_NEW)
	useEffect(() => props.setStatusLabel(label), [ label ])

	return h(PresentationIconList, {
		items,
		onEnter,
		onLeave
	})

}

RendererReferrers.propTypes = {
	widget: PropTypes.object.isRequired,
	setStatusLabel: PropTypes.func.isRequired
}

export default RendererReferrers