"use client";

import { AiOutlinePlus, AiOutlineRotateLeft } from "react-icons/ai";
import TaskList from "./TaskList";
import CreateTaskModal from "./CreateTaskModal";
import { FormEventHandler, useState } from "react";
import { useRouter } from "next/navigation";
import { addTask } from "../api/tasksAPI";

const Tasks = () => {
  const router = useRouter();
  const [modalOpen, setModalOpen] = useState<boolean>(false);
  const [newTask, setNewTask] = useState<string>("");

  const handleAddTask: FormEventHandler<HTMLFormElement> = async (event) => {
    event.preventDefault();
    console.log(newTask);
    addTask(newTask);
    setModalOpen(false);
    setNewTask("");
    router.refresh();
  };

  return (
    <div>
      <h2 className="text-2xl font-bold">Tasks</h2>
      <div className="flex flex-row justify-between">
        <button
          onClick={() => setModalOpen(true)}
          className="btn btn-primary text-white"
        >
          Add Task
          <AiOutlinePlus size={20} />
        </button>
        <button
          className="btn btn-success text-white"
          onClick={() => router.refresh()}
        >
          Refresh
          <AiOutlineRotateLeft />
        </button>
      </div>
      <div className="overflow-x-auto mt-10">
        <TaskList />
      </div>
      <CreateTaskModal
        modalOpen={modalOpen}
        setModalOpen={() => setModalOpen(!modalOpen)}
      >
        <form onSubmit={handleAddTask}>
          <h3 className="font-bold text-xl">Add new Task</h3>
          <div className="modal-action">
            <input
              value={newTask}
              onChange={(event) => setNewTask(event.target.value)}
              type="text"
              placeholder="Type here"
              className="input input-bordered w-full bg-transparent border-black"
            />
            <button type="submit" className="btn">
              Add
            </button>
          </div>
        </form>
      </CreateTaskModal>
    </div>
  );
};

export default Tasks;
