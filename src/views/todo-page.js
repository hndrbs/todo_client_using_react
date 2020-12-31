import { Component } from 'react'
import Topbar from '../components/top-bar.js'
import TodoList from '../components/todo-list.js'

class Todo extends Component {
  constructor(props) {
    super(props)
    this.state = {

    }
  }
  render() {
    return (
      <div className="w-100">
        <Topbar />
        <TodoList />
      </div>
    )
  }
}

export default Todo
