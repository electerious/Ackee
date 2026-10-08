export default (number) => {
  const cleanNumber = Number.parseFloat(number).toFixed(2).replace('.00', '')

  return cleanNumber + 'x'
}
