import { Component } from 'react'
import  { Navbar, Button } from 'react-bootstrap'
import TodoForm from './todo-form.js'
class Topbar extends Component {
  constructor (props) {
    super(props)
    this.state = {
      showAdd: false
    }
  }
  showAddForm = () => {
    this.setState({ showAdd: true })
  }
  hideAddForm = () => {
    this.setState({ showAdd: false})
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
            onClick={this.showAddForm}
          >Add Todo</Button>
          <TodoForm
            show={this.state.showAdd}
            hide={this.hideAddForm}
            titleName="Add a new TODO"
            submitName="Add Todo"
            fetchTodos={this.props.fetchTodos}
          ></TodoForm>
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