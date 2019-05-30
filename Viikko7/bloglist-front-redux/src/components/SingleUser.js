import React, { useEffect } from 'react'
import { initializeSingleUser } from '../reducers/userReducer'
import { connect } from 'react-redux'



const SingleUser = ( props ) => {
  const { singleUser } = props

  useEffect(() => {
    initializeSingleUser()
  }, [])

  if ( props.user === undefined) {
    return null
  }

  return (
    <div>
      <h2>{singleUser.name}</h2>
      <h3>Added blogs</h3>
      {singleUser.blogs.map(blog =>
        <tr key={blog.id}>
          <td>{blog.name} </td>
        </tr>
      )}
    </div>
  )
}

const mapStateToProps = (state) => {
  return {
    singleUser: state.user.singleUser
  }
}

const mapDispatchToProps = {
  initializeSingleUser
}

const ConnectedSingleUser = connect(
  mapStateToProps,
  mapDispatchToProps
)(SingleUser)


export default ConnectedSingleUser
