const { z } = require("zod");

const objectId = z.string().regex(/^[a-fA-F0-9]{24}$/, "Invalid id");

const createProjectSchema = z.object({
  body: z.object({
    title: z.string().min(2),
    description: z.string().optional(),
  }),
});

const updateProjectSchema = z.object({
  params: z.object({ id: objectId }),
  body: z.object({
    title: z.string().min(2).optional(),
    description: z.string().optional(),
  }),
});

const addMemberSchema = z.object({
  params: z.object({ id: objectId }),
  body: z.object({ memberId: objectId }),
});

module.exports = { createProjectSchema, updateProjectSchema, addMemberSchema };
