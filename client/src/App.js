import React from 'react';
import Login from './components/Login'
import logo from './logo.svg';
import { Route, Link, BrowserRouter as Router } from 'react-router-dom'
import './App.css';
import Todos from './components/Todos';
import Register from './components/Register';

function App() {
  return (
    <div className="App">
      <Router>
        <Route path="/login" component={Login}/>
        <Route path="/todos" component={Todos}/>
        <Route path="/register" component={Register}/>
      </Router>
    </div>
  );
}

export default App;
