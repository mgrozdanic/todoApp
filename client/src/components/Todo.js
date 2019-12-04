import React, {useState} from 'react';
import axios from 'axios';

function Todo({todo, removeTodo, updateTodos}){
    const [text, setText] = useState(todo.text);
    const [description, setDescripton] = useState(todo.description);
    const [priority, setPriority] = useState(todo.priority);
    const [done, setDone] = useState(todo.done == 1);

    console.log(todo.done == 1);

    let config = {
        headers: {'Authorization': "bearer " + JSON.parse(localStorage.getItem('token'))}
    };
    const handleDelete = async() => {
        let res = await axios.delete('http://localhost:9000/delete/' + todo.id, config);
        alert(res.data);
        removeTodo(todo.id);
    };

    const handleModify = async() => {
        let res = await axios.put("http://localhost:9000/change/" + todo.id, 
        {text, description, priority, done}, config);
        alert(res.data);
        updateTodos(todo.id, {text, description, priority, done});
    }

    const handleChange = e => {
        setPriority(e.target.value);
    }

    return (
        <div>
            <div>
                <input type="text" value={text} onChange={e => setText(e.target.value)}/><br/>
                <textarea rows="4" cols="18" value={description} onChange={e => setDescripton(e.target.value)}></textarea><br/>
                <label>Priority:</label><br/>
                <input type="radio" name="priority" value="low" checked={priority === 'low'} onChange={handleChange}/>Low 
                <input type="radio" name="priority" value="medium" checked={priority === 'medium'} onChange={handleChange}/>Medium 
                <input type="radio" name="priority" value="high" checked={priority === 'high'} onChange={handleChange}/>High<br/>
                <input type="checkbox" checked={done} onChange={() => setDone(!done)}/>Done<br/>
            </div>
            {/* <textarea id={todo.id} value={text} onChange={e => setText(e.target.value)}/><br/> */}
            <button onClick={handleDelete}>Delete</button>
            <button onClick={handleModify}>Modify</button>
        </div>
    );
}

export default Todo;