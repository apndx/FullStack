import React from 'react';
import axios from 'axios'

class App extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      persons: [],
      newName: '',
      newPhone: '' // täällä jotain
    }
    console.log('constructor')
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
      
      name: this.state.newName, 
      phone: this.state.newPhone,

    }

    const personNames = this.state.persons.map(person=> person.name)
   
      if (!personNames.includes(this.state.newName)) {
     
      console.log('before post')
      console.log(this.state.persons)
  
      axios
        .post('http://localhost:3001/persons', personObject)
        .then(response => {
          console.log(response)
          this.setState({
            persons: this.state.persons.concat(response.data),
            newName: '',
            newPhone: ''
          })
        })
      
        console.log('after post')
        console.log(this.state.persons)
    }

  }

  componentDidMount() {
    console.log('did mount')
    axios
      .get('http://localhost:3001/persons')
      .then(response => {
        console.log('promise fulfilled')
        this.setState({ persons: response.data })
      })
  }

  render() {
    // keyn kanssa nyt jotain häipäkkää  
    console.log('render')
    console.log(this.state.persons)
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
  //console.log('lomakkeen saama props', lomake)
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

const Person = (props) => {
  //console.log('personin saama props', tyyppi)
  return (
    <ul>
    {props.tyyppi.map(person => <li key = {person.id}><Name person ={person}/> – <Phone person={person}/></li>)} 
    </ul>
  )
}

const Name = ({person}) => {
  return person.name
}

const Phone = ({person}) => {
  return person.phone
}

export default App