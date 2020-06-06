export default (words, num) => {

	switch (num) {
		case 0: return words[0]
		case 1: return words[1]
		default: return words[2]
	}

}