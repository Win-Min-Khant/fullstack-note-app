import axios from "axios";
import type { Todo } from "../types/todo";

const API_URL = import.meta.env.VITE_MODE === 'production' ? import.meta.env.VITE_API_URL : import.meta.env.VITE_LOCAL_API_URL;
axios.defaults.withCredentials = true;
// export const getTodos = async (): Promise<Todo[]> => {
//     const response = await fetch(`${API_URL}/todos`);
//     const data = await response.json();
//     return data.todos;
// }

export const getTodos = async (): Promise<Todo[]> => {
    const { data } = await axios.get(`${API_URL}/todos`);
    return data.todos;
}

// export const createTodo = async (title: string, description: string): Promise<Todo> => {
//     const response = await fetch(`${API_URL}/todos/create`, {
//         method: 'POST',
//         headers: {
//             'Content-Type': 'application/json'
//         },
//         body: JSON.stringify({ title, description})
//     });
//     const data = await response.json();
//     return data.todo;
// }

export const createTodo = async (title: string, description: string): Promise<Todo> => {
    const {data } = await axios.post(`${API_URL}/todos/create`, { title, description });
    return data.todo;
}

// export const updateTodo = async (id: string, title: string, description: string): Promise<Todo> => {
//     const response = await fetch(`${API_URL}/todos/${id}`, {
//         method: 'PUT',
//         headers: {
//             'Content-Type': 'application/json'
//         },
//         body: JSON.stringify({ title, description})
//     });
//     const data = await response.json();
//     return data.todo;
// }

export const updateTodo = async (id: string, title: string, description: string): Promise<Todo> => {
    const { data } = await axios.put(`${API_URL}/todos/${id}`, { title, description });
    return data.todo;
}

// export const deleteTodo = async (id: string): Promise<void> => {
//     await fetch(`${API_URL}/todos/${id}`, {
//         method: 'DELETE',
//     });
// }

export const deleteTodo = async (id: string): Promise<void> => {
    await axios.delete(`${API_URL}/todos/${id}`);
}