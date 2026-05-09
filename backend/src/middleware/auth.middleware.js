const jwt = require("jsonwebtoken");
const User = require("../models/user.model");
const ApiError = require("../utils/apiError");
const catchAsync = require("../utils/catchAsync");

const protect = catchAsync(async (req, _res, next) => {
  const authHeader = req.headers.authorization;
  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    throw new ApiError(401, "Authentication token missing");
  }

  const token = authHeader.split(" ")[1];
  const decoded = jwt.verify(token, process.env.JWT_SECRET);
  const user = await User.findById(decoded.id).select("-password");

  if (!user) {
    throw new ApiError(401, "Invalid token");
  }

  req.user = user;
  next();
});

module.exports = { protect };
