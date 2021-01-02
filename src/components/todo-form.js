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
  componentDidMount () {
    if (this.props.init) {
      // console.log(this.props.init)
      const { title, description, due_date } = this.props.init
      this.setState(() => (
        { title, description, due_date }
      ))
    }
  }
  addTodoHandler = async () => {
    try {
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
      this.props.hideForm()
    }
    
  }
  editTodoHandler = async () => {
    try {
      const id = this.props.init.id
      await server({
        url: '/todos/'+ id,
        method: 'put',
        data: this.state,
        headers: { token: localStorage.getItem('token') }
      })
      console.log('edit oke gan')
      this.props.fetchTodos()
    } catch (err) {
      console.log(err.response.data)
    } finally {
      this.props.hideForm()
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
  preFillDate = (date) => {
    if (date) {
      date = new Date(date)
      let newDate = +date.getDate()
      let month = +date.getMonth() + 1
      let year = date.getFullYear()
      
      newDate < 10 ? newDate = '0' + newDate : newDate = newDate
      month < 10 ? month = '0' + month : month = month
      
      // console.log(`${year}-${month}-${newDate}`)
      return `${year}-${month}-${newDate}`
    }
    return ''
  }
  submitFormHandler = (e) => {
    e.preventDefault()
    const submitName = this.props.submitName
    submitName === 'Add'
    ? this.addTodoHandler()
    : this.editTodoHandler()
  }
  render () {
    const { title, description, due_date } = this.state
    return (
      <Modal show={this.props.show} onHide={this.props.hideForm}>
        <Modal.Header closeButton>
          <Modal.Title> { this.props.titleName } </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={this.submitFormHandler}>
            <Form.Group>
              <Form.Label>Title</Form.Label>
              <Form.Control
                name="title"
                type="text"
                onChange={this.valueCatcher}
                placeholder="todo's title here"
                defaultValue={title}
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
                defaultValue={description}
              >
              </Form.Control>
            </Form.Group>

            <Form.Group>
              <Form.Label>Due Date</Form.Label>
              <Form.Control
                type="date"
                onChange={this.valueCatcher}
                name="due_date"
                defaultValue={this.preFillDate(due_date)}
              >
              </Form.Control>
            </Form.Group>
            <Modal.Footer>
              <Button type="submit">{ this.props.submitName }</Button>
              <Button type="button" onClick={this.props.hideForm}>Cancel</Button>
            </Modal.Footer>
          </Form>
        </Modal.Body>
      </Modal>        
    )
  }
}

export default TodoForm