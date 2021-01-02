import { Component } from 'react'
import  { Navbar, Button, Dropdown } from 'react-bootstrap'
import { PersonFill } from 'react-bootstrap-icons'
class Topbar extends Component {
  constructor () {
    super()
    this.state = {
      user: ''
    }
  }
  componentDidMount () {
    localStorage.getItem('token')
    ? this.setState({ user: localStorage.getItem('user') })
    : this.props.logout()
  }
  render () {
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
          <Dropdown className="ml-auto">
            <Dropdown.Toggle variant="dark">
              {this.state.user} <PersonFill />
            </Dropdown.Toggle>
            <Dropdown.Menu
              className="bg-transparent"
              style={{
                minWidth: "100%",
                maxWidth: "100%",
                paddingBottom: 0,
              }}
            >
              <Dropdown.Item
                className="btn btn-danger"
                href="#"
                onClick={this.props.logout}
              >Log Out</Dropdown.Item>
            </Dropdown.Menu>
          </Dropdown>
        </Navbar.Collapse>
      </Navbar>
    )
  }
}

export default Topbar