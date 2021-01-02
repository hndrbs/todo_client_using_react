import { Component } from 'react'
import { Container, Form } from 'react-bootstrap'
import server from '../config/server.js'
import { Redirect } from 'react-router-dom'

class Login extends Component {
  constructor () {
    super ()
    this.state = {
      email: '',
      password: '',
      push: ''
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
  toRegister = () => {
    this.setState({ push: '/register' })
  }
  login = async (e) => {
    e.preventDefault()
    try {
      const { email, password } = this.state
      const { data } = await server({
        url: '/login',
        method: 'post',
        data: { email, password }
      })
      // console.log(data)
      this.setState(() => {
        localStorage.setItem('token', data.token)
        localStorage.setItem('user', data.userName)
        return { push: '/' }
      })
    } catch (err) {
      console.log(err.response.data)
    }
  }
  render () {
    if (this.state.push) {
      return <Redirect to={this.state.push} /> 
    }
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
        <Container className="mt-3">
          <span className="h5">Do not have an account yet?</span>
          <span className="h5"> create one 
            <a
            href="#"
            onClick={this.toRegister}
            className="badge badge-success mx-2"
            >here</a>
          </span>
        </Container>
      </Container>
    )
  }
}

export default Login
