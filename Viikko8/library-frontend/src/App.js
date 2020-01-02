import React, { useState } from 'react'
import Authors from './components/Authors'
import Books from './components/Books'
import NewBook from './components/NewBook'
import { gql } from 'apollo-boost'
import { Query, ApolloConsumer, Mutation } from 'react-apollo'

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
    authorName,
    published
  }
}
`
const CREATE_BOOK= gql`
mutation createBook($title: String!, $authorName: String!, $published: Int!, $genres: [String!]!) {
  addBook(
    title: $title,
    authorName: $authorName,
    published: $published,
    genres: $genres
  ) {
    title
    published
    authorName
  }
}
`

const App = () => {
  const [page, setPage] = useState('authors')

  return (
    <div>
      <div>
        <button onClick={() => setPage('authors')}>authors</button>
        <button onClick={() => setPage('books')}>books</button>
        <button onClick={() => setPage('add')}>add book</button>
      </div>

      <ApolloConsumer>
        {(client =>
          <Query query = {ALL_AUTHORS}>
            {(result) => 
                <Authors show={page === 'authors'} result={result} client ={client} />
           }
          </Query>
          )}
      </ApolloConsumer>
     
      <ApolloConsumer>
        {(client =>
          <Query query = {ALL_BOOKS}>
            {(result) => 
                <Books show={page === 'books'} result={result} client ={client} />
           }
          </Query>
          )}
      </ApolloConsumer>

      <Mutation 
      mutation={CREATE_BOOK}
      refetchQueries={[{ query: ALL_AUTHORS }, {query: ALL_BOOKS }]}  
      > 
      
      {(addBook) =>
        <NewBook show={page === 'add'} addBook={addBook} />
      }
      </Mutation>     
    </div>
  )
}

export default App