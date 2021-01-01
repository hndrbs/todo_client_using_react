import { Component } from 'react'
import { CheckCircle, XSquare, Pencil, Circle } from 'react-bootstrap-icons'
import { Button, Card } from 'react-bootstrap'
import server from '../config/server.js'

class TodoButtons extends Component {
  changeStatus = async () => {
    try {
      let { id, status } = this.props
      status === 'undone' 
        ? status = 'done' 
        : status="undone"
      await server({
        url: '/todos/' + id,
        method: 'patch',
        data: { status },
        headers: { token: localStorage.getItem('token')}
      })
      this.props.fetchTodos()
    } catch (err) {
      console.log(err.response.data)
    }
  }
  deleteTodo = async () => {
    try {
      const id = this.props.id
      server({
        url:'/todos/' + id,
        method: 'delete',
        headers: { token: localStorage.getItem('token') }
      })
      this.props.fetchTodos()
    } catch (err) {
      console.log(err.response.data)
    }
  }
  render () {
    const status = this.props.status
    let StatusBtn = Circle
    let color = "green"
    if (status === 'done') {
      StatusBtn = CheckCircle
      color = "red"
    }
    return (
      <Card.Header className="d-flex justify-content-between w-100">
        <Button variant="outer-dark">
          <StatusBtn 
            color={ color }
            size={"1.5rem"}
            onClick={this.changeStatus} 
          />
        </Button>
        <Button variant="outer-dark">
          <Pencil color="blue" size={"1.5rem"} />
        </Button>
        <Button variant="outer-danger">
          <XSquare 
            color="red"
            size={"1.5rem"}
            onClick={this.deleteTodo}
          />
        </Button>
      </Card.Header>      
    ) 
  }
}

export default TodoButtons
