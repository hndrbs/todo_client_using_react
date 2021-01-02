import { Component } from 'react'
import Topbar from '../components/top-bar.js'
import TodoList from '../components/todo-list.js'
import server from '../config/server.js'
import TodoForm from '../components/todo-form.js'
import ErrorAlert from '../components/error-alert'
import { Redirect } from 'react-router-dom'

class Todo extends Component {
  constructor(props) {
    super(props)
    this.state = {
      todos: null,
      show: false,
      formParams: {
        titleName: '',
        submitName: ''
      },
      populator: null,
      errors: [],
      isLoggedIn: true
    }
  }
  logout = () => {
    this.setState(() => {
      localStorage.clear()
      return { isLoggedIn: false }
    })
  }
  showForm = (event, todo) => {
    // console.log(todo ,'ini todooo')
    // console.log(event)
    this.setState(() => {
      if (event.target.id === 'addForm') {
        return {
          show: true,
          formParams: {
            titleName: 'Add Form',
            submitName: 'Add'
          },
          populator: null
        }
      }
      return {
        show: true,
        formParams: {
          titleName: 'Edit Form Here',
          submitName: 'Edit'
        },
        populator: todo
      }
    })
  }
  hideForm = () => {
    this.setState({ show: false })
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
      // console.log(err.response.data)
      this.setErrors(err)
    }
  }
  setErrors = (err) => {
    err 
      ? this.setState(() => ({ errors: err.response.data.errors }))
      : this.setState(() => ({ errors: [] }))
  }
  componentDidMount () {
    localStorage.getItem('token')
    ? this.fetchTodos()
    : this.setState(() => ({isLoggedIn: false}))
  }
  render() {
    if (!this.state.isLoggedIn) {
      return <Redirect push to="/login" />
    }
    const { titleName, submitName } = this.state.formParams
    return (
      <div className="w-100 h-100">
        {
          this.state.show
            ? <TodoForm
              show={this.state.show}
              hideForm={this.hideForm}
              fetchTodos={this.fetchTodos}
              titleName={titleName}
              submitName={submitName}
              init={this.state.populator}
              errorHandler={this.setErrors}

            ></TodoForm>
            : null
        }
        <Topbar showForm={this.showForm} logout={this.logout} />
        {
          this.state.errors.length 
            ? <ErrorAlert 
                errors={this.state.errors}
                close={this.setErrors}
              />
            : null
        }
        <TodoList 
          todos={this.state.todos}
          fetchTodos={this.fetchTodos}
          showForm={this.showForm}
        />
      </div>
    )
  }
}

export default Todo
