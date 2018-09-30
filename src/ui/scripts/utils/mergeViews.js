export default (viewsList) => {

	return viewsList.reduce((acc, views) => {

		views.forEach((view, index) => {
			const initial = acc[index] == null ? 0 : acc[index]
			acc[index] = initial + view
		})

		return acc

	}, [])

}