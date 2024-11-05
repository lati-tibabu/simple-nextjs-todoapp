"use client";

import { useEffect, useState } from "react";
import { AiOutlineDelete, AiOutlineEdit } from "react-icons/ai";

interface Task {
  task_id: number;
  name: string;
}

const TaskList = () => {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const fetchTasks = async () => {
    setLoading(true);
    setError(null); // Reset error state before fetching
    try {
      const response = await fetch("http://localhost:3901/api/task", {
        cache: "no-store",
      });
      if (!response.ok) throw new Error("Failed to fetch tasks");
      const data = await response.json();
      setTasks(data);
    } catch (err: unknown) {
      // Specify the type of err as unknown
      if (err instanceof Error) {
        setError(err.message); // Use err.message if err is an instance of Error
      } else {
        setError("An unknown error occurred"); // Handle unexpected error types
      }
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTasks();
  }, []);

  const handleEdit = (task_id: number): void => {
    console.log("Edit task with id:", task_id);
    // Implement your edit logic here
  };

  const handleDelete = async (task_id: number) => {
    if (!window.confirm("Are you sure you want to delete this task?")) return;

    try {
      const response = await fetch(
        `http://localhost:3901/api/task/${task_id}`,
        {
          method: "DELETE",
        }
      );
      if (response.ok) {
        // Optimistically remove the task from the state
        setTasks((prevTasks) =>
          prevTasks.filter((task) => task.task_id !== task_id)
        );
      } else {
        console.error("Deleting error");
      }
    } catch (err: unknown) {
      if (err instanceof Error) {
        console.error("Error deleting task:", err.message);
      } else {
        console.error("Error deleting task: An unknown error occurred");
      }
    }
  };

  if (loading) return <p>Loading tasks...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <div>
      <table className="table">
        <thead>
          <tr className="text-black">
            <th>Tasks</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {/* {tasks.length > 0 */}
          {/* ?  */}
          {tasks.map((task) => (
            <tr key={task.task_id}>
              <td>{task.name}</td>
              <td className="flex flex-row justify-between">
                <button onClick={() => handleEdit(task.task_id)}>
                  <AiOutlineEdit />
                </button>
                <button onClick={() => handleDelete(task.task_id)}>
                  <AiOutlineDelete color="red" />
                </button>
              </td>
            </tr>
          ))}
          {/* : "no tasks"} */}
        </tbody>
      </table>
    </div>
  );
};

export default TaskList;
