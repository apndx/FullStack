import React from 'react'
import AnecForm from './components/AnecForm'
import Anecdote from './components/Anecdote'

class App extends React.Component {
  render() {
    return (
      <div>
        <AnecForm />
        <Anecdote />
      </div>
    )
  }
}

export default App