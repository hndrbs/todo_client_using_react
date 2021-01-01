import { Component } from 'react'
import { Form, Modal, Button } from 'react-bootstrap'
import server from '../config/server.js'

class TodoForm extends Component {
  constructor () {
    super()
    this.state = {
      title: '',
      description: '',
      due_date: ''
    }
  }
  hide = () => {
    this.props.hideHandler()
  }
  addTodoHandler = async (event) => {
    try {
      event.preventDefault()
      await server({
        url:'/todos',
        method: 'post',
        data: this.state,
        headers: { token: localStorage.getItem('token') }
      })
      console.log('add oke gan')
      this.props.fetchTodos()
    } catch (err) {
      console.log(err.response.data)
    } finally {
      this.props.hide()
    }
    
  }
  valueCatcher = async (event) => {
    const name = event.target.name
    const value = event.target.value
    switch (name) {
      case 'title':
        this.setState({ title: value })
        break;
      case 'description':
        this.setState({ description: value })
        break;
      case 'due_date':
        this.setState({ due_date: value })
        break;
      default:
        break;
    }
  }
  render () {
    return (
      <Modal show={this.props.show} onHide={this.props.hide}>
        <Modal.Header closeButton>
          <Modal.Title> { this.props.titleName } </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={this.addTodoHandler}>
            <Form.Group>
              <Form.Label>Title</Form.Label>
              <Form.Control
                name="title"
                type="text"
                onChange={this.valueCatcher}
                placeholder="todo's title here"
              >
              </Form.Control>
            </Form.Group>

            <Form.Group>
              <Form.Label>Description</Form.Label>
              <Form.Control
                name="description"
                onChange={this.valueCatcher}
                type="text"
                placeholder="todo's description here"
              >
              </Form.Control>
            </Form.Group>

            <Form.Group>
              <Form.Label>Due Date</Form.Label>
              <Form.Control
                type="date"
                onChange={this.valueCatcher}
                name="due_date"
              >
              </Form.Control>
            </Form.Group>
            <Modal.Footer>
              <Button type="submit">{ this.props.submitName }</Button>
              <Button type="button" onClick={this.props.hide}>Cancel</Button>
            </Modal.Footer>
          </Form>
        </Modal.Body>
      </Modal>        
    )
  }
}

export default TodoForm