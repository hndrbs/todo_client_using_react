import { Component } from 'react'
import { CheckCircle, XSquare, Pencil, Circle } from 'react-bootstrap-icons'
import { Button, Card } from 'react-bootstrap'
import server from '../config/server.js'

class TodoButtons extends Component {

  changeStatus = async () => {
    try {
      let { id, status } = this.props.todo
      status === 'undone' 
        ? status = 'done' 
        : status = "undone"
      await server({
        url: '/todos/' + id,
        method: 'patch',
        data: { status },
        headers: { token: localStorage.getItem('token') }
      })
      this.props.fetchTodos()
    } catch (err) {
      console.log(err.response.data)
    }
  }
  deleteTodo = async () => {
    try {
      const id = this.props.todo.id
      await server({
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
    const { status }= this.props.todo
    let StatusBtn = Circle
    let color = "green"
    if (status === 'done') {
      StatusBtn = CheckCircle
      color = "red"
    }
    return (
      <Card.Header className="d-flex justify-content-between w-100">
        <Button variant="outer-dark" onClick={this.changeStatus}>
          <StatusBtn color={ color } size={"1.5rem"}/>
        </Button>
        
        <Button 
          variant="outer-dark"
          onClick={e => this.props.showForm(e, this.props.todo)}
        >
          <Pencil color="blue" size={"1.5rem"}/>
        </Button>
        <Button variant="outer-danger" onClick={this.deleteTodo}>
          <XSquare color="red" size={"1.5rem"}/>
        </Button>
      </Card.Header>      
    ) 
  }
}

export default TodoButtons
