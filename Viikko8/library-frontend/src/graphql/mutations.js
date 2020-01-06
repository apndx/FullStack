import { gql } from 'apollo-boost'

const CREATE_BOOK = gql`
mutation createBook($title: String!, $authorName: String!, $published: Int!, $genres: [String!]!) {
  addBook(
    title: $title,
    authorName: $authorName,
    published: $published,
    genres: $genres
  ) {
    title
    published
    author {
      authorName,
      bookCount
    }
  }
}
`
const ADD_BIRTH_YEAR = gql`
mutation addBirthYear($authorName: String!, $born: Int!) {
  editAuthorBorn(
    authorName: $authorName,
    born: $born
  ) {
    authorName
    born
  }
}
`
const LOGIN = gql`
  mutation login($username: String!, $password: String!) {
    login(username: $username, password: $password)  {
      value
    }
  }
  `

  export default {
      CREATE_BOOK,
      ADD_BIRTH_YEAR,
      LOGIN
  }