import { BatchHttpLink } from '@apollo/client/link/batch-http'

import config from '../../../../utils/config'
import userTimeZone from '../../../../utils/timeZone'

export default () => {
	return new BatchHttpLink({
		uri: `${ config.baseUrl }/api`,
		headers: {
			'Time-Zone': userTimeZone,
		},
	})
}