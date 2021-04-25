import { useQuery, gql } from '@apollo/client'

import domainFields from '../fragments/domainFields'

const FETCH_MERGED_VIEWS = gql`
	query fetchMergedViews($interval: Interval!, $type: ViewType!, $limit: Int) {
		statistics {
			views(interval: $interval, type: $type, limit: $limit) {
				id
				count
			}
		}
	}
`

const FETCH_DOMAIN_VIEWS = gql`
	query fetchDomainViews($id: ID!, $interval: Interval!, $type: ViewType!, $limit: Int) {
		domain(id: $id) {
			...domainFields
			statistics {
				views(interval: $interval, type: $type, limit: $limit) {
					id
					count
				}
			}
		}
	}

	${ domainFields }
`

export default (id, opts) => {

	const query = id == null ? FETCH_MERGED_VIEWS : FETCH_DOMAIN_VIEWS
	const variables = id == null ? {
		interval: opts.interval,
		type: opts.type,
		limit: opts.limit
	} : {
		id,
		interval: opts.interval,
		type: opts.type,
		limit: opts.limit
	}
	const selector = (data) => id == null ? data.statistics.views : data.domain.statistics.views

	const { loading: fetching, error, data } = useQuery(query, {
		variables,
		fetchPolicy: 'cache-and-network',
		nextFetchPolicy: 'cache-first'
	})

	return {
		fetching,
		stale: fetching === true && data != null,
		error,
		value: data == null ? [] : selector(data)
	}

}