import { createElement as h, Component, Fragment } from 'react'

import enhanceViews from '../../utils/enhanceViews'

import CardViews from '../cards/CardViews'

const RouteViews = class extends Component {

	componentDidMount() {

		this.props.fetchDomains(this.props).then(() => {

			this.props.domains.value.map((props) => {
				this.props.fetchViews(props.data.id, this.props)
			})

		})

	}

	render() {

		return (
			h(Fragment, {},

				h(CardViews, {
					wide: true,
					headline: 'Page Views',
					items: this.props.merged.views
				}),

				this.props.domains.value.map(
					(props) => (
						h(CardViews, {
							key: props.data.id,
							headline: props.data.title,
							items: this.props.views.value[props.data.id] == null ? [] : enhanceViews(this.props.views.value[props.data.id].value, 7)
						})
					)
				)

			)
		)

	}

}

export default RouteViews