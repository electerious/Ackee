import humanNumber from 'human-number'

export default (number) => {
  const formattedNumber = humanNumber(number, (innerNumber) => Number.parseFloat(innerNumber).toFixed(2))
  const cleanNumber = formattedNumber.replace('.00', '')

  return cleanNumber
}
