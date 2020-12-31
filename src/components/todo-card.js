import { Component } from 'react'
import { Card } from 'react-bootstrap'

class TodoCard extends Component {
  constructor (props) {
    super(props)
  }
  render () {
    let { id, title, description, status, due_date } = this.props.todo
    return (
      <Card>
        <Card.Title>{title}</Card.Title>
        <Card.Body>{description}</Card.Body>
        <Card.Footer>{due_date}</Card.Footer>
      </Card>
    )
  }
}

export default TodoCard