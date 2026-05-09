const { z } = require("zod");

const objectId = z.string().regex(/^[a-fA-F0-9]{24}$/, "Invalid id");

const createTaskSchema = z.object({
  body: z.object({
    title: z.string().min(2),
    description: z.string().optional(),
    priority: z.enum(["low", "medium", "high"]).optional(),
    status: z.enum(["todo", "in_progress", "done"]).optional(),
    dueDate: z.string().datetime().optional(),
    assignedTo: objectId,
    projectId: objectId,
  }),
});

const updateTaskSchema = z.object({
  params: z.object({ id: objectId }),
  body: z.object({
    title: z.string().min(2).optional(),
    description: z.string().optional(),
    priority: z.enum(["low", "medium", "high"]).optional(),
    dueDate: z.string().datetime().optional(),
    assignedTo: objectId.optional(),
  }),
});

const updateTaskStatusSchema = z.object({
  params: z.object({ id: objectId }),
  body: z.object({ status: z.enum(["todo", "in_progress", "done"]) }),
});

module.exports = { createTaskSchema, updateTaskSchema, updateTaskStatusSchema };
