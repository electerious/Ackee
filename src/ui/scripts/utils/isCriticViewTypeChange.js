import {
	VIEWS_TYPE_UNIQUE,
	VIEWS_TYPE_TOTAL,
	VIEWS_TYPE_PAGES
} from '../../../constants/views'

export default (prev, next) => {

	const states = {
		[VIEWS_TYPE_UNIQUE]: {
			[VIEWS_TYPE_UNIQUE]: false,
			[VIEWS_TYPE_TOTAL]: false,
			[VIEWS_TYPE_PAGES]: true
		},
		[VIEWS_TYPE_TOTAL]: {
			[VIEWS_TYPE_UNIQUE]: false,
			[VIEWS_TYPE_TOTAL]: false,
			[VIEWS_TYPE_PAGES]: true
		},
		[VIEWS_TYPE_PAGES]: {
			[VIEWS_TYPE_UNIQUE]: true,
			[VIEWS_TYPE_TOTAL]: true,
			[VIEWS_TYPE_PAGES]: false
		}
	}

	return states[prev][next]

}