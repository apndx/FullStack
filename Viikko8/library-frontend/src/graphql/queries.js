import { gql } from 'apollo-boost'

const ALL_AUTHORS = gql`
{
  allAuthors {
    authorName,
    born,
    bookCount
  }
}
`
const ALL_BOOKS = gql`
query allBooks($genre: String){
    allBooks(genre: $genre) {
    title,
    published,
    genres
    author {
      authorName,
      born,
      bookCount
    }
  }
}
`
const GENRES = gql`
{ 
  allGenres 
}
`

export default {
    ALL_AUTHORS,
    ALL_BOOKS,
    GENRES
}