import { useEffect, useState, useRef } from 'react'
import './CSS/Todo.css'
import Todoitems from './Todoitems';

let count = 0;

const Todo = () => {
    const [todos, setTodos] = useState([]);
    const inputRef = useRef(null);

    // Add new task
    const add = () => {
        if (inputRef.current.value.trim() === "") return;

        setTodos([...todos, {
            no: count++,
            text: inputRef.current.value,
            display: ""
        }]);

        inputRef.current.value = "";
    };

    // Toggle complete/incomplete
    const toggleComplete = (no) => {
        const updatedTodos = todos.map(todo =>
            todo.no === no ? { ...todo, display: todo.display === "completed" ? "" : "completed" } : todo
        );
        setTodos(updatedTodos);
    };

    // Delete task
    const deleteTodo = (no) => {
        setTodos(todos.filter(todo => todo.no !== no));
    };

    // Save todos in localStorage whenever they change
    useEffect(() => {
        localStorage.setItem("todos", JSON.stringify(todos));
    }, [todos]);

    // Load todos from localStorage when component mounts
    useEffect(() => {
        const savedTodos = JSON.parse(localStorage.getItem("todos"));
        if (savedTodos) {
            setTodos(savedTodos);
            count = savedTodos.length; // keep count in sync
        }
    }, []);

    return (
        <div className='todo'>
            <div className="todo-header">To-Do List</div>
            <div className="todo-add">
                <input ref={inputRef} type="text" placeholder='Add Your Task' className='todo-input' />
                <div onClick={add} className="todo-add-btn">ADD</div>
            </div>
            <div className="todo-list">
                {todos.map((item, index) => (
                    <Todoitems
                        key={index}
                        no={item.no}
                        display={item.display}
                        text={item.text}
                        toggleComplete={toggleComplete}
                        deleteTodo={deleteTodo}
                    />
                ))}
            </div>
        </div>
    );
};

export default Todo;
