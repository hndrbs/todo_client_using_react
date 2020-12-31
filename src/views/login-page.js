import { Component } from 'react'
import { Container, Form } from 'react-bootstrap'
import server from '../config/server.js'

class Login extends Component {
  constructor () {
    super ()
    this.state = {
      email: '',
      password: ''
    }
  }
  clearState = _ => {
    this.setState({
      email: '',
      password: ''
    })
  }
  changeState = (e) => {
    const { name, value } = e.target
    if (name === 'email') {
      this.setState({ email: value })
    } else {
      this.setState({ password: value })
    }
  }
  login = async (e) => {
    e.preventDefault()
    try {
      const { data } = await server({
        url: '/login',
        method: 'post',
        data: this.state
      })
      // console.log(data)
      localStorage.setItem('token', data.token)
      localStorage.setItem('user', data.userName)
    } catch (err) {
      console.log(err.response.data)
    }
  }
  render () {
    return (
      <Container fluid className="d-flex flex-column justify-content-center h-100 text-center">
        <Container className="mx-auto w-75">
          <Form onSubmit={ this.login }>
            <span className="h4 mx-auto">
              Welcome to Todo App <br/> Please login here
            </span>
            <Form.Group>
              <Form.Label> Email Address </Form.Label>
              <Form.Control
                type="email" placeholder="Enter your email here" 
                name="email"
                onChange={ this.changeState }
              />
            </Form.Group>

            <Form.Group>
              <Form.Label> Password </Form.Label>
              <Form.Control 
                type="password" placeholder="Enter your email here"
                name="password"
                onChange={ this.changeState }
              />
            </Form.Group>
            <Form.Control  
              type="submit" 
              className="btn btn-success"
              value="Login" 
            />
          </Form>
        </Container>
      </Container>
    )
  }
}

export default Login
