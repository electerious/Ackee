import { createElement as h } from 'react'

import Updater from './Updater'

const Updating = () => {

	return (
		h('div', { className: 'updating' },
			h(Updater, {}),
			'Updating'
		)
	)

}

export default Updating