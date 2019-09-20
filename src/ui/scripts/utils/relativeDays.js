export default (offset) => {

	switch (offset) {
		case 0: return 'Today'
		case 1: return 'Yesterday'
		default: return `${ offset } days ago`
	}

}