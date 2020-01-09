import { gql } from 'apollo-boost'
import fragments from './fragments'

const ALL_AUTHORS = gql`
{
  allAuthors {
    ...AuthorDetails
  }
}
${fragments.AUTHOR_DETAILS}
`
const ALL_BOOKS = gql`
query allBooks($genre: String){
    allBooks(genre: $genre) {
    ...BookDetails
  }
}
${fragments.BOOK_DETAILS}
`
const GENRES = gql`
{ 
  allGenres 
}
`

const ME = gql`
{ 
  me {
    username,
    favoriteGenre
  }
}
`

export default {
    ALL_AUTHORS,
    ALL_BOOKS,
    GENRES,
    ME
}
