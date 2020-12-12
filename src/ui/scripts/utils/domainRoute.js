import { ROUTE_DOMAIN } from '../constants/route'

export default (domain) => {

	return {
		...ROUTE_DOMAIN,
		params: {
			domainId: domain.id
		}
	}

}