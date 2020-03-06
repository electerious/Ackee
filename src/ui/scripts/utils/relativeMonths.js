import { subMonths } from 'date-fns'

export default (offset) => {

	switch (offset) {
		case 0: return 'This month'
		case 1: return 'Last month'
		default: return subMonths(new Date(), offset).toLocaleString('en-US', { month: 'long', year: 'numeric' })
	}

}