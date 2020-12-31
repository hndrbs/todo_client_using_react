import { Component } from 'react'
import TodoCard from './todo-card'
import server from '../config/server.js'

class TodoList extends Component {
  constructor () {
    super()
    this.state = {
      todos: []
    }
  }
  fetchTodos = async () => {
    try {
      const { data } = await server({
        url: '/todos',
        method: 'get',
        headers: { token: localStorage.getItem('token') }
      })
      // console.log(data)
      this.setState({ todos: data })
    } catch (err) {
      console.log(err)
    }
  }
  componentDidMount () {
    this.fetchTodos()
  }
  render () {
    const Cards = this.state.todos.map(todo => {
      return <TodoCard todo={ todo } key={todo.id} />
    })
    return Cards
  }
}

export default TodoList
