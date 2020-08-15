import { ROUTE_OVERVIEW } from '../constants/route'

export default (domain) => {

	return {
		...ROUTE_OVERVIEW,
		params: {
			domainId: domain.id
		}
	}

}