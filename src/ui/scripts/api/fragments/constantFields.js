import { gql } from '@apollo/client'

export default gql`
	fragment constantFields on Constants {
		id
        value
        unit
	}
`