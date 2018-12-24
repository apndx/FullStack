import React from 'react';
import countryService from './services/countries'
import Notification from './components/Notification'

class App extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      countries: [],
      newName: '',
      success: null,
      search: ''
    }
    console.log('constructor')
  }

  handleSearch = (event) => {
    this.setState({search: event.target.value})
  }

  componentDidMount() {
    console.log('did mount')
    countryService
      .getAll()
      .then(response=> {
        console.log('promise fulfilled')
        this.setState({ countries: response })
      })
  }

  render() {
    
    console.log('render')
    console.log(this.state.countries)
    return (
      <div>   
        <h2>Countries</h2>      
        <Notification message={this.state.success}/>  
        <Rajaus rajaus = {this} />      
        <Country maa = {this} />  
      </div>
    )
  }
}

const Rajaus = ({rajaus}) => {
  return (
    <div> 
      find countries:
    <input 
      value = {rajaus.state.search}
      onChange = {rajaus.handleSearch}
    />
    </div> 
  )
  
}


const Country = (props) => {
  console.log('countryn saama props', props)

  const namesToShow =
  props.maa.state.showAll ?
    '' :
    props.maa.state.countries.filter(country=> country.name.includes(props.maa.state.search))

  return (
    <ul>
    {namesToShow.map(country => 
      <li key = {country.id}>
      <Name country ={country} 
       />
      </li>)} 
    </ul>
  )
}

const Name = ({country}) => {
  return (
  <p>{country.name}  </p>
  )
}


export default App