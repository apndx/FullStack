import React from 'react'
//import Books from './Books'

const Genres = ({ page, result, choose, show, books }) => {

  if (!show || result === null) {
    return null
  } else if (result.loading) {
    return <div>loading...</div>
  }

  const genres = result.data
  console.log('GENRES', genres)

  return (
    <div>
      <h2>genres</h2>
      {result.data.allGenres.map(genre =>
        <div key={genre}>
          <button onClick={() => choose(genre)} >
            {genre}
          </button>
          {/* <Books show={page === 'books'} books ={books}  /> */}
        </div>
      )}
    </div>
  )
}

export default Genres
