import React, { useEffect, useState } from "react";
import API from "../api/axios";
import { toast } from "react-toastify";

function Dashboard() {
  const [tasks, setTasks] = useState([]);
  const [title, setTitle] = useState("");

  const token = localStorage.getItem("token");

  const fetchTasks = async () => {
    try {
      const res = await API.get("/tasks", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      console.log("API response:", res.data);

      // Ensure we always store an array
      if (Array.isArray(res.data)) {
        setTasks(res.data);
      } else if (res.data.tasks) {
        setTasks(res.data.tasks);
      } else {
        setTasks([]);
      }
    } catch (err) {
      console.log(err);
      toast.error("Failed to fetch tasks");
    }
  };

  useEffect(() => {
    fetchTasks();
  }, []);

  const addTask = async (e) => {
    e.preventDefault();

    if (!title.trim()) {
      toast.error("Task cannot be empty");
      return;
    }

    try {
      const res = await API.post(
        "/tasks",
        { title },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );

      console.log("Added task:", res.data);

      const newTask = res.data.task || res.data;

      setTasks((prev) => [...prev, newTask]);
      setTitle("");

      toast.success("Task added");
    } catch (err) {
      console.log(err);
      toast.error("Failed to add task");
    }
  };

  const deleteTask = async (id) => {
    try {
      await API.delete(`/tasks/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      setTasks((prev) => prev.filter((task) => task._id !== id));

      toast.success("Task deleted");
    } catch (err) {
      console.log(err);
      toast.error("Delete failed");
    }
  };

  return (
    <div className="max-w-3xl mx-auto mt-10 text-gray-900">
      <h1 className="text-3xl font-bold mb-6 text-center">Task Dashboard</h1>

      {/* Add Task */}
      <form onSubmit={addTask} className="flex gap-3 mb-6">
        <input
          type="text"
          placeholder="Enter task..."
          className="border p-2 flex-1 text-black rounded"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />

        <button
          type="submit"
          className="bg-indigo-600 text-white px-4 py-2 rounded hover:bg-indigo-700"
        >
          Add
        </button>
      </form>

      {/* Task List */}

      <div className="space-y-3">
        {tasks.length === 0 ? (
          <p className="text-center text-gray-500">No tasks found</p>
        ) : (
          tasks.map((task) => (
            <div
              key={task._id}
              className="flex items-center justify-between bg-white border px-4 py-3 rounded-lg shadow hover:shadow-md transition"
            >
              {/* Left side */}
              <div className="flex items-center gap-3">
                <input type="checkbox" className="w-5 h-5 accent-indigo-600" />

                <span className="text-black">{task.title}</span>
              </div>

              {/* Delete button */}
              <button
                onClick={() => deleteTask(task._id)}
                className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600 transition"
              >
                Delete
              </button>
            </div>
          ))
        )}
      </div>
    </div>
  );
}

export default Dashboard;
