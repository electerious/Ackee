export default (domainId, opts) => {

	// TODO: Improve ids
	const id = `fetchDurations${ domainId }${ JSON.stringify(opts) }`

	const query = `
		query fetchDurations($domainId: ID!, $interval: Interval!) {
			domain(id: $domainId) {
				id
				statistics {
					durations(interval: $interval) {
						id
						count
					}
				}
			}
		}
	`

	const variables = {
		domainId,
		interval: opts.interval
	}

	const selector = (data) => data.domain.statistics.durations

	return {
		id,
		query,
		variables,
		selector
	}

}