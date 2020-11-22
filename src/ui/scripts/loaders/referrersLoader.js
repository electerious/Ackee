export default (domainId, opts) => {

	// TODO: Improve ids
	const id = `fetchReferrers${ domainId }${ JSON.stringify(opts) }`

	const query = `
		query fetchReferrers($domainId: ID!, $sorting: Sorting!, $range: Range) {
			domain(id: $domainId) {
				id
				statistics {
					referrers(sorting: $sorting, range: $range) {
						id
						count
						created
					}
				}
			}
		}
	`

	const variables = {
		domainId,
		sorting: opts.sorting,
		range: opts.range
	}

	const selector = (data) => data.domain.statistics.referrers

	return {
		id,
		query,
		variables,
		selector
	}

}