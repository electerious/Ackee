export default (number) => {
  const cleanNumber = Number(number).toFixed(2).replace('.00', '')

  return cleanNumber + 'x'
}
