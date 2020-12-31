import { Component } from 'react'
import { Container, Form } from 'react-bootstrap'
import server from '../config/server.js'

class Register extends Component {
  constructor (props) {
    super(props)
    this.state = {
      fullName: '',
      userName: '',
      email: '',
      password: ''
    }
  }
  changeState = (e) => {
    // console.log(e.target.name)
    const { name, value } = e.target
    switch (name) {
      case 'fullName':
        this.setState({ fullName: value })
        break;
      case 'userName':
        this.setState({ userName: value })
        break;
      case 'email':
        this.setState({ email: value })
        break;
      case 'password':
        this.setState({ password: value })
        break;
      default:
        break;
    }
  }
  register = async e => {
    e.preventDefault()
    try {
      await server({
        url:'/register',
        method: 'post',
        data: this.state
      })
      console.log('oke')
      this.setState({
        fullName: '',
        userName: '',
        email: '',
        password: ''
      })
    } catch (err) {
      console.log(err.response.data.errors)
    }
  }
  render () {
    return (
      <Container fluid className="d-flex flex-column justify-content-center h-100 text-center">
        <Container className="w-75 mx-auto">
          <Form onSubmit={ this.register }>
            <span className="h4">
              Register Here
            </span>
            <Form.Group>
              <Form.Label> Full Name </Form.Label>
              <Form.Control
                name="fullName"
                type="text" 
                placeholder="Enter your full name here"
                onChange={this.changeState}
              />
            </Form.Group>

            <Form.Group>
              <Form.Label> User Name </Form.Label>
              <Form.Control 
                name="userName"
                type="text" 
                placeholder="Enter your user name here"
                onChange={this.changeState}
              />
            </Form.Group>

            <Form.Group>
              <Form.Label> Email Address </Form.Label>
              <Form.Control
                name="email"
                type="email"
                placeholder="Enter your email here"
                onChange={this.changeState}
              />
            </Form.Group>

            <Form.Group>
              <Form.Label> Password </Form.Label>
              <Form.Control
                name="password"
                type="password"
                placeholder="Enter your email here"
                onChange={this.changeState}
              />
            </Form.Group>
            <Form.Control
              type="submit"
              className="btn btn-success"
              value="Register"
            />
          </Form>
        </Container>
      </Container>
    )
  }
}

export default Register
