const User = require("../models/user.model");
const ApiError = require("../utils/apiError");
const catchAsync = require("../utils/catchAsync");
const { signToken } = require("../utils/jwt");

const register = catchAsync(async (req, res) => {
  const { name, email, password, role } = req.body;

  const existingUser = await User.findOne({ email });
  if (existingUser) throw new ApiError(409, "User already exists");

  const user = await User.create({ name, email, password, role });
  const token = signToken({ id: user._id, role: user.role });

  res.status(201).json({
    success: true,
    token,
    user: { id: user._id, name: user.name, email: user.email, role: user.role },
  });
});

const login = catchAsync(async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });

  if (!user || !(await user.comparePassword(password))) {
    throw new ApiError(401, "Invalid email or password");
  }

  const token = signToken({ id: user._id, role: user.role });

  res.status(200).json({
    success: true,
    token,
    user: { id: user._id, name: user.name, email: user.email, role: user.role },
  });
});

module.exports = { register, login };
