export const addTask = async(taskName:string) => {
    const response = await fetch("http://localhost:3901/api/task", {
        method: 'POST',
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({name: taskName})
    });
    if (!response.ok) {
        throw new Error("Failed to add task");
      }
    
        return response.json();
};