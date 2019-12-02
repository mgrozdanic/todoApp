import React, {useState} from 'react';
import axios from 'axios';

function Login(){
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const login = async() => {
        return await(axios.post('http://localhost:9000/login', {username, password}));
    }
    const handleSubmit = (e) => {
        e.preventDefault();
        setUsername("");
        setPassword("");
        let user = login();
        console.log(user);
    
    }
    return (
        <form onSubmit={handleSubmit}>
            <label>Username:</label><br/>
            <input type = "text" name = "username" value={username} 
            onChange={e => setUsername(e.target.value)}/><br/>
            <label>Password:</label><br/>
            <input type = "password" name = "password" value={password}
            onChange={e => setPassword(e.target.value)}/><br/>
            <input type = "submit" value = "Submit"/>
        </form>
    );
}

export default Login;