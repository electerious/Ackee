export default (domainId, opts) => {

	// TODO: Improve ids
	const id = `fetchBrowsers${ domainId }${ JSON.stringify(opts) }`

	const query = `
		query fetchBrowsers($domainId: ID!, $sorting: Sorting!, $type: BrowserType!, $range: Range) {
			domain(id: $domainId) {
				id
				statistics {
					browsers(sorting: $sorting, type: $type, range: $range) {
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

	const selector = (data) => data.domain.statistics.browsers

	return {
		id,
		query,
		variables,
		selector
	}

}