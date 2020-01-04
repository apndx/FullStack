const { ApolloServer, gql, UserInputError } = require('apollo-server')
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
      if (args.authorName) {
        return Books.collections.find({ authorName: args.authorName })
      } else if (args.genre) {
        return Books.collections.find({ genre: args.genre })
      } else {
        return Book.find({})
      }
    },
    findAuthor: (root, args) =>
      Author.findOne({ authorName: args.authorName }),
    allAuthors: () => {
      return Author.find({})
    }
  },
  Mutation: {
    addBook: async (root, args) => {

      if (args.title.length < 3 || args.authorName.length < 3) {
        throw new UserInputError('Title or author name is too short', {
          invalidArgs: args,
        })
      }

      const existingBook = await Book.find({ title: args.title})

      if (existingBook) {
        throw new UserInputError('A book with this title has already been added', {
          invalidArgs: args,
        })
      }

      const existingAuthor = await Author.findOne({ authorName: args.authorName })

      if (existingAuthor) {
        existingAuthor.bookCount = existingAuthor.bookCount + 1
        try {
          await existingAuthor.save()
        } catch (error) {
          throw new UserInputError(error.message, {
            invalidArgs: args,
          })
        }
        const book = new Book({ ...args, author: existingAuthor })
        try {
          await book.save()
        }
        catch (error) {
          throw new UserInputError(error.message, {
            invalidArgs: args,
          })
        }
        return book
      } else {
        const author = new Author({ authorName: args.authorName, bookCount: 1 })
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
    addAuthor: async (root, args) => {
      const author = new Author({ ...args, bookCount: 0 })
      try {
        await author.save()
      } catch (error) {
        throw new UserInputError(error.message, {
          invalidArgs: args,
        })
      }
      return author
    },
    addToAuthorBookCount: async (root, args) => {
      const authorHasOneMoreBook = await Author.findOne({ authorName: args.authorName })
      try {
        authorHasOneMoreBook.bookCount = authorHasOneMoreBook.bookCount + 1
        await authorHasOneMoreBook.save()
      } catch (error) {
        throw new UserInputError(error.message, {
          invalidArgs: args,
        })
      }
      return authorHasOneMoreBook
    },
    editAuthorBorn: async (root, args) => {
      const editedAuthor = await Author.findOne({ authorName: args.authorName })
      try {
        editedAuthor.born = args.born
        await editedAuthor.save()
      } catch (error) {
        throw new UserInputError(error.message, {
          invalidArgs: args,
        })
      }
      return editedAuthor
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
