import React, {useState} from 'react';
import { Redirect } from 'react-router-dom';
import axios from 'axios';

function Register({setUser}){
    const [firstName, SetFirstname] = useState("");
    const [lastName, SetLastname] = useState("");
    const [username, SetUsername] = useState("");
    const [email, SetEmail] = useState("");
    const [password, SetPassword] = useState("");
    //const [user, SetUser] = useState("");

    const register = async() => {
        let res = await axios.post("http://localhost:9000/register", {firstName, lastName, username, email, password});
        if (res.data !== 'Username already exists.'){
            localStorage.setItem('token', JSON.stringify(res.data));
            setUser(res.data);
        } else {
            alert(res.data);
        }
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        if (firstName === "" || lastName === "" || username === "" || password === ""
            || email === ""){
            alert("All fields have to be filled!");
            return;
        }
        register();
    }

    return localStorage.getItem('token') === null ? (
        <form onSubmit = {handleSubmit}>
            <label>First Name:</label><br/>
            <input type="text" name="firstName" value = {firstName} onChange={ e => SetFirstname(e.target.value)}/><br/>
            <label>Last Name:</label><br/>
            <input type="text" name="lastName" value = {lastName} onChange={ e => SetLastname(e.target.value)}/><br/>
            <label>Username:</label><br/>
            <input type="text" name="username" value = {username} onChange={ e => SetUsername(e.target.value)}/><br/>
            <label>Email:</label><br/>
            <input type="text" name="email" value = {email} onChange={ e => SetEmail(e.target.value)}/><br/>
            <label>Password:</label><br/>
            <input type="password" name="password" value = {password} onChange={ e => SetPassword(e.target.value)}/><br/>
            <input type="submit" name="submit" value="Submit"/>
        </form>
    ) : (<Redirect to="/" />);
}

export default Register;