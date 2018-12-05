import React from 'react';

class App extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      persons: props.persons,
      newName: '',
      newPhone: ''
    }
  }

  addName = (event) => {
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
        newName: '',
        newPhone: ''
    })
    } 
  
  }

  handleName = (event) => {
      this.setState({ newName: event.target.value })   
  }

  handlePhone = (event) => {
        this.setState({ newPhone: event.target.value })      
  }

  addPerson = (event) => {
    event.preventDefault()
    const personObject = {
      
      id: this.state.persons.length + 1,
      name: this.state.newName, 
      phone: this.state.newPhone
    }

    const personNames = this.state.persons.map(person=> person.name)
   
      if (!personNames.includes(this.state.newName)) {
      const persons = this.state.persons.concat(personObject)
      this.setState({
        persons,
        newName: '',
        newPhone: ''
    })
    }  
  }

  render() {
    return (
      <div>
        <h2>Puhelinluettelo</h2>
            <Lomake lomake = {this} />
        <h2>Numerot</h2>
            <Person tyyppi = {this.state.persons}/>      
      </div>
    )
  }
}

const Lomake = ({lomake}) => {
  console.log('lomakkeen saama props', lomake)
  return (
    <form onSubmit={lomake.addPerson}>
    <div>    
      nimi: 
    <input 
      value = {lomake.state.newName}
      onChange = {lomake.handleName}
    />
    </div>
    <div>
      numero: 
    <input 
      value = {lomake.state.newPhone}
      onChange = {lomake.handlePhone}
    />
    </div>  
    <div>
     <button type="submit">lisää</button>
   </div>
  </form> 
  )
}

const Person = (tyyppi) => {
  console.log('personin saama props', tyyppi)
  return (
    <ul>
    {tyyppi.tyyppi.map(person => <p key = {person.id}><Name person ={person}/><Phone person={person}/></p>)} 
    </ul>
  )
}

const Name = ({person}) => {
  return (
    <li> {person.name}</li>
  )
}

const Phone = ({ person}) => {
  return (
    <li>{person.phone}</li>
  )
}

export default App