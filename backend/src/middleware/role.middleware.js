const ApiError = require("../utils/apiError");

const authorize = (...allowedRoles) => (req, _res, next) => {
  if (!req.user || !allowedRoles.includes(req.user.role)) {
    throw new ApiError(403, "You do not have permission for this action");
  }
  next();
};

module.exports = { authorize };
