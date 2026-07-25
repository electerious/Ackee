export default (words, number) => {
  switch (number) {
    case 0: {
      return words[0]
    }
    case 1: {
      return words[1]
    }
    default: {
      return words[2]
    }
  }
}
