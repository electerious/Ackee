export default (os) => os.map((singleOs) => ({
	text: singleOs.data.id.osVersion ? `${ singleOs.data.id.osName } ${ singleOs.data.id.osVersion }` : singleOs.data.id,
	count: singleOs.data.count,
	date: singleOs.data.created == null ? null : new Date(singleOs.data.created)
}))
