const mongoose = require("mongoose");

const taskSchema = new mongoose.Schema({
  title: {
    type: String,
    require: [true, "please enter your task title"],
  },
  description: {
    type: String,
    require: [true, "please enter your task description"],
  },
  isCompleted: {
    type: Boolean,
    default: false,
  },
  dueDate: {
    type: Date,
    default: "10/02/2024",
  },
});

const Task = mongoose.model("Task", taskSchema);

module.exports = Task;
