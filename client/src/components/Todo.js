import React from 'react';

function Todo({todo}){
    console.log("TODO")
    return (
        <li>
            <div>
                <p>{todo.name}</p>
            </div>
        </li>
    );
}

export default Todo;