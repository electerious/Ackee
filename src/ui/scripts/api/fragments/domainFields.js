import { gql } from '@apollo/client'

export default gql`
	fragment domainFields on Domain {
		id
		title
	}
`