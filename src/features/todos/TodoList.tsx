
import { useState } from 'react';
import { useAppSelector, useAppDispatch } from '../../app/hooks';
import { addTodo, removeTodo } from '../todos/todoSlice';
function TodoList() {
    const dispatch = useAppDispatch();
    const todos = useAppSelector((state) => state.todo.todos);
    const count = todos.length;
    const [todoText, setTodoText] = useState("");


    return (<>
        <h1>Hello Todo List</h1>

        {/* <form onSubmit={handleAddTodo}>
            <label>
                Name:
                <input type="text" value={this.state.value} onChange={this.handleChange} />
            </label>
            <input type="submit" value="Submit" />
        </form> */}
        <form>

            <p>
                <input
                    type="text"
                    aria-label="Set increment amount"
                    value={todoText}
                    onChange={(e) => setTodoText(e.target.value)}
                /> {"   "}
                <button type="button"
                    onClick={() => dispatch(addTodo(todoText))}>Add Note</button>
            </p>
            <p>
                <ul>

                    {count > 0 &&
                        todos.map((todo) => (
                            <li key={todo.id} onClick={() => dispatch(removeTodo(todo.id))}>
                                <h3>{todo.text}</h3>
                            </li>
                        ))}
                </ul>
                {count === 0 && <p>No todos</p>}
            </p>
        </form>


    </>);


}

export default TodoList;