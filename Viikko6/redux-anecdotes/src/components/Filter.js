import React from 'react'
import { connect } from 'react-redux'
import { changeFilter} from '../reducers/filterReducer'

const Filter = (props) => {
  const handleChange = (event) => {
    // input-kentän arvo muuttujassa event.target.value
    props.changeFilter(event.target.value)        
    
  }
  const style = {
    marginBottom: 10
  }

  return (
    <div style={style}>
      filter <input onChange={handleChange} />
    </div>
  )
}

const mapStateToProps = (state) => {
    return {
        anecdotes: state.anecdotes,
        filter: state.filter
    }
}

const mapDispatchToProps = {
    changeFilter
}

const ConnectedFilter = connect(
    mapStateToProps,
    mapDispatchToProps
    )(Filter)

export default ConnectedFilter