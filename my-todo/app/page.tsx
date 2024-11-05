"use client";
import Tasks from "./_components/Tasks";

export default function Home() {
  return (
    <div className="w-screen bg-gray-100 p-10 flex flex-col items-center">
      <div className="w-screen text-center p-5">
        <h1 className="text-3xl font-bold">TaskMate</h1>
      </div>
      <div className="flex flex-col items-center w-fit bg-slate-50 p-5 rounded-lg max-w-96">
        <Tasks />
      </div>
    </div>
  );
}
