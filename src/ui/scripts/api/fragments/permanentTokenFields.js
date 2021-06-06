import { gql } from '@apollo/client'

export default gql`
	fragment permanentTokenFields on PermanentToken {
		id
		title
	}
`