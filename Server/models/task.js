const mongoose = require('mongoose');

const taskSchema = new mongoose.Schema({
  task: {
    type: String,
    required: true
  },
  completed: {
    type: Boolean,
    required: true,
   
  },
  completedTime: {
    type: Date,
  },
  creationTime: {
    type: Date,
    default: Date.now
  }
});

taskSchema.pre('save', function(next) {
    if (this.completed && !this.completedTime) {
      this.completedTime = new Date();
    }
    next();
  });

const Task = mongoose.model('Task', taskSchema);

module.exports = Task;
