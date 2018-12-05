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
  //  console.log("lisättäväksi ehdotetaan:", event.target.value)
  //  console.log(this.state.persons)
      this.setState({ newName: event.target.value })
     
  }

  handlePhone = (event) => {
    //  console.log("lisättäväksi ehdotetaan:", event.target.value)
    //  console.log(this.state.persons)
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
        <form onSubmit={this.addPerson}>
          <div>    
            nimi: 
          <input 
            value = {this.state.newName}
            onChange = {this.handleName}
          />
          </div>
          <div>
            numero: 
          <input 
            value = {this.state.newPhone}
            onChange = {this.handlePhone}
          />
          </div>  
          <div>
           <button type="submit">lisää</button>
         </div>
        </form>  

        <h2>Numerot</h2>
        <ul>
          {this.state.persons.map(person => <p key = {person.id}><Name person ={person}/><Phone person={person}/></p>)}  
        </ul>       
      </div>
    )
  }
}


const Name = ({person}) => {

  //console.log(person)
  //console.log(person.name)
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