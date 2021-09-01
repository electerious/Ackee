import { BatchHttpLink } from '@apollo/client/link/batch-http'

import userTimeZone from '../../../../utils/timeZone'

export default () => {
	return new BatchHttpLink({
		uri: '/analytics/api',
		headers: {
			'Time-Zone': userTimeZone,
		},
	})
}