const Task = require("../models/task.model");
const Project = require("../models/project.model");
const catchAsync = require("../utils/catchAsync");

const getDashboardStats = catchAsync(async (req, res) => {
  const projects = await Project.find({
    $or: [{ createdBy: req.user._id }, { teamMembers: req.user._id }],
  }).select("_id");

  const projectIds = projects.map((project) => project._id);
  const tasks = await Task.find({ projectId: { $in: projectIds } })
    .sort({ updatedAt: -1 })
    .populate("assignedTo", "name")
    .limit(10);

  const now = new Date();
  const totalTasks = tasks.length
    ? await Task.countDocuments({ projectId: { $in: projectIds } })
    : 0;
  const completedTasks = await Task.countDocuments({ projectId: { $in: projectIds }, status: "done" });
  const pendingTasks = await Task.countDocuments({
    projectId: { $in: projectIds },
    status: { $in: ["todo", "in_progress"] },
  });
  const overdueTasks = await Task.countDocuments({
    projectId: { $in: projectIds },
    dueDate: { $lt: now },
    status: { $ne: "done" },
  });

  const recentActivity = tasks.map((task) => ({
    id: task._id,
    action: `Task "${task.title}" is ${task.status.replace("_", " ")}`,
    assignedTo: task.assignedTo?.name || "Unassigned",
    updatedAt: task.updatedAt,
  }));

  res.status(200).json({
    success: true,
    data: { totalTasks, completedTasks, pendingTasks, overdueTasks, recentActivity },
  });
});

module.exports = { getDashboardStats };
