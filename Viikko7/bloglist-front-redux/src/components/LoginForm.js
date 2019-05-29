import React, { useState, useEffect } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { login, initLoggedUser } from '../reducers/actioncreators/loginActions'
import { Form, Button } from 'react-bootstrap'
import  { useField } from '../hooks'

const LoginForm = (props) => {

  const username = useField('text')
  const password = useField('password')
  const [loginVisible, setLoginVisible] = useState(false)
  const hideWhenVisible = { display: loginVisible ? 'none' : '' }
  const showWhenVisible = { display: loginVisible ? '' : 'none' }

  useEffect(() => {
    props.initLoggedUser()
  }, [])

  const handleLogin = async (event) => {
    event.preventDefault()
    try {
      props.login(username.value, password.value)
    } catch (exception) {
      props.changeNotification('wrong username or password', 5)
    }
  }

  return (

    <div>
      <div style={hideWhenVisible}>
        <Button variant="outline-info" onClick={() => setLoginVisible(true)}>log in</Button>
      </div>
      <div style={showWhenVisible}>
        <Form onSubmit={handleLogin}>
          <Form.Group>
            <Form.Label>username:</Form.Label>
            <Form.Control {...username} />
            <br/>
            <Form.Label>password:</Form.Label>
            <Form.Control {...password} />
            <Button variant="outline-info" type = "submit">login</Button>
          </Form.Group>
        </Form>
        <Button variant="outline-info" onClick={() => setLoginVisible(false)}>cancel</Button>
      </div>
    </div>
  )
}

LoginForm.propTypes = {
  handleLogin: PropTypes.func.isRequired,
}

const mapStateToProps = () => {
}

const mapDispatchToProps = {
  login,
  initLoggedUser
}

const ConnectedLoginForm= connect(
  mapStateToProps,
  mapDispatchToProps
)(LoginForm)

export default ConnectedLoginForm