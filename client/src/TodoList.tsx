import React, { useEffect, useState } from "react";
import type { Todo } from "./types/todo";
import { createTodo, deleteTodo, getTodos, updateTodo } from "./services/todo";
import { useSelector } from "react-redux";
import type { RootState } from "./store";

function TodoList() {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [refresh, setRefresh] = useState(false);
  const [editMode, setEditMode] = useState(false);
  const [editId, setEditId] = useState("");
  const userInfo = useSelector((state: RootState) => state.auth.userInfo);

  useEffect(() => {
    const fetchTodos = async () => {
      try {
        const data = await getTodos();
        setTodos(data);
      } catch (error) {
        throw new Error("Failed to fetch todos");
      }
    };
    fetchTodos();
  }, [refresh]);

  const refreshHandler = () => {
    setRefresh((prev) => !prev);
  };

  const submitHandler = async (e: React.FormEvent) => {
    e.preventDefault();
    if (editMode) {
      try {
        await updateTodo(editId, title, description);
        setEditMode(false);
      } catch (error) {
        throw new Error("Failed to update todo");
      }
    } else {
      try {
        await createTodo(title, description);
      } catch (error) {
        throw new Error("Failed to create todo");
      }
    }
    setTitle("");
    setDescription("");
    refreshHandler();
  };

  const deleteHandler = async (id: string) => {
    try {
      await deleteTodo(id);
      refreshHandler();
    } catch (error) {
      throw new Error("Failed to delete todo");
    }
  };

  const handleModeChange = (id: string, title: string, description: string) => {
    setTitle(title);
    setDescription(description);
    setEditMode(true);
    setEditId(id);
  };
  return (
    <div className="max-w-4xl mx-auto p-6 bg-white shadow-lg rounded-lg mt-8">
      <h1 className="text-3xl font-bold text-center mb-6 text-gray-800">
        Todo List
      </h1>
      {userInfo ? (
        <form onSubmit={submitHandler} className="mb-8">
          <div className="mb-4">
            <label
              htmlFor="title"
              className="block text-gray-700 text-sm font-bold mb-2"
            >
              Title
            </label>
            <input
              type="text"
              id="title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              placeholder="Enter todo title"
            />
          </div>
          <div className="mb-4">
            <label
              htmlFor="description"
              className="block text-gray-700 text-sm font-bold mb-2"
            >
              Description
            </label>
            <input
              type="text"
              id="description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              placeholder="Enter todo description"
            />
          </div>
          <button
            type="submit"
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline cursor-pointer"
          >
            {editMode ? "Update Todo" : "Add Todo"}
          </button>
        </form>
      ) : (
        <div className="p-3 bg-red-700 text-white text-sm text-center">
          You need to login first to create your own notes!
        </div>
      )}
      <div className="space-y-4">
        {todos.map((todo) => (
          <div key={todo._id} className="bg-gray-50 p-4 rounded-lg shadow-sm">
            <h3 className="text-xl font-semibold text-gray-800 mb-2">
              {todo.title}
            </h3>
            <p className="text-gray-600 mb-4">{todo.description}</p>
            <div className="flex space-x-2">
              {todo.userId === userInfo?._id && (
                <>
                  <button
                    onClick={() => deleteHandler(todo._id)}
                    className="bg-red-500 hover:bg-red-700 text-white font-bold py-1 px-3 rounded text-sm focus:outline-none focus:shadow-outline cursor-pointer"
                  >
                    Delete
                  </button>
                  <button
                    onClick={() =>
                      handleModeChange(todo._id, todo.title, todo.description)
                    }
                    className="bg-yellow-500 hover:bg-yellow-700 text-white font-bold py-1 px-3 rounded text-sm focus:outline-none focus:shadow-outline cursor-pointer"
                  >
                    Edit
                  </button>
                </>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default TodoList;
