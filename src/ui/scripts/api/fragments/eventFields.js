import { gql } from '@apollo/client'

export default gql`
	fragment eventFields on Event {
		id
		title
		type
	}
`