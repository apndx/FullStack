import React from 'react'

const Genres = ({ result, choose, show }) => {

  if (!show || result === null) {
    return null
  } else if (result.loading) {
    return <div>loading...</div>
  }

  return (
    <div>
      <h2>genres</h2>
      <div key={'all'}>
          <button onClick={() => choose(null)} >
            all
          </button>
        </div>
      {result.data.allGenres.map(genre =>
        <div key={genre}>
          <button onClick={() => choose(genre)} >
            {genre}
          </button>
        </div>
      )}
    </div>
  )
}

export default Genres
