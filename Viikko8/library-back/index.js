const { ApolloServer, gql } = require('apollo-server')
const uuid = require('uuid/v1')
const mongoose = require('mongoose')
const Author = require('./models/author')
const Book = require('./models/book')
const config = require('./utils/config')

mongoose.set('useFindAndModify', false)
console.log('connecting to', config.mongoUrl)

mongoose.connect(config.mongoUrl, { useNewUrlParser: true })
  .then(() => {
    console.log('connected to MongoDB')
  })
  .catch((error) => {
    console.log('error connection to MongoDB:', error.message)
  })

const typeDefs = gql`
  type Book {
    title: String!
    author: Author!
    published: Int!
    genres: [String!]!
    id: ID!
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
    allBooks(authorName: String, genre: String): [Book]
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
    bookCount: () => Books.collection.countDocuments(),
    authorCount: () => Author.collections.countDocuments(),
    allBooks: (root, args) => {
      //if (args.authorName) {
      //  return Books.findOne({ authorName: args.authorName }),    
      //} else if (args.genre) {
      //  return books.filter(book => book.genres.includes(args.genre))
      //} else {
      return Book.find({})
      //}
    },
    findAuthor: (root, args) =>
      Author.findOne({ name: args.name }),
    allAuthors: () => {
      return Author.find({})
    }
  },
  Mutation: {
    addBook: async (root, args) => {

      const existingAuthor = await Author.findOne({ authorName: args.authorName })
      console.log('ADD BOOK EXISTING AUTH', existingAuthor)
    
      if (existingAuthor) {
        existingAuthor.bookCount = existingAuthor.bookCount + 1
        console.log('NYT ON EXISTING AUTH', existingAuthor)
        const book = new Book({ ...args, author: existingAuthor })
        try {
          await book.save()
        }
        catch (error) {
          throw new UserInputError(error.message, {
            invalidArgs: args,
          })
        }
        console.log('ADD BOOKING BOOK', book)
        return book
      } else {
        const author = new Author({ authorName: args.authorName, bookCount: 1 })
        console.log('ADD BOOKING NEW AUTH', author)
        try {
          await author.save()
        }
        catch (error) {
          throw new UserInputError(error.message, {
            invalidArgs: args,
          })
        }
        const book = new Book({ ...args, author: author })
        try {
          await book.save()
        }
        catch (error) {
          throw new UserInputError(error.message, {
            invalidArgs: args,
          })
        }
        return book
      }

    },
    addAuthor: (root, args) => {
      const author = new Author({ ...args, bookCount: 0 })
      console.log('ADD AUTHOR', author)
      //try {
      //  await author.save()
      // } catch (error) {
      //   throw new UserInputError(error.message, {
      //     invalidArgs: args,
      //   })
      // }
      return author.save()
    },
    addToAuthorBookCount: (root, args) => {
      const author = authors.find(author => author.authorName === args.authorName)
      const authorHasOneMoreBook = { ...author, bookCount: author.bookCount + 1 }
      return authorHasOneMoreBook
    },
    editAuthorBorn: (root, args) => {
      const author = authors.find(author => author.authorName === args.authorName)
      const authorWithBorn = { ...author, born: args.born }
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
