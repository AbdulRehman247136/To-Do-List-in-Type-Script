import {Router,Request,Response} from 'express';
import ToDoTasks from '../schema/TasksSchema';
import { text } from 'stream/consumers';
import { AuthRequest } from '../middleware/AuthMiddleWare';



export const createTask = async (req: AuthRequest, res: Response) => {
    try {
      const { text, UserId } = req.body;
  
      if (!text) {
        return res.status(400).json({ message: "Task text is required" });
      }
  
      const newTask = new ToDoTasks({
        text,
        UserId:req.user.id,
      });

      const savedTask = await newTask.save();
      
      // return only the saved task
      res.status(201).json(savedTask);

    } catch (err) {
      console.error(err);
      res.status(500).json({ message: "Server Error" });
    }
  };
  /// to show the tasks on the front end
  
  export const gettasks = async (req: AuthRequest, res: Response) => {
    try {
      const tasks = await ToDoTasks.find({ UserId: req.user.id });
      res.status(200).json({ tasks });
    } catch (err) {
      console.error(err);
      res.status(500).json({ message: "Server Error" });
    }
  }

  export const deletetask = async (req: AuthRequest, res: Response) => {
    try{
      const taskId = req.params.id;
      const task = await ToDoTasks.findOneAndDelete({ _id: taskId, UserId: req.user.id });
      if (!task) {
        return res.status(404).json({ message: "Task not found " });
      }
      res.status(200).json({ message: "Task deleted successfully" });
    }
    catch(err){
      console.error(err);
      res.status(500).json({ message: "Server Error" });
    }
  }



  export const updatetask = async (req: AuthRequest, res: Response) => {

    try {
      const taskId = req.params.id;
      const { text } = req.body;
  
      if (!text) {
        return res.status(400).json({ message: "Task text is required" });
      }
  
      const task = await ToDoTasks.findOneAndUpdate(
        { _id: taskId, UserId: req.user.id },
        { text },
        { new: true }
      );
  
      if (!task) {
        return res.status(404).json({ message: "Task not found" });
      }
  
      res.status(200).json({ message: "Task updated successfully", task });
    } catch (err) {
      console.error(err);
      res.status(500).json({ message: "Server Error" });
    }
  }