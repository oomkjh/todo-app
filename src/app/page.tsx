"use client";
import { useEffect, useState } from "react";
import axios from "axios";

type Todo = {
  id: string;
  title: string;
  description: string;
  completed: boolean;
};

export default function Home() {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [todos, setTodos] = useState<Todo[]>([]);
  const [loading, setLoading] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editTitle, setEditTitle] = useState("");
  const [editDescription, setEditDescription] = useState("");

  useEffect(() => {
    const fetchTodos = async () => {
      setLoading(true);
      try {
        const res = await axios.get("/api/todo");
        setTodos(res.data.data);
      } catch (error) {
        console.error("Error loading todos:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchTodos();
  }, []);

  const addTodo = async () => {
    if (!title.trim()) return;

    try {
      const res = await axios.post("/api/todo", {
        title: title.trim(),
        description: description.trim() || "No description",
      });

      setTodos(todos.concat(res.data.data));
      setTitle("");
      setDescription("");
    } catch (error) {
      console.error("Error creating todo:", error);
    }
  };

  const startEdit = (todo: Todo) => {
    setEditingId(todo.id);
    setEditTitle(todo.title);
    setEditDescription(todo.description);
  };

  const cancelEdit = () => {
    setEditingId(null);
    setEditTitle("");
    setEditDescription("");
  };

  const saveEdit = async (id: string) => {
    try {
      const res = await axios.patch(`/api/todo/${id}`, {
        title: editTitle.trim(),
        description: editDescription.trim(),
      });

      setTodos((prev) =>
        prev.map((todo) => (todo.id === id ? res.data.data : todo))
      );
      cancelEdit();
    } catch (error) {
      console.error("Error updating todo:", error);
    }
  };

  const deleteTodo = async (id: string) => {
    try {
      await axios.delete(`/api/todo/${id}`);
      setTodos((prev) => prev.filter((todo) => todo.id !== id));
    } catch (error) {
      console.error("Error deleting todo:", error);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center justify-center p-4">
      <div className="bg-white shadow-md rounded-lg w-full max-w-md p-6 text-gray-700">
        <h1 className="text-2xl font-bold text-center mb-4">📝 ToDo List</h1>

        {/* Form */}
        <input
          type="text"
          placeholder="Title"
          className="w-full border rounded px-3 py-2 mb-2 focus:outline-none"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <textarea
          placeholder="Description"
          className="w-full border rounded px-3 py-2 mb-2 focus:outline-none"
          rows={2}
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        ></textarea>
        <div className="flex justify-end mb-4">
          <button
            onClick={addTodo}
            className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
          >
            Add
          </button>
        </div>

        {/* List */}
        {loading ? (
          <p className="text-center">Loading...</p>
        ) : (
          <ul className="space-y-2">
            {todos.map((todo) => (
              <li key={todo.id} className="border-b py-2">
                {editingId === todo.id ? (
                  <>
                    <input
                      type="text"
                      value={editTitle}
                      onChange={(e) => setEditTitle(e.target.value)}
                      className="w-full border rounded px-2 py-1 mb-1"
                    />
                    <textarea
                      value={editDescription}
                      onChange={(e) => setEditDescription(e.target.value)}
                      className="w-full border rounded px-2 py-1 mb-2"
                      rows={2}
                    />
                    <div className="flex justify-between">
                      <button
                        onClick={() => saveEdit(todo.id)}
                        className="bg-green-500 text-white px-3 py-1 rounded hover:bg-green-600"
                      >
                        Save
                      </button>
                      <button
                        onClick={cancelEdit}
                        className="text-gray-500 hover:text-gray-700"
                      >
                        Cancel
                      </button>
                    </div>
                  </>
                ) : (
                  <div className="flex justify-between items-start">
                    <div>
                      <strong>{todo.title}</strong>
                      <p className="text-sm text-gray-500">
                        {todo.description}
                      </p>
                    </div>
                    <div className="space-x-2">
                      <button
                        onClick={() => startEdit(todo)}
                        className="text-blue-500 hover:text-blue-700"
                      >
                        Edit
                      </button>
                      <button
                        onClick={() => deleteTodo(todo.id)}
                        className="text-red-500 hover:text-red-700"
                      >
                        Delete
                      </button>
                    </div>
                  </div>
                )}
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}
