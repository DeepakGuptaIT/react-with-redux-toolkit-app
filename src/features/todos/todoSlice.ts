import { createSlice } from "@reduxjs/toolkit";
import localforage from "localforage";

export interface TodoItemState {
    id: string;
    text: string;
}
export interface TodoState {
    todos: TodoItemState[];
    status: 'idle' | 'loading' | 'failed';
}

const initialState: TodoState = {
    todos: [],
    status: 'idle'
}

export const todoSlice = createSlice({
    name: "todo",
    initialState,
    reducers: {
        addTodo: (state, action) => {
            let id = Math.random().toString(36).substring(2, 9);
            const todo = {
                id: id,
                text: action.payload,
            };
            state.todos.push(todo);

        },
        removeTodo: (state, action) => {
            state.todos = state.todos.filter(e => e.id !== action.payload);
        }
    }

});

export const { addTodo, removeTodo } = todoSlice.actions;

export default todoSlice.reducer;

function set(contacts: any) {
    return localforage.setItem("contacts", contacts);
}