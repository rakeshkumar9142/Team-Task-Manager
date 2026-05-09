const express = require("express");
const {
  createTask,
  updateTask,
  updateTaskStatus,
  deleteTask,
} = require("../controllers/task.controller");
const { protect } = require("../middleware/auth.middleware");
const { validate } = require("../middleware/validate.middleware");
const {
  createTaskSchema,
  updateTaskSchema,
  updateTaskStatusSchema,
} = require("../validations/task.validation");

const router = express.Router();

router.use(protect);
router.post("/", validate(createTaskSchema), createTask);
router.put("/:id", validate(updateTaskSchema), updateTask);
router.patch("/:id/status", validate(updateTaskStatusSchema), updateTaskStatus);
router.delete("/:id", deleteTask);

module.exports = router;
