export default (referrers) => {

	return referrers.map((referrer) => ({
		url: new URL(referrer.id),
		text: new URL(referrer.id).href,
		count: referrer.count,
		date: referrer.created == null ? null : new Date(referrer.created)
	}))

}