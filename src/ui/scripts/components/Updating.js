import { createElement as h } from 'react'

import Stack, { HORIZONTAL } from './Stack'
import Updater from './Updater'

const Updating = () => {

	return (
		h(Stack, { direction: HORIZONTAL },
			h(Updater, {}),
			'Updating'
		)
	)

}

export default Updating