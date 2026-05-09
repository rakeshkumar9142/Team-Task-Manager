const Project = require("../models/project.model");
const Task = require("../models/task.model");
const ApiError = require("../utils/apiError");
const catchAsync = require("../utils/catchAsync");

const checkProjectAccess = async (projectId, userId) => {
  const project = await Project.findById(projectId);
  if (!project) throw new ApiError(404, "Project not found");
  const isMember =
    project.createdBy.toString() === userId.toString() ||
    project.teamMembers.map((m) => m.toString()).includes(userId.toString());
  if (!isMember) throw new ApiError(403, "Forbidden");
  return project;
};

const createTask = catchAsync(async (req, res) => {
  await checkProjectAccess(req.body.projectId, req.user._id);

  const task = await Task.create({
    ...req.body,
    dueDate: req.body.dueDate ? new Date(req.body.dueDate) : undefined,
    createdBy: req.user._id,
  });

  const populatedTask = await task.populate("assignedTo", "name email role");
  res.status(201).json({ success: true, data: populatedTask });
});

const getProjectTasks = catchAsync(async (req, res) => {
  await checkProjectAccess(req.params.id, req.user._id);
  const tasks = await Task.find({ projectId: req.params.id })
    .populate("assignedTo", "name email role")
    .populate("createdBy", "name email");
  res.status(200).json({ success: true, data: tasks });
});

const updateTask = catchAsync(async (req, res) => {
  const task = await Task.findById(req.params.id);
  if (!task) throw new ApiError(404, "Task not found");
  await checkProjectAccess(task.projectId, req.user._id);

  Object.assign(task, req.body);
  if (req.body.dueDate) task.dueDate = new Date(req.body.dueDate);
  await task.save();
  await task.populate("assignedTo", "name email role");

  res.status(200).json({ success: true, data: task });
});

const updateTaskStatus = catchAsync(async (req, res) => {
  const task = await Task.findById(req.params.id);
  if (!task) throw new ApiError(404, "Task not found");
  await checkProjectAccess(task.projectId, req.user._id);
  task.status = req.body.status;
  await task.save();
  res.status(200).json({ success: true, data: task });
});

const deleteTask = catchAsync(async (req, res) => {
  const task = await Task.findById(req.params.id);
  if (!task) throw new ApiError(404, "Task not found");
  await checkProjectAccess(task.projectId, req.user._id);
  await task.deleteOne();
  res.status(200).json({ success: true, message: "Task deleted successfully" });
});

module.exports = { createTask, getProjectTasks, updateTask, updateTaskStatus, deleteTask };
