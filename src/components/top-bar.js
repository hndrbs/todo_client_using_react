import { Component } from 'react'
import  { Navbar, Button } from 'react-bootstrap'
class Topbar extends Component {
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
          <Button
            variant="outline-danger"
            className="ml-auto"
          >Log Out</Button>
        </Navbar.Collapse>
      </Navbar>
    )
  }
}

export default Topbar