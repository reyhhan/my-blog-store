import React from 'react'
import { connect } from 'react-redux'
import { login } from '../reducer/userReducer'
import { setNotification } from '../reducer/notificationReducer'
import { Button, Form } from 'react-bootstrap'

const LoginForm = (props) => {

  const handleSubmit = (event) => {
    event.preventDefault()
    const username= event.target.Username.value
    const password = event.target.Password.value
    event.target.Username.value = ''
    event.target.Password.value = ''
    props.login(username, password,props)

  }

  return(
    <div>
      <h4>Login</h4>
      <Form onSubmit= {handleSubmit}>
        <Form.Group>
          <Form.Label></Form.Label>
          <Form.Control
            type="text"
            id='username'
            name="Username"
            placeholder="Username"
          />
          <Form.Label></Form.Label>
          <Form.Control
            type="password"
            id='password'
            name="Password"
            placeholder="Password"
          />
        </Form.Group>
        <Button id='login-button' type="submit">login</Button>
      </Form>
    </div>
  )

}

const mapDispatchToProps = {
  login,
  setNotification
}

export default connect(
  null,
  mapDispatchToProps
)(LoginForm)