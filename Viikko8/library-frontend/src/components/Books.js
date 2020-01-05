import React from 'react'

const Books = ({ show, result, client }) => {
  if (!show || result === null) {
    return null
  } else if (result.loading) {
    return <div>loading...</div>
  }

  const books = result.data.allBooks
  console.log('BOOKS', books)
  return (
    <div>
      <h2>books</h2>

      <table>
        <tbody>
          <tr>
            <th></th>
            <th>
              author
            </th>
            <th>
              published
            </th>
          </tr>
          {books.map(a =>
            <tr key={a.title}>
              <td>{a.title}</td>
              <td>{a.author.authorName}</td>
              <td>{a.published}</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  )
}

export default Books