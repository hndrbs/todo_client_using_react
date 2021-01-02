import { Component } from 'react'
import { Card } from 'react-bootstrap'
import TodoButtons  from './todo-buttons.js'

class TodoCard extends Component {
  formatDate = (date) => {
    return new Date(date).toLocaleString('en-US', {
      day: 'numeric', month: 'long', year: 'numeric'
    })
  }
  render () {
    const { title, description, due_date } = this.props.todo
    return (
      <Card className="text-center m-3 col-3 p-0">
        <TodoButtons 
          todo={this.props.todo}
          fetchTodos={this.props.fetchTodos}
          showForm={this.props.showForm}
        />
        <Card.Title > {title} </Card.Title>
        <Card.Body> {description} </Card.Body>
        <Card.Footer>
          <p className="font-weight-bold">Due date</p>
          {this.formatDate(due_date)}
        </Card.Footer>
      </Card>
    )
  }
}

export default TodoCard