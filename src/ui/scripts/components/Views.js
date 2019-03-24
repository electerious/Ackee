import { createElement as h, Component, Fragment } from 'react'

import mergeViews from '../utils/mergeViews'
import enhanceViews from '../utils/enhanceViews'
import isDefined from '../utils/isDefined'

import Card from './Card'

const Views = class extends Component {

	constructor(props) {

		super(props)

	}

	componentDidMount() {

		this.props.fetchDomains(this.props).then(() => {

			this.props.domains.value.map((props) => {
				this.props.fetchViews(props.data.id, this.props)
			})

		})

	}

	render() {

		// Enhance all view for all domains
		const enhancedViews = this.props.domains.value.map((props) => {

			const view = this.props.views.value[props.data.id]
			const exists = view != null

			return exists === true ? enhanceViews(view.value, 14) : undefined

		})

		// Remove views from domains that are still loading
		const filteredViews = enhancedViews.filter(isDefined)

		// Merge all views to one array of views
		const mergedViews = mergeViews(filteredViews)

		return (
			h(Fragment, {},

				h(Card, {
					wide: true,
					headline: 'Page Views',
					items: mergedViews
				}),

				this.props.domains.value.map(
					(props, index) => h(Fragment, { key: index },
						h(Card, {
							headline: props.data.title,
							items: this.props.views.value[props.data.id] == null ? [] : enhanceViews(this.props.views.value[props.data.id].value, 7)
						})
					)
				)

			)
		)

	}

}

export default Views