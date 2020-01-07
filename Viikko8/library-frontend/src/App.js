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

  const recommend = async () => {
    const result = await client.query({
      query: queries.ME
    })
    setGenre(result.data.me.favoriteGenre)
    setPage('recommendations')
  }

  const errorNotification = () => errorMessage &&
    <div style={{ color: 'red' }}>
      {errorMessage}
    </div>

  return (
    <div>

      <div>
        {errorNotification()}
        <button onClick={() => setPage('authors')}>authors</button>
        <button onClick={() => setPage('books')}>books</button>
        {!token && <button onClick={() => setPage('login')}>login</button>}
        {token && <button onClick={() => setPage('add')}>add book</button>}
        {token && <button onClick={() => setPage('editAuthor')}>edit author</button>}
        {token && <button onClick={() => recommend()}>recommendations</button>}
        {token && <button onClick={() => logout()}>logout</button>}
      </div>
      
      <h1>Library of Random Collections</h1>

      <ApolloConsumer>
        {(client =>
          <Query query={queries.ALL_AUTHORS}>
            {(result) =>
              <Authors show={page === 'authors'} result={result} client={client} />
            }
          </Query>
        )}
      </ApolloConsumer>

      <Books show={page === 'books'} result={books} genre={genre} criteria=' the genre' />

      <Genres
        choose={(genre) => showGenreBooks(genre)}
        result={genres} show={page === 'books'} page={page} books={books} />

      {!token &&
        <Login
          show={page === 'login'}
          login={login}
          setToken={(token) => setToken(token)} />
      }

      {token &&
        <div>
          <Books show={page === 'recommendations'} result={books} genre={genre} criteria=' your favorite genre' />

          <Mutation
            mutation={mutations.CREATE_BOOK}
            refetchQueries={[
              { query: queries.ALL_AUTHORS },
              { query: queries.ALL_BOOKS },
              { query: queries.GENRES }]} >
            {(addBook) =>
              <NewBook show={page === 'add'} addBook={addBook} />
            }
          </Mutation>

          <Mutation
            mutation={mutations.ADD_BIRTH_YEAR} refetchQueries={[{ query: queries.ALL_AUTHORS }]} >
            {(editAuthorBorn) =>
              <EditAuthor show={page === 'editAuthor'} editAuthorBorn={editAuthorBorn} />
            }
          </Mutation>
        </div>}

    </div>
  )

}

export default App