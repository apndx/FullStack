import { gql } from 'apollo-boost'
import fragments from './fragments'

const BOOK_ADDED = gql`
  subscription {
    bookAdded {
      ...BookDetails
    }
  }
${fragments.BOOK_DETAILS}
`

export default {
    BOOK_ADDED
}
