import React, {useState, useEffect} from 'react';
import { Redirect } from 'react-router-dom';
import Todo from './Todo';
import axios from 'axios';

function Todos(){
    const [todos, setTodos] = useState([]);

    useEffect(() => {
        let config = {
            headers: {'Authorization': "bearer " + JSON.parse(localStorage.getItem('token'))}
        };
        axios.get('http://localhost:9000/todos', config).then(({data}) => {
            setTodos(data);
            console.log(data);
        })
    }, [])

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