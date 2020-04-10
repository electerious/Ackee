export default (devices) => devices.map((device) => ({
	text: device.data.id.deviceName ? `${ device.data.id.deviceManufacturer } ${ device.data.id.deviceName }` : device.data.id,
	count: device.data.count,
	date: device.data.created == null ? null : new Date(device.data.created)
}))