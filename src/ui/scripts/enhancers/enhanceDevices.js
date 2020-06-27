export default (devices) => {

	return devices.map((device) => ({
		text: device.data.id,
		count: device.data.count,
		date: device.data.created == null ? null : new Date(device.data.created)
	}))

}