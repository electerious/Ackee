export default (domainId, opts) => {

	// TODO: Improve ids
	const id = `fetchPages${ domainId }${ JSON.stringify(opts) }`

	const query = `
		query fetchPages($domainId: ID!, $sorting: Sorting!, $range: Range) {
			domain(id: $domainId) {
				id
				statistics {
					pages(sorting: $sorting, range: $range) {
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

	const selector = (data) => data.domain.statistics.pages

	return {
		id,
		query,
		variables,
		selector
	}

}