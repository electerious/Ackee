export default (devices = []) => {
	return devices.map((device) => ({
		text: device.value,
		count: device.count,
		date: device.created == null ? null : new Date(device.created),
	}))
}