import React, {useState, useEffect} from 'react';
import { Redirect } from 'react-router-dom';
import Todo from './Todo';
import axios from 'axios';

function Todos({setUser}){
    const [todos, setTodos] = useState([]);

    useEffect(() => {
        let config = {
            headers: {'Authorization': "bearer " + JSON.parse(localStorage.getItem('token'))}
        };
        axios.get('http://localhost:9000/todos', config).then(({data}) => {
            setTodos(data);
            console.log(data);
        }).catch((err) => {
            localStorage.removeItem('token');
            setUser("user");
            alert('Your token has expired, please log in again.');
        })
    }, [setTodos])

    const removeTodo = (id) => {
        setTodos(todos.filter(todo => todo.id !== id))
    }

    return localStorage.getItem('token') !== null ? (
        <div>
            <ul>
                {todos.map(todo => 
                    (<Todo key = {todo.id} removeTodo={removeTodo} todo={todo}/>)    
                )}
            </ul>
        </div>
    ) : (<Redirect to="/" />);
}

export default Todos;