const catchAsyncError = require("../Utils/catchAsycnError");
const ErrorHandler = require("../Utils/ErrorHandler");
const Task = require("../Model/taskModel");

exports.createTask = catchAsyncError(async (req, res, next) => {
  try {
    const task = new Task(req.body);
    await task.save();
    res.status(201).json({
      success: true,
      message: "Task created successfully",
      task,
    });
  } catch (error) {
    return next(new ErrorHandler(error.message, 400));
  }
});

exports.getAllTasks = catchAsyncError(async (req, res, next) => {
  try {
    const tasks = await Task.find();

    res.status(200).json({
      success: true,
      results: tasks.length,
      message: "Tasks retrieved succeddfully",
      tasks,
    });
  } catch (error) {
    return next(new ErrorHandler(error.message, 404));
  }
});

exports.getTask = catchAsyncError(async (req, res, next) => {
  try {
    const id = req.params.id;

    const task = await Task.findById(id);

    res.status(200).json({
      success: true,
      message: "task retrieved successfully",
      task,
    });
  } catch (error) {
    return next(new ErrorHandler(error.messages, 404));
  }
});

exports.UpdateTask = catchAsyncError(async (req, res, next) => {
  try {
    const id = req.params.id;

    if (!id) {
      return res.status(404).json({
        success: false,
        message: "task not found",
      });
    }

    const { title, description, isCompleted, dueDate } = req.body;

    const updatedTask = {};
    if (title) updatedTask.title = title;
    if (description) updatedTask.description = description;
    if (dueDate) updatedTask.dueDate = dueDate;
    if (isCompleted) updatedTask.isCompleted = isCompleted;

    const task = await Task.findByIdAndUpdate(id, updatedTask, {
      new: true,
      runValidators: true,
    });

    res.status(200).json({
      success: true,
      message: "task Updated successfully",
      task,
    });
  } catch (error) {
    return next(new ErrorHandler(error.messages, 400));
  }
});

exports.UpdateTaskStatus = catchAsyncError(async (req, res, next) => {
  try {
    const id = req.params.id;

    if (!id) {
      return res.status(404).json({
        success: false,
        message: "task not found",
      });
    }

    const task = await Task.findByIdAndUpdate(id, req.body, { new: true });

    res.status(200).json({
      success: true,
      message: "task Updated successfully",
      task,
    });
  } catch (error) {
    return next(new ErrorHandler(error.messages, 400));
  }
});

exports.deleteTask = catchAsyncError(async (req, res, next) => {
  try {
    const id = req.params.id;

    if (!id) {
      return res.status(404).json({
        success: false,
        message: "task not found",
      });
    }

    await Task.findByIdAndDelete(id);

    res.status(204).json({
      success: true,
      message: "task Deleted successfully",
    });
  } catch (error) {
    return next(new ErrorHandler(error.messages, 400));
  }
});
