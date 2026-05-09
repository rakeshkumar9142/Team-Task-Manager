const ApiError = require("../utils/apiError");

const validate = (schema) => (req, _res, next) => {
  const result = schema.safeParse({
    body: req.body,
    params: req.params,
    query: req.query,
  });

  if (!result.success) {
    const issues = result.error.issues.map((issue) => issue.message).join(", ");
    throw new ApiError(400, issues);
  }

  next();
};

module.exports = { validate };
