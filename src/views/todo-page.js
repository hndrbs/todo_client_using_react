import { Component } from 'react'
import Topbar from '../components/top-bar.js'
import TodoList from '../components/todo-list.js'
import server from '../config/server.js'

class Todo extends Component {
  constructor(props) {
    super(props)
    this.state = {
      todos: null
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
  render() {
    return (
      <div className="w-100 h-100">
        <Topbar 
          fetchTodos={this.fetchTodos}
        />
        <TodoList 
          todos={this.state.todos}
          fetchTodos={this.fetchTodos}
        />
      </div>
    )
  }
}

export default Todo
