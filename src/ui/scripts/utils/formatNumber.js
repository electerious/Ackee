import humanNumber from 'human-number'

export default (number) => {
  const roundedNumber = Math.round(number)
  const formattedNumber = humanNumber(roundedNumber, (innerNumber) => Number.parseFloat(innerNumber).toFixed(1))
  const cleanNumber = formattedNumber.replace('.0', '')

  return cleanNumber
}
