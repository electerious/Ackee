export default (domainId, opts) => {

	// TODO: Improve ids
	const id = `fetchDevices${ domainId }${ JSON.stringify(opts) }`

	const query = `
		query fetchDevices($domainId: ID!, $sorting: Sorting!, $type: DeviceType!, $range: Range) {
			domain(id: $domainId) {
				id
				statistics {
					devices(sorting: $sorting, type: $type, range: $range) {
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

	const selector = (data) => data.domain.statistics.devices

	return {
		id,
		query,
		variables,
		selector
	}

}