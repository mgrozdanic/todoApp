import React, {useState} from 'react';
import { Redirect } from 'react-router-dom';
import Todo from './Todo';

function Todos(){
    //const [todos, setTodos] = useState("");
    const todos = [
        {id: 0, name: "Do the dishes"},
        {id: 1, name: "Do the homework"},
        {id: 2, name: "Watch Babylon Berlin"}
    ];
    return localStorage.getItem('token') !== null ? (
        <div>
            <ul>
                {todos.map(todo => 
                    (<Todo key = {todo.id} todo={todo}/>)    
                )}
            </ul>
        </div>
    ) : (<Redirect to="/" />);
}

export default Todos;