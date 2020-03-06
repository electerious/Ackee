import { subYears } from 'date-fns'

export default (offset) => {

	switch (offset) {
		case 0: return 'This year'
		case 1: return 'Last year'
		default: return subYears(new Date(), offset).getFullYear()
	}

}