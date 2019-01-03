import React from 'react';
import personService from './services/persons'
import Notification from './components/Notification'

class App extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      persons: [],
      newName: '',
      newPhone: '',
      success: null,
      search: ''
    }
    console.log('constructor')
  }

  handleName = (event) => {
      this.setState({ newName: event.target.value })   
  }

  handlePhone = (event) => {
        this.setState({ newPhone: event.target.value })      
  }

  handleDelete = (id) => {
    const person = this.state.persons.find(n => n.id === id)
    return () => {
      console.log('person '+id+' needs to be deleted')

      if (window.confirm("Poistetaanko nimi luettelosta?")) {
        personService
          .del(id)
          .then(persons => {
            this.setState({
            persons: this.state.persons.filter(p => p.id !== id),
            success: `listalta on nyt poistettu ' ${person.name} ' `
          })
          setTimeout(() => {
            this.setState({ success: null })
          }, 5000)
        })
      } 
    }
  }

  handleSearch = (event) => {
    this.setState({search: event.target.value})
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
      personService
        .create(personObject)
        .then(response => {
          console.log(response)
          this.setState({
            persons: this.state.persons.concat(response.data),
            newName: '',
            newPhone: '',
            success: `listalle on nyt lisätty ' ${personObject.name} ' `
          })
          setTimeout(() => {
            this.setState({ success: null })
          }, 5000)
        })
      
        console.log('after post')
        console.log(this.state.persons)
    } else {
      const foundPerson = this.state.persons.find(person => person.name ===this.state.newName)

      console.log ('numeronmuutoksen löytämä id', foundPerson.id)
      if (window.confirm("Nimi löytyy jo, korvataanko numero uudella?")) {

        personService
          .update(foundPerson.id, personObject)
          .then(response => {
            this.setState ({           
              persons: this.state.persons.map(person=> person.id !== foundPerson.id ? person : response.data),
              newName: '',
              newPhone: '',
              success: `Muutettiin numeroa henkilölle ' ${personObject.name} ' `
          })
        })  
        .catch(success => {
          this.setState({
            success: `Tämä luettelotieto '${foundPerson.name}' on jo valitettavasti poistettu palvelimelta`,
            persons: this.state.persons.filter(n => n.id !== foundPerson.id)
        })
        })
        setTimeout(() => {
          this.setState({ success: null })
        }, 5000)
    }
  }
  }

  componentDidMount() {
    console.log('did mount')
    personService
      .getAll()
      .then(response=> {
        console.log('promise fulfilled')
        this.setState({ persons: response })
      })
  }

  render() {
    
    console.log('render')
    console.log(this.state.persons)
    return (
      <div>   
        <h2>Puhelinluettelo</h2>      
        <Notification message={this.state.success}/>  
        <Rajaus rajaus = {this} />
        <Lomake lomake = {this} />
        <h2>Numerot</h2>          
        <Person tyyppi = {this} />  
      </div>
    )
  }
}

const Rajaus = ({rajaus}) => {
  return (
    <div> 
      rajaa näytettäviä:
    <input 
      value = {rajaus.state.search}
      onChange = {rajaus.handleSearch}
    />
    </div> 
  )
  
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
  console.log('personin saama props', props)

  const namesToShow =
  props.tyyppi.state.showAll ?
    props.tyyppi.state.persons :
    props.tyyppi.state.persons.filter(person=> person.name.includes(props.tyyppi.state.search))

  return (
    <ul>
    {namesToShow.map(person => 
      <li key = {person.id}>
      <Name 
      person ={person} 
      del ={props.tyyppi.handleDelete(person.id)}/>
      <Phone person={person}/></li>)} 
    </ul>
  )
}

const Name = ({person, del}) => {
  const label = 'poista'
  return (
  <p><button onClick={del}>{label}</button> {person.name}  </p>
  )
}

const Phone = ({person}) => {
  return person.phone
}

export default App