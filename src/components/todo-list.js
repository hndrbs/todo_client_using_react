import { Component } from 'react'
import TodoCard from './todo-card'

class TodoList extends Component {
  fetchTodos = () => {
    this.props.fetchTodos()
  } 
  componentDidMount () {
    this.fetchTodos()
    console.log(this.props.todos)
  }
  render () {
    if (!this.props.todos) {
      return (
        <div
          className="bg-secondary container-fluid h-100 text-light text-center d-flex flex-column justify-content-center"
        >
          <h2>loading.......</h2>
        </div>
      )
    }
    const Cards = this.props.todos.map(todo => {
      return <TodoCard
        todo={todo}
        key={todo.id}
        fetchTodos={this.fetchTodos}
      />
    })
    return (
      <div className="row justify-content-center">
        { Cards }
      </div>
    )
  }
}

export default TodoList
