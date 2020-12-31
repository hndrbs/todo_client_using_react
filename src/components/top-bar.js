import { Component } from 'react'
import  { Navbar, Button } from 'react-bootstrap'

class Topbar extends Component {
  // constructor (props) {
  //   super(props)
  // }
  render () {
    return (
      <Navbar sticky="top" expand="sm" className="w-100">
        <Navbar.Brand className="h1"> Todo </Navbar.Brand>
        <Navbar.Toggle aria-controls="toggleable-btn" />
        <Navbar.Collapse id="toggleable-btn">
          <Button
            variant="outline-success"
            className="mx-4"
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