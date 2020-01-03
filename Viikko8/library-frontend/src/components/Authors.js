import React from 'react'
//import React, { useState } from 'react'
//import { useApolloClient } from '@apollo/react-hooks'
//import { gql } from 'apollo-boost'

const Authors = ({ show, result, client }) => {
  if (!show || result === null) {
    return null
  } else if (result.loading) {
    return <div>loading...</div>
  }

  const authors = result.data.allAuthors
  console.log('AUTHORS', authors)
  return (
    <div>
      <h2>authors</h2>
      <table>
        <tbody>
          <tr>
            <th></th>
            <th>
              born
            </th>
            <th>
              books
            </th>
          </tr>
          {authors.map(a =>
            <tr key={a.authorName}>
              <td>{a.authorName}</td>
              <td>{a.born}</td>
              <td>{a.bookCount}</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  )
}

export default Authors