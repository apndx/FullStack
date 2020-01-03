import React, { useState } from 'react'

const EditAuthor = (props) => {
  const [authorName, setAuthorName] = useState('')
  const [born, setBorn] = useState('')

  if (!props.show) {
    return null
  }

  const submit = async (e) => {
    e.preventDefault()

    await props.editAuthorBorn({
      variables: { authorName, born }
    })

    setAuthorName('')
    setBorn('')

  }

  return (
    <div>
      <h2>add birth year to author </h2>
      <form onSubmit={submit}>
        <div>
          author name
          <input
            value={authorName}
            onChange={({ target }) => setAuthorName(target.value)}
          />
        </div>
        <div>
          born
            <input
            type='number'
            value={born}
            onChange={({ target }) => setBorn(parseInt(target.value))}
          />
        </div>
        <button type='submit'>add the birthyear </button>
      </form>

    </div>
  )
}

export default EditAuthor