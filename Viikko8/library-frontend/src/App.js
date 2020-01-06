import React, { useState } from 'react'
import Login from './components/Login'
import Authors from './components/Authors'
import Books from './components/Books'
import NewBook from './components/NewBook'
import EditAuthor from './components/EditAuthor'
import Genres from './components/Genres'
import { Query, ApolloConsumer, Mutation } from 'react-apollo'
import { useQuery, useMutation, useApolloClient } from '@apollo/react-hooks'
import queries from './graphql/queries'
import mutations from './graphql/mutations'

const App = () => {
  const [page, setPage] = useState('books')
  const [errorMessage, setErrorMessage] = useState(null)
  const [token, setToken] = useState(null)
  const [genre, setGenre] = useState(null)
  const client = useApolloClient()
  const genres = useQuery(queries.GENRES)

  const handleError = (error) => {
    setErrorMessage(error.graphQLErrors[0].message)
    setTimeout(() => {
      setErrorMessage(null)
    }, 10000)
  }

  const [login] = useMutation(mutations.LOGIN, {
    onError: handleError
  })

  const books = useQuery(queries.ALL_BOOKS, {
    variables: { genre }
  })

  const logout = () => {
    setToken(null)
    localStorage.clear()
    client.resetStore()
  }

  const showGenreBooks = (genre) => {
    setGenre(genre)
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
            <Query query={queries.ALL_AUTHORS}>
              {(result) =>
                <Authors show={page === 'authors'} result={result} client={client} />
              }
            </Query>
          )}
        </ApolloConsumer>

        <Books show={page === 'books'} result={books} genre={genre} />

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
            <Query query={queries.ALL_AUTHORS}>
              {(result) =>
                <Authors show={page === 'authors'} result={result} client={client} />
              }
            </Query>
          )}
        </ApolloConsumer>

        <Books show={page === 'books'} result={books} genre={genre} />

        <Genres
          choose={(genre) => showGenreBooks(genre)}
          result={genres} show={page === 'books'} page={page} books={books} />

        <Mutation
          mutation={mutations.CREATE_BOOK}
          refetchQueries={[{ query: queries.ALL_AUTHORS }, { query: queries.ALL_BOOKS }]}
        >
          {(addBook) =>
            <NewBook show={page === 'add'} addBook={addBook} />
          }
        </Mutation>

        <Mutation
          mutation={mutations.ADD_BIRTH_YEAR}
          refetchQueries={[{ query: queries.ALL_AUTHORS }]}
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