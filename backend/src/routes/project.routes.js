const express = require("express");
const {
  createProject,
  getProjects,
  getProjectById,
  updateProject,
  deleteProject,
  addMemberToProject,
  getProjectMembers,
} = require("../controllers/project.controller");
const { getProjectTasks } = require("../controllers/task.controller");
const { protect } = require("../middleware/auth.middleware");
const { validate } = require("../middleware/validate.middleware");
const {
  createProjectSchema,
  updateProjectSchema,
  addMemberSchema,
} = require("../validations/project.validation");

const router = express.Router();

router.use(protect);
router.post("/", validate(createProjectSchema), createProject);
router.get("/", getProjects);
router.get("/:id", getProjectById);
router.put("/:id", validate(updateProjectSchema), updateProject);
router.delete("/:id", deleteProject);
router.post("/:id/members", validate(addMemberSchema), addMemberToProject);
router.get("/:id/members", getProjectMembers);
router.get("/:id/tasks", getProjectTasks);

module.exports = router;
