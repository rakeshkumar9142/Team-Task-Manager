const Project = require("../models/project.model");
const Task = require("../models/task.model");
const ApiError = require("../utils/apiError");
const catchAsync = require("../utils/catchAsync");

const createProject = catchAsync(async (req, res) => {
  const project = await Project.create({
    title: req.body.title,
    description: req.body.description || "",
    createdBy: req.user._id,
    teamMembers: [req.user._id],
  });

  res.status(201).json({ success: true, data: project });
});

const getProjects = catchAsync(async (req, res) => {
  const projects = await Project.find({
    $or: [{ createdBy: req.user._id }, { teamMembers: req.user._id }],
  })
    .populate("createdBy", "name email role")
    .populate("teamMembers", "name email role");

  res.status(200).json({ success: true, data: projects });
});

const getProjectById = catchAsync(async (req, res) => {
  const project = await Project.findById(req.params.id)
    .populate("createdBy", "name email role")
    .populate("teamMembers", "name email role");
  if (!project) throw new ApiError(404, "Project not found");

  const hasAccess =
    project.createdBy._id.toString() === req.user._id.toString() ||
    project.teamMembers.some((member) => member._id.toString() === req.user._id.toString());
  if (!hasAccess) throw new ApiError(403, "Forbidden");

  res.status(200).json({ success: true, data: project });
});

const updateProject = catchAsync(async (req, res) => {
  const project = await Project.findById(req.params.id);
  if (!project) throw new ApiError(404, "Project not found");
  if (project.createdBy.toString() !== req.user._id.toString()) {
    throw new ApiError(403, "Only project admin can update this project");
  }

  if (req.body.title) project.title = req.body.title;
  if (req.body.description !== undefined) project.description = req.body.description;
  await project.save();

  res.status(200).json({ success: true, data: project });
});

const deleteProject = catchAsync(async (req, res) => {
  const project = await Project.findById(req.params.id);
  if (!project) throw new ApiError(404, "Project not found");
  if (project.createdBy.toString() !== req.user._id.toString()) {
    throw new ApiError(403, "Only project admin can delete this project");
  }

  await Task.deleteMany({ projectId: project._id });
  await project.deleteOne();

  res.status(200).json({ success: true, message: "Project deleted successfully" });
});

const addMemberToProject = catchAsync(async (req, res) => {
  const { id } = req.params;
  const { memberId } = req.body;
  const project = await Project.findById(id);
  if (!project) throw new ApiError(404, "Project not found");
  if (project.createdBy.toString() !== req.user._id.toString()) {
    throw new ApiError(403, "Only project admin can add members");
  }

  if (!project.teamMembers.map((m) => m.toString()).includes(memberId)) {
    project.teamMembers.push(memberId);
    await project.save();
  }

  await project.populate("teamMembers", "name email role");
  res.status(200).json({ success: true, data: project.teamMembers });
});

const getProjectMembers = catchAsync(async (req, res) => {
  const project = await Project.findById(req.params.id).populate("teamMembers", "name email role");
  if (!project) throw new ApiError(404, "Project not found");

  const hasAccess =
    project.createdBy.toString() === req.user._id.toString() ||
    project.teamMembers.some((member) => member._id.toString() === req.user._id.toString());
  if (!hasAccess) throw new ApiError(403, "Forbidden");

  res.status(200).json({ success: true, data: project.teamMembers });
});

module.exports = {
  createProject,
  getProjects,
  getProjectById,
  updateProject,
  deleteProject,
  addMemberToProject,
  getProjectMembers,
};
