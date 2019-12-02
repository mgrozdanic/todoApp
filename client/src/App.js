import React from 'react';
import Login from './components/Login'
import logo from './logo.svg';
import { Route, Link, BrowserRouter as Router } from 'react-router-dom'
import './App.css';

function App() {
  return (
    <div className="App">
      <Router>
        <Route path="/login" component={Login}/>
      </Router>
    </div>
  );
}

export default App;
