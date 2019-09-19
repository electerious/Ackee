export default (referrers) => {

	// Extract and enhance the data from the API
	return referrers.map((referrer) => ({
		url: new URL(referrer.data.id),
		count: referrer.data.count
	}))

}