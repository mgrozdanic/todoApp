import React, {useState} from 'react';
import axios from 'axios';

function Todo({todo, removeTodo, updateTodos}){
    const [text, setText] = useState(todo.text);
    console.log("TODO");
    let config = {
        headers: {'Authorization': "bearer " + JSON.parse(localStorage.getItem('token'))}
    };
    const handleDelete = async() => {
        let res = await axios.delete('http://localhost:9000/delete/' + todo.id, config);
        alert(res.data);
        removeTodo(todo.id);
    };

    const handleModify = async() => {
        let res = await axios.put("http://localhost:9000/change/" + todo.id, {text}, config);
        alert(res.data);
        updateTodos(todo.id, text);
    }

    return (
        <div>
            <textarea id={todo.id} value={text} onChange={e => setText(e.target.value)}/><br/>
            <button onClick={handleDelete}>Delete</button>
            <button onClick={handleModify}>Modify</button>
        </div>
    );
}

export default Todo;