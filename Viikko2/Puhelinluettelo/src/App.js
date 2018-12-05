import React from 'react';

class App extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      persons: props.persons,
      newName: ''
    }
  }

  addPerson = (event) => {
    event.preventDefault()
    const personObject = {

      name: this.state.newName,
      id: this.state.persons.length + 1
    }
    const personNames = this.state.persons.map(person=> person.name)
   

      if (!personNames.includes(this.state.newName)) {
      const persons = this.state.persons.concat(personObject)
  
      this.setState({
        persons,
        newName: ''
    })
    } 
  
  }

  handlePersonChange = (event) => {
  //  console.log("lisättäväksi ehdotetaan:", event.target.value)
  //  console.log(this.state.persons)
      this.setState({ newName: event.target.value })
     
  }

  render() {
    return (
      <div>
        <h2>Puhelinluettelo</h2>
        <form onSubmit={this.addPerson}>     
            nimi: 
          <input 
            value = {this.state.newName}
            onChange = {this.handlePersonChange}
          />
         <button type="submit">lisää</button>
        </form>
        <h2>Numerot</h2>
        <ul>
          {this.state.persons.map(person => <Person key={person.id} person={person} />)}
        </ul>       
      </div>
    )
  }
}


const Person = ({ person}) => {

  //console.log(person)
  //console.log(person.name)
  return (
    <li> {person.name}</li>
  )
}

export default App