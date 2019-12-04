import React, {useState} from 'react';
import Login from './components/Login'
import logo from './logo.svg';
import { Route, Link, BrowserRouter as Router } from 'react-router-dom'
import './App.css';
import Todos from './components/Todos';
import Register from './components/Register';
import AddTodo from './components/AddTodo';
import Home from './components/Home';
import NavComponent from './components/NavComponent';

function App() {
  const [user, setUser] = useState("");
  return (
    <div className="App">
      <Router>
        <NavComponent setUser={setUser}/>
        {/* <Route path="/login" component={Login}/>
        <Route path="/todos" component={Todos}/>
        <Route path="/register" component={Register}/>
        <Route path="/addTodo" component={AddTodo}/>
        <Route exact path="/" component={Home}/> */}
        <Route path="/login" render={() => <Login setUser = {setUser}/>}/>
        <Route path="/todos" render={() => <Todos setUser = {setUser}/>}/>
        <Route path="/register" render={() => <Register setUser = {setUser}/>}/>
        <Route path="/addTodo" render={() => <AddTodo setUser = {setUser}/>}/>
        <Route exact path="/" component={Home}/>
      </Router>
    </div>
  );
}

export default App;
