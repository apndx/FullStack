import React, { useState } from 'react'
import Authors from './components/Authors'
import Books from './components/Books'
import NewBook from './components/NewBook'
import EditAuthor from './components/EditAuthor'
import { gql } from 'apollo-boost'
import { Query, ApolloConsumer, Mutation } from 'react-apollo'

const ALL_AUTHORS = gql`
{
  allAuthors {
    authorName
    born,
    bookCount
  }
}
`
const ALL_BOOKS = gql`
{
  allBooks {
    title,
    published
    author {
      authorName
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

const App = () => {
  const [page, setPage] = useState('add')

  return (
    <div>
      <div>
        <button onClick={() => setPage('authors')}>authors</button>
        <button onClick={() => setPage('books')}>books</button>
        <button onClick={() => setPage('add')}>add book</button>
        <button onClick={() => setPage('editAuthor')}>edit author</button>
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

export default App