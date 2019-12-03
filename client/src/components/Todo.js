import React from 'react';
import axios from 'axios';

function Todo({todo, removeTodo}){
    console.log("TODO");
    let config = {
        headers: {'Authorization': "bearer " + JSON.parse(localStorage.getItem('token'))}
    };
    const handleDelete = async() => {
        let res = await axios.delete('http://localhost:9000/delete/' + todo.id, config);
        alert(res.data);
        removeTodo(todo.id);
    };
    return (
        <div>
            <textarea id={todo.id} readOnly>{todo.text}</textarea><br/>
            <button onClick={handleDelete}>Delete</button>
            <button>Modify</button>
        </div>
    );
}

export default Todo;