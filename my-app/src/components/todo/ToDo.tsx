import { useState, useEffect } from "react";
import axios from "axios";
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer, toast } from "react-toastify";
type Task = {
  _id: string;
  text: string;
  UserId: string;
  completed: boolean;
};

type CreateTaskResponse = {
  message: string;
  task: Task;
  completed: boolean;
  
};
function ToDo() {
  const [taskInput, setTaskInput] = useState(""); // for new task
  const [newtasks, setNewTasks] = useState<{ id: string; text: string,completed:boolean }[]>([]);
  const [editingTaskId, setEditingTaskId] = useState<string | null>(null); // currently editing
  const [editText, setEditText] = useState(""); // text in the edit box

  

  // Fetch tasks from backend
  const fetchTasks = async () => {
    try {
      const response = await axios.get<{ tasks: Task[] }>(
        `${import.meta.env.VITE_API_URL}/api/Tasks`,
        { withCredentials: true }
      );
      setNewTasks(response.data.tasks.map((task) => ({ id: task._id, text: task.text,completed:task.completed }))
    .reverse());
    } catch (error) {
      console.error("Error fetching tasks:", error);
    }
  };

  useEffect(() => {
    fetchTasks();
  }, []);

  // Add new task
  const addTask = async () => {
    if (taskInput.trim() === "") return;
    try {
    await axios.post<CreateTaskResponse>(
        `${import.meta.env.VITE_API_URL}/api/Tasks`,
        { text: taskInput },
        { withCredentials: true }
      );
      
      
  
   
      setTaskInput("");
      fetchTasks();
    } catch (error) {
      console.error("Error adding task:", error);
    }
  };

  // Delete task
  const deleteTask = async (id: string) => {
    try{
      await axios.delete(`${import.meta.env.VITE_API_URL}/api/Tasks/${id}`, { withCredentials: true });
    setNewTasks(newtasks.filter((task) => task.id !== id));}
    catch(error){
      console.error("Error deleting task:", error);
    }
  };

  // Update task
  const updateTask = async () => {
    if (!editingTaskId) return;

    try {
      await axios.put(
        `${import.meta.env.VITE_API_URL}/api/UpdateTasks/${editingTaskId}`,
        { text: editText },
        { withCredentials: true }
      );
      setNewTasks(
        newtasks.map((task) =>
          task.id === editingTaskId ? { ...task, text: editText } : task
        )
      );
      setEditingTaskId(null);
      setEditText("");
    } catch (error) {
      console.error("Error updating task:", error);
    }
  };



  const toggleTask = async (id: string) => {
    try {
      const response = await axios.put<Task>(
        `${import.meta.env.VITE_API_URL}/api/Tasks/toggle/${id}`,
        {},
        { withCredentials: true }
      );
  
      // Update UI
      setNewTasks((prev) =>
        prev.map((task) =>
          task.id === id ? { ...task, completed: response.data.completed } : task
        )
      );
    } catch (error) {
      console.error("Error toggling task:", error);
    }
  };
  

  return (
    <div className="w-screen h-screen border rounded-2xl bg-gradient-to-r from-gray-900 via-gray-800 to-gray-700 p-6">
      {/* Input for new task */}
      <div className="w-full max-w-md h-auto rounded-2xl flex justify-center items-center shadow-xl p-6 bg-gradient-to-b from-gray-800 via-gray-700 to-gray-600 mt-10 mx-auto">
        <input
          type="text"
          placeholder="Add your new todo"
          value={taskInput}
          onChange={(e) => setTaskInput(e.target.value)}
          className="border w-full h-10 rounded-2xl p-7 text-black"
        />
        <button
          onClick={()=>{addTask();
          toast.success("Task added successfully!");
          }}
          className="ml-4 px-7 h-10 cursor-pointer transition-all duration-300 ease-in-out transform hover:scale-110 bg-blue-500 text-white rounded-xl"
        >
          Submit
        </button>
      </div>

      {/* Task list */}
      <div className="w-full max-w-2xl h-[400px] rounded-2xl shadow-xl p-6 bg-gradient-to-b from-gray-800 via-gray-700 to-gray-600 mt-10 mx-auto text-center overflow-y-auto">
        <ul>
          {newtasks.map((task) => (
            <li
              key={task.id}
              className="border-b border-gray-400 py-4 flex items-center justify-between gap-4"
            >
              {editingTaskId === task.id ? (
                <>
                  {/* Editing input box */}
                  <input
                    type="text"
                    value={editText}
                    onChange={(e) => setEditText(e.target.value)}
                    className="border rounded-xl px-2 py-1 flex-1"
                  />
                  <button
                    onClick={()=>{updateTask();
                    toast.success("Task updated successfully!");
                    }}
                    className="px-4 py-2 bg-green-500 text-white rounded-xl"
                  >
                    Update
                  </button>
                  <button
                    onClick={() =>{ setEditingTaskId(null)
                      toast.info("Edit cancelled.");
                    }}
                    className="px-4 py-2 bg-gray-500 text-white rounded-xl"
                  >
                    Cancel
                  </button>
                </>
              ) : (
                <>
                   <span
                   onClick={() => toggleTask(task.id)} 
                    className={`break-words max-w-[60%] cursor-pointer text-left, ${
                     task.completed ? "line-through text-gray-400" : ""
                       }`}
                                  >
                                     {task.text}
                                                        </span>
                  <div className="flex gap-2">
                    <button
                      onClick={() => {
                        setEditingTaskId(task.id);
                        setEditText(task.text);
                        toast.info("You can now edit the task.");
                      }}
                      className="px-4 py-2 bg-yellow-500 text-white rounded-2xl"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => {
                        deleteTask(task.id)
                        toast.success("Task deleted successfully!");
                      }}
                      className="px-4 py-2 bg-red-500 text-white rounded-xl"
                     
                    > 
                      Delete
                    </button>
                  </div>
                </>
              )}
            </li>
          ))}
        </ul>
      </div>
      <ToastContainer />
    </div>
  );
}

export default ToDo;
