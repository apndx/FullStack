import { gql } from 'apollo-boost'


const AUTHOR_DETAILS = gql`
  fragment AuthorDetails on Author {
    authorName,
    born,
    bookCount
}
`
const BOOK_DETAILS = gql`    
  fragment BookDetails on Book {
    title,
    published,
    author {
      authorName,
      born,
      bookCount
    }
}
`

export default {
  AUTHOR_DETAILS,
  BOOK_DETAILS
}
