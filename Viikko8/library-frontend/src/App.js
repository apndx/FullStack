import React, { useState } from 'react'
import Login from './components/Login'
import Authors from './components/Authors'
import Books from './components/Books'
import NewBook from './components/NewBook'
import EditAuthor from './components/EditAuthor'
import { gql } from 'apollo-boost'
import { Query, ApolloConsumer, Mutation } from 'react-apollo'
import { useMutation, useApolloClient } from '@apollo/react-hooks'

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
{
  allBooks {
    title,
    published,
    author {
      authorName,
      born,
      bookCount
    }
  }
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
  const client = useApolloClient()

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