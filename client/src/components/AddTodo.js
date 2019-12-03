import React, {useState} from 'react';
import { Redirect } from 'react-router-dom';
import axios from 'axios';

function AddTodo(){
    const [text, setText] = useState("");

    const saveTodo = async() => {
        let config = {
            headers: {'Authorization': "bearer " + JSON.parse(localStorage.getItem('token'))}
        };
        var res = await axios.post("http://localhost:9000/addTodo", {text}, config);
        alert(res.data);
        setText("");
    }

    const handleSubmit = e => {
        e.preventDefault();
        saveTodo();
    }

    return localStorage.getItem('token') !== null ? (
        <form onSubmit={handleSubmit}>
            <label>What should you do?</label><br/>
            <textarea rows="4" cols="50" value={text} onChange={e => setText(e.target.value)}></textarea><br/>
            <input type="submit" name="submit" value="submit"/>
        </form>
    ) : (<Redirect to="/" />);
}

export default AddTodo;