const Task = require("../models/Task");
const ApiError = require("../utils/ApiError");

/* =============================
   CREATE TASK
============================= */
exports.createTask = async (req, res, next) => {
  try {
    const { title, description } = req.body;

    if (!title) {
      return next(new ApiError(400, "Title is required"));
    }

    const task = await Task.create({
      title,
      description,
      user: req.user._id,
    });

    res.status(201).json({
      status: "success",
      data: task,
    });
  } catch (error) {
    next(error);
  }
};

/* =============================
   GET TASKS
============================= */
exports.getTasks = async (req, res, next) => {
  try {
    const tasks = await Task.find({ user: req.user._id });

    res.status(200).json({
      status: "success",
      results: tasks.length,
      data: tasks,
    });
  } catch (error) {
    next(error);
  }
};

/* =============================
   UPDATE TASK
============================= */
exports.updateTask = async (req, res, next) => {
  try {
    const task = await Task.findById(req.params.id);

    if (!task) {
      return next(new ApiError(404, "Task not found"));
    }

    if (task.user.toString() !== req.user._id.toString()) {
      return next(new ApiError(403, "Not authorized to modify this task"));
    }

    task.title = req.body.title || task.title;
    task.description = req.body.description || task.description;
    task.status = req.body.status || task.status;

    const updatedTask = await task.save();

    res.status(200).json({
      status: "success",
      data: updatedTask,
    });
  } catch (error) {
    next(error);
  }
};

/* =============================
   DELETE TASK
============================= */
exports.deleteTask = async (req, res, next) => {
  try {
    const task = await Task.findById(req.params.id);

    if (!task) {
      return next(new ApiError(404, "Task not found"));
    }

    if (task.user.toString() !== req.user._id.toString()) {
      return next(new ApiError(403, "Not authorized to delete this task"));
    }

    await task.deleteOne();

    res.status(200).json({
      status: "success",
      message: "Task deleted successfully",
    });
  } catch (error) {
    next(error);
  }
};
