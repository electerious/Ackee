export default (domainId, opts) => {

	// TODO: Improve ids
	const id = `fetchSizes${ domainId }${ JSON.stringify(opts) }`

	const query = `
		query fetchSizes($domainId: ID!, $sorting: Sorting!, $type: SizeType!, $range: Range) {
			domain(id: $domainId) {
				id
				statistics {
					sizes(sorting: $sorting, type: $type, range: $range) {
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
		range: opts.range,
		type: opts.type
	}

	const selector = (data) => data.domain.statistics.sizes

	return {
		id,
		query,
		variables,
		selector
	}

}