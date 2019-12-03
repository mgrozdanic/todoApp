import React, {useState} from 'react';
import { Redirect } from 'react-router-dom';
import axios from 'axios';

function Login(){
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    
    const login = async() => {
        let res = await(axios.post('http://localhost:9000/login', {username, password}));
        localStorage.setItem('token', JSON.stringify(res.data));
    }
    const handleSubmit = (e) => {
        e.preventDefault();
        setUsername("");
        setPassword("");
        login();
    }
    return localStorage.getItem('token') === null ? (
        <form onSubmit={handleSubmit}>
            <label>Username:</label><br/>
            <input type = "text" name = "username" value={username} 
            onChange={e => setUsername(e.target.value)}/><br/>
            <label>Password:</label><br/>
            <input type = "password" name = "password" value={password}
            onChange={e => setPassword(e.target.value)}/><br/>
            <input type = "submit" value = "Submit"/>
        </form>
    ) : (<Redirect to="/" />);
}

export default Login;