const { ApolloServer, gql } = require('apollo-server')
const uuid = require('uuid/v1')

let authors = [
  {
    authorName: 'Robert Martin',
    id: "afa51ab0-344d-11e9-a414-719c6709cf3e",
    born: 1952,
    bookCount: 2
  },
  {
    authorName: 'Martin Fowler',
    id: "afa5b6f0-344d-11e9-a414-719c6709cf3e",
    born: 1963,
    bookCount: 1
  },
  {
    authorName: 'Fyodor Dostoevsky',
    id: "afa5b6f1-344d-11e9-a414-719c6709cf3e",
    born: 1821,
    bookCount: 2
  },
  { 
    authorName: 'Joshua Kerievsky', // birthyear not known
    id: "afa5b6f2-344d-11e9-a414-719c6709cf3e",
    bookCount: 1
  },
  { 
    authorName: 'Sandi Metz', // birthyear not known
    id: "afa5b6f3-344d-11e9-a414-719c6709cf3e",
    bookCount: 1
  },
]

/*
 * It would be more sensible to assosiate book and the author by saving 
 * the author id instead of the name to the book.
 * For simplicity we however save the author name.
*/

let books = [
  {
    title: 'Clean Code',
    published: 2008,
    authorName: 'Robert Martin',
    id: "afa5b6f4-344d-11e9-a414-719c6709cf3e",
    genres: ['refactoring']
  },
  {
    title: 'Agile software development',
    published: 2002,
    authorName: 'Robert Martin',
    id: "afa5b6f5-344d-11e9-a414-719c6709cf3e",
    genres: ['agile', 'patterns', 'design']
  },
  {
    title: 'Refactoring, edition 2',
    published: 2018,
    authorName: 'Martin Fowler',
    id: "afa5de00-344d-11e9-a414-719c6709cf3e",
    genres: ['refactoring']
  },
  {
    title: 'Refactoring to patterns',
    published: 2008,
    authorName: 'Joshua Kerievsky',
    id: "afa5de01-344d-11e9-a414-719c6709cf3e",
    genres: ['refactoring', 'patterns']
  },  
  {
    title: 'Practical Object-Oriented Design, An Agile Primer Using Ruby',
    published: 2012,
    authorName: 'Sandi Metz',
    id: "afa5de02-344d-11e9-a414-719c6709cf3e",
    genres: ['refactoring', 'design']
  },
  {
    title: 'Crime and punishment',
    published: 1866,
    authorName: 'Fyodor Dostoevsky',
    id: "afa5de03-344d-11e9-a414-719c6709cf3e",
    genres: ['classic', 'crime']
  },
  {
    title: 'The Demon',
    published: 1872,
    authorName: 'Fyodor Dostoevsky',
    id: "afa5de04-344d-11e9-a414-719c6709cf3e",
    genres: ['classic', 'revolution']
  },
]

const typeDefs = gql`
  type Book {
    title: String!
    authorName: String!
    published: String!
    genres: [String!]!
  }

  type Author {
    authorName: String
    id: ID
    born: Int
    bookCount: Int
  }

  type Query {
    bookCount: Int!
    authorCount: Int!
    allBooks(author: String, genre: String): [Book]
    findAuthor(authorName: String!): Author
    allAuthors: [Author!]!
  }

  type Mutation {
    addAuthor(
      authorName: String!
      born: Int
      bookCount: Int
    ): Author,
    addToAuthorBookCount(
      authorName: String!
      bookCount: Int
      ): Author,
    editAuthorBorn(
      authorName: String
      born: Int
    ): Author, 
    addBook(
      title: String!
      authorName: String!
      published: Int!
      genres: [String!]!
    ): Book
  }
`

const resolvers = {
  Query: {
    bookCount: () => books.length,
    authorCount: () => authors.length,
    allBooks: (root, args) => {
      if (args.author) {
        return books.filter(book => book.authorName === args.authorName)      
      } else if (args.genre) {
        return books.filter(book => book.genres.includes(args.genre))
      } else {
        return books
      }
    },  
    findAuthor: (root, args) =>
      authors.find(author => author.authorName === args.authorName),
    allAuthors: () => authors
  },
  Mutation: {
    addBook: (root, args) => {
      const book = { ...args, id: uuid() }
      books = books.concat(book)
      const existingAuthor = authors.find(a => a.authorName === args.authorName)
      if (existingAuthor) {
        const authorHasOneMoreBook = {...existingAuthor, bookCount: existingAuthor.bookCount+1 }
        authors = authors.map(author => author.authorName !== existingAuthor.authorName ? author : authorHasOneMoreBook)
        return book
      } else {
        const author = { ...args, id: uuid(), bookCount: 1 }
        authors = authors.concat(author)
        return book
      }  
    },
    addAuthor: (root, args) => {
      const author = { ...args, id: uuid(), bookCount: 0 }
      authors = authors.concat(author)
      return author
    },
    addToAuthorBookCount: (root, args) => {
      const author = authors.find(author => author.authorName === args.authorName)
      const authorHasOneMoreBook = {...author, bookCount: author.bookCount+1 }
      return authorHasOneMoreBook
    },
    editAuthorBorn: (root, args) => {
      const author = authors.find(author => author.authorName === args.authorName)
      const authorWithBorn = {...author, born: args.born }
      if (author) {
        authors = authors.map(a => a.authorName === args.authorName ? authorWithBorn : a)
        return authorWithBorn
      } 
      return null
    }
  }
}

const server = new ApolloServer({
  typeDefs,
  resolvers,
})

server.listen().then(({ url }) => {
  console.log(`Server ready at ${url}`)
})
