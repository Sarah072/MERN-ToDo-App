const Task = require('../models/task');

const getAllTasks = async (req, res) => {
  try {
    const Tasks = await Task.find();
    res.json(Tasks);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const deleteTask = async (req, res) => {
    const taskNameToDelete = req.body.task; 
  
    try {
    
      const deletedTask = await Task.findOneAndDelete({ task: taskNameToDelete });
  
      if (!deletedTask) {
        return res.status(404).json({ message: "Task not found" });
      }
  
      res.json({ message: "Task deleted successfully" });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  };
  

const createTask = async (req, res) => {
    console.log(req.body.task,req.body.completed);

  const task = new Task({
    task: req.body.task,
    completed: req.body.completed,
    completedTime: req.body.completed ? new Date() : null

  });
  try {
    const newTask = await task.save();
    res.status(201).json(newTask);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};
const updateTask = async (req, res) => {
  const taskNameToUpdate = req.body.task;
  const completedValue = req.body.completed;
  console.log(req.body.completed);

  try {
    let task = await Task.findOne({ task: taskNameToUpdate });

    if (!task) {
      return res.status(404).json({ message: "Task not found" });
    }

    task.completed = completedValue;
   
    if (!task.creationTime) {
      task.creationTime = Date.now;
    }

    task.completedTime = completedValue ? new Date() : null;

    const updatedTask = await task.save();

    res.json({ message: "Task updated successfully", updatedTask });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};


module.exports = {
  getAllTasks,
  createTask,
  deleteTask,
  updateTask,
};
