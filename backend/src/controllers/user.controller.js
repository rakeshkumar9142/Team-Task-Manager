const User = require("../models/user.model");
const catchAsync = require("../utils/catchAsync");

const getUsers = catchAsync(async (_req, res) => {
  const users = await User.find().select("name email role");
  res.status(200).json({ success: true, data: users });
});

module.exports = { getUsers };
