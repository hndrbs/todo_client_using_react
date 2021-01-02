import { Component } from 'react'
import  { Navbar, Button } from 'react-bootstrap'
import { Redirect } from 'react-router-dom'
class Topbar extends Component {
  constructor () {
    super()
    this.state = {
      isTokenExist: true
    }
  }
  componentDidMount () {
    localStorage.getItem('token')
    ? this.setState({ isTokenExist: true })
    : this.setState({ isTokenExist: false })
  }
  logout = () => {
    this.setState(() => {
      localStorage.clear()
      return { isTokenExist: null }
    })
  }
  render () {
    if (!this.state.isTokenExist) {
      return <Redirect to="/login" />
    }
    return (
      <Navbar sticky="top" expand="sm" className="w-100 bg-light">
        <Navbar.Brand className="h1"> Todo </Navbar.Brand>
        <Navbar.Toggle aria-controls="toggleable-btn" />
        <Navbar.Collapse id="toggleable-btn">
          <Button
            variant="outline-success"
            className="mx-4"
            id="addForm"
            onClick={this.props.showForm}
          >Add Todo</Button>
          <Button
            variant="outline-danger"
            className="ml-auto"
            onClick={this.logout}
          >Log Out</Button>
        </Navbar.Collapse>
      </Navbar>
    )
  }
}

export default Topbar