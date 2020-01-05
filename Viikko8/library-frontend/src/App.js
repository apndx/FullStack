import React, { useState } from 'react'
import Login from './components/Login'
import Authors from './components/Authors'
import Books from './components/Books'
import NewBook from './components/NewBook'
import EditAuthor from './components/EditAuthor'
import Genres from './components/Genres'
import { gql } from 'apollo-boost'
import { Query, ApolloConsumer, Mutation } from 'react-apollo'
import { useQuery, useMutation, useApolloClient } from '@apollo/react-hooks'

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

const App = () => {
  const [page, setPage] = useState('books')
  const [errorMessage, setErrorMessage] = useState(null)
  const [token, setToken] = useState(null)
  const [genre, setGenre] = useState(null)
  const client = useApolloClient()
  const genres = useQuery(GENRES)
  const [books, setBooks] = useState([])

  const handleError = (error) => {
    setErrorMessage(error.graphQLErrors[0].message)
    setTimeout(() => {
      setErrorMessage(null)
    }, 10000)
  }

  const [login] = useMutation(LOGIN, {
    onError: handleError
  })

  const logout = () => {
    setToken(null)
    localStorage.clear()
    client.resetStore()
  }

  const showGenreBooks = async (genre) => {
    console.log('SHOW GENRE BOOKS')
    const result = await client.query({
      query: ALL_BOOKS,
      variables: { genre: genre }
    })
    setBooks(result)
    console.log('GENREBOOK RESULT', result)
  }

  const errorNotification = () => errorMessage &&
    <div style={{ color: 'red' }}>
      {errorMessage}
    </div>

  if (!token) {
    return (
      <div>
        <div>
          {errorNotification()}
          <button onClick={() => setPage('authors')}>authors</button>
          <button onClick={() => setPage('books')}>books</button>
          <button onClick={() => setPage('login')}>login</button>
          <h1>Library of Random Collections</h1>
        </div>

        <ApolloConsumer>
          {(client =>
            <Query query={ALL_AUTHORS}>
              {(result) =>
                <Authors show={page === 'authors'} result={result} client={client} />
              }
            </Query>
          )}
        </ApolloConsumer>

        <ApolloConsumer>
          {(client =>
            <Query query={ALL_BOOKS}>
              {(result) =>
                <Books show={page === 'books'} result={result} client={client} />
              }
            </Query>
          )}
        </ApolloConsumer>
        <Genres
          choose={(genre) => showGenreBooks(genre)}
          result={genres} show={page === 'books'} page={page} books={books} />

        <Login
          show={page === 'login'}
          login={login}
          setToken={(token) => setToken(token)}
        />
      </div>
    )

  } else if (token) {
    return (
      <div>
        <div>
          {errorNotification()}
          <button onClick={() => setPage('authors')}>authors</button>
          <button onClick={() => setPage('books')}>books</button>
          <button onClick={() => setPage('add')}>add book</button>
          <button onClick={() => setPage('editAuthor')}>edit author</button>
          <button onClick={() => logout()}>logout</button>
          <h1>Library of Random Collections</h1>
        </div>

        <ApolloConsumer>
          {(client =>
            <Query query={ALL_AUTHORS}>
              {(result) =>
                <Authors show={page === 'authors'} result={result} client={client} />
              }
            </Query>
          )}
        </ApolloConsumer>

        <ApolloConsumer>
          {(client =>
            <Query query={ALL_BOOKS}>
              {(result) =>
                <Books show={page === 'books'} result={result} client={client} />
              }
            </Query>
          )}
        </ApolloConsumer>

        <Mutation
          mutation={CREATE_BOOK}
          refetchQueries={[{ query: ALL_AUTHORS }, { query: ALL_BOOKS }]}
        >
          {(addBook) =>
            <NewBook show={page === 'add'} addBook={addBook} />
          }
        </Mutation>

        <Mutation
          mutation={ADD_BIRTH_YEAR}
          refetchQueries={[{ query: ALL_AUTHORS }]}
        >
          {(editAuthorBorn) =>
            <EditAuthor show={page === 'editAuthor'} editAuthorBorn={editAuthorBorn} />
          }
        </Mutation>
      </div>
    )
  }
}

export default App