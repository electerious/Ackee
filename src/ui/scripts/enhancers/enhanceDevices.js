const getText = ({ id }) => {

	const isWithModel = id.deviceName != null

	if (isWithModel === true) return `${ id.deviceManufacturer } ${ id.deviceName }`

	return id

}

export default (devices) => {

	// Extract and enhance the data from the API
	return devices.map((device) => ({
		text: getText(device.data),
		count: device.data.count,
		date: device.data.created == null ? null : new Date(device.data.created)
	}))

}