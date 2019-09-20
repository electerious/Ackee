export default (referrers) => {

	// Extract and enhance the data from the API
	return referrers.map((referrer) => ({
		url: new URL(referrer.data.id),
		text: new URL(referrer.data.id).href,
		count: referrer.data.count,
		date: referrer.data.created == null ? null : new Date(referrer.data.created)
	}))

}