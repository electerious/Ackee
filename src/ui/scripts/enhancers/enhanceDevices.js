export default (devices = []) => {

	return devices.map((device) => ({
		text: device.id,
		count: device.count,
		date: device.created == null ? null : new Date(device.created)
	}))

}