import React from 'react';
import {Link} from 'react-router-dom';

function NavComponent({setUser}) {
    return localStorage.getItem('token') !== null ? (
        <div>
            <ul>
                <li>
                    <Link to='/'>Home</Link>
                    <Link to='/todos' >My Todos</Link>
                    <Link to='/addTodo'>Add new Todo</Link>
                    <Link to='/' onClick={()=>{
                        localStorage.removeItem('token');
                        setUser("user");
                    }}>Log out</Link>
                </li>
            </ul>
        </div>
    )
    :(<div>
        <ul>
            <li>
                <Link to='/'>Home</Link>
                <Link to='/login'>Login</Link>
                <Link to='/register'>Register</Link>
            </li>
        </ul>
    </div>
    );
}

export default NavComponent;