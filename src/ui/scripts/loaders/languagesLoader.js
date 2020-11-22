export default (domainId, opts) => {

	// TODO: Improve ids
	const id = `${ domainId }${ JSON.stringify(opts) }`

	const query = `
		query fetchLanguages($domainId: ID!, $sorting: Sorting!, $range: Range) {
			domain(id: $domainId) {
				id
				statistics {
					languages(sorting: $sorting, range: $range) {
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

	const selector = (data) => data.domain.statistics.languages

	return {
		id,
		query,
		variables,
		selector
	}

}