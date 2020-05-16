import { createElement as h } from 'react'

const Updater = () => {

	return (
		h('span', { className: 'updater' },
			h('span', { className: 'updater__circle' })
		)
	)

}

export default Updater