export default (property) => (a, b) => {
  const valueA = String(a[property])
  const valueB = String(b[property])

  return valueA.localeCompare(valueB, 'en', { numeric: true })
}
