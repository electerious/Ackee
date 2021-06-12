import { createElement as h, useState, useEffect, useCallback } from 'react'
import PropTypes from 'prop-types'

import { SORTINGS_TOP, SORTINGS_RECENT } from '../../../../constants/sortings'

import relativeDate from '../../utils/relativeDate'
import rangeLabel from '../../utils/rangeLabel'
import formatCount from '../../utils/formatCount'

import PresentationCounterList from '../presentations/PresentationCounterList'
import PresentationList from '../presentations/PresentationList'

const textLabel = (item, range, isRecent) => {
	if (item && item.date) return relativeDate(item.date)
	if (isRecent) return 'Recent'

	return rangeLabel(range)
}

const RendererList = (props) => {
	// Index of the active element
	const [ active, setActive ] = useState()

	const onItemEnter = useCallback((index) => setActive(index), [ setActive ])
	const onItemLeave = useCallback(() => setActive(), [ setActive ])

	const label = textLabel(props.items[active], props.range, props.sorting === SORTINGS_RECENT)
	useEffect(() => props.setStatusLabel(label), [ label ])

	if (props.sorting === SORTINGS_TOP) return h(PresentationCounterList, {
		items: props.items,
		formatter: formatCount,
	})

	return h(PresentationList, {
		items: props.items,
		onItemEnter,
		onItemLeave,
	})
}

RendererList.propTypes = {
	items: PropTypes.array.isRequired,
	sorting: PropTypes.string.isRequired,
	range: PropTypes.string.isRequired,
	setStatusLabel: PropTypes.func.isRequired,
}

export default RendererList