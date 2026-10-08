export default (timestamp, ttl) => {
  const current = Date.now()
  const passed = current - timestamp

  return ttl < passed
}
