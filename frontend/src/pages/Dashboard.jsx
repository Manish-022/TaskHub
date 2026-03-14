import React, { useEffect, useState } from "react";
import API from "../api/axios";
import { toast } from "react-toastify";

function Dashboard() {
  const [tasks, setTasks] = useState([]);
  const [title, setTitle] = useState("");

  const token = localStorage.getItem("token");

  /* =============================
     FETCH TASKS
  ============================= */
  const fetchTasks = async () => {
    try {
      const res = await API.get("/tasks", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      console.log("Tasks:", res.data);

      setTasks(res.data.data); // backend sends tasks in data
    } catch (err) {
      console.log(err);
      toast.error("Failed to fetch tasks");
    }
  };

  useEffect(() => {
    fetchTasks();
  }, []);

  /* =============================
     ADD TASK
  ============================= */
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

      setTasks((prev) => [...prev, res.data.data]); // backend returns data: task

      setTitle("");

      toast.success("Task added successfully");
    } catch (err) {
      console.log(err);
      toast.error("Failed to add task");
    }
  };

  /* =============================
     DELETE TASK
  ============================= */
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

  /* =============================
     UI
  ============================= */
  return (
    <div className="max-w-3xl mx-auto mt-10 bg-gray-50 p-6 rounded-xl shadow">
      <h1 className="text-3xl font-bold mb-6 text-center text-gray-900">
        Task Dashboard
      </h1>

      {/* Add Task */}
      <form onSubmit={addTask} className="flex gap-3 mb-6">
        <input
          type="text"
          placeholder="Enter task..."
          className="border border-gray-300 p-2 flex-1 rounded-lg text-black focus:outline-none focus:ring-2 focus:ring-indigo-500"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />

        <button
          type="submit"
          className="bg-indigo-600 text-white px-4 py-2 rounded-lg hover:bg-indigo-700 transition"
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
              className="flex items-center justify-between bg-white border px-4 py-3 rounded-lg shadow-sm hover:shadow-md transition"
            >
              <div className="flex items-center gap-3">
                <input type="checkbox" className="w-5 h-5 accent-indigo-600" />

                <span className="text-gray-900 font-medium">{task.title}</span>
              </div>

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
