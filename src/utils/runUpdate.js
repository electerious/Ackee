export default (schema, id, data = {}, props = []) => {

	const _set = {}

	Object.keys(data).forEach((key) => {

		// Check if it's allowed to change key
		if (props.includes(key) === false) return

		_set[key] = data[key]

	})

	return schema.findOneAndUpdate({
		id
	}, {
		$set: {
			..._set,
			updated: Date.now()
		}
	}, {
		new: true
	})

}