import { BrowserRouter as Router, Route,  Switch } from 'react-router-dom'
import { Login, Register, Todo } from './views'

function App() {
  return (
    <div className="h-100">
      <Router>
        <Switch>
          <Route path="/login">
            <Login />
          </Route>
          <Route path="/register">
            <Register />
          </Route>
          <Route path="/">
            <Todo />
          </Route>
        </Switch>
      </Router>
    </div>
  );
}

export default App;
