import { gql } from '@apollo/client'
import { formatDuration } from 'date-fns'

import constantFields from '../../fragments/constantFields'
import useQuery from '../../utils/useQuery'

const QUERY = gql`
	query constants {
		constants {
            durationsLimit {
                ...constantFields
            }
            durationsInterval {
                ...constantFields
            }
        }
	}

	${ constantFields }
`

const metadata = new Map([
	[ 'durationsLimit', {
		title: 'Durations Limit',
	}],
	[ 'durationsInterval', {
		title: 'Durations Interval',
	}],
])

const createDuration = (ms) => {
	const date = new Date(null)
	date.setMilliseconds(ms)
	return {
		hours: date.getUTCHours(),
		minutes: date.getUTCMinutes(),
		seconds: date.getUTCSeconds(),
	}
}

export default () => {
	const selector = (data) => data?.constants
	const enhancer = (constants) => {
		if (!constants) return []
		return Object.entries(constants)
			.filter(([ , value ]) => value?.id)
			.map(([ key, value ]) => ({
				...metadata.get(key),
				...value,
				name: value.id,
				id: formatDuration(createDuration(value.value), {
					format: [ value.unit ],
				}),
			}))
	}

	return useQuery(QUERY, selector, enhancer, {
		fetchPolicy: 'cache-first',
		nextFetchPolicy: 'cache-first',
	})
}