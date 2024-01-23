const User = require("../Model/userModel");
const catchAsyncError = require("../Utils/catchAsycnError");
const ErrorHandler = require("../Utils/ErrorHandler");

exports.getAllUser = catchAsyncError(async (req, res, next) => {
  const users = await User.find();

  res.status(200).json({
    success: true,
    message: "users fetched successfully",
    users,
  });
});
