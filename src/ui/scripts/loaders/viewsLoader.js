export default (domainId, opts) => {

	// TODO: Improve ids
	const id = `fetchViews${ domainId }${ JSON.stringify(opts) }`

	const query = `
		query fetchViews($domainId: ID!, $interval: Interval!, $type: ViewType!) {
			domain(id: $domainId) {
				id
				statistics {
					views(interval: $interval, type: $type) {
						id
						count
					}
				}
			}
		}
	`

	const variables = {
		domainId,
		interval: opts.interval,
		type: opts.type
	}

	const selector = (data) => data.domain.statistics.views

	return {
		id,
		query,
		variables,
		selector
	}

}