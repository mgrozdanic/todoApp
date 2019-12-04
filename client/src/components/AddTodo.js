import React, {useState} from 'react';
import { Redirect } from 'react-router-dom';
import axios from 'axios';

function AddTodo({setUser}){
    const [text, setText] = useState("");
    const [description, setDescripton] = useState("");
    const [priority, setPriority] = useState("low");
    const [done, setDone] = useState(false);

    const saveTodo = async() => {
        let config = {
            headers: {'Authorization': "bearer " + JSON.parse(localStorage.getItem('token'))}
        };
        if (text !== ""){
            var res = await axios.post("http://localhost:9000/addTodo", 
            {text, description, priority, done}, config);
            
            alert(res.data);
            setText("");
            setDescripton("");
            setPriority("low");
            setDone(false);
        } else {
            alert("Text field cannot be empty.");
        }
        
    }

    const handleSubmit = e => {
        e.preventDefault();
        saveTodo();
    }

    const handleChange = e => {
        setPriority(e.target.value);
    }

    return localStorage.getItem('token') !== null ? (
        <form onSubmit={handleSubmit}>
            <label>What should you do?</label><br/>
            <input type="text" value={text} onChange={e => setText(e.target.value)}/><br/>
            <label>Description:</label><br/>
            <textarea rows="4" cols="50" value={description} onChange={e => setDescripton(e.target.value)}></textarea><br/>
            <label>Priority:</label><br/>
            <input type="radio" name="priority" value="low" checked={priority === 'low'} onChange={handleChange}/>Low 
            <input type="radio" name="priority" value="medium" checked={priority === 'medium'} onChange={handleChange}/>Medium 
            <input type="radio" name="priority" value="high" checked={priority === 'high'} onChange={handleChange}/>High<br/>
            <input type="checkbox" value={done} onChange={() => setDone(!done)}/>Done<br/>
            <input type="submit" name="submit" value="submit"/>
        </form>
    ) : (<Redirect to="/" />);
}

export default AddTodo;