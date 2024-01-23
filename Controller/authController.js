const jwt = require("jsonwebtoken");
const { promisify } = require("util");

const User = require("../Model/userModel");
const catchAsyncError = require("../Utils/catchAsycnError");
const ErrorHandler = require("../Utils/ErrorHandler");

const signToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES_IN,
  });
};

exports.signUp = catchAsyncError(async (req, res, next) => {
  try {
    // const newUser = await User.create(req.body);
    const newUser = await User.create({
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      email: req.body.email,
      password: req.body.password,
    });

    const token = signToken(newUser._id);

    res.status(201).json({
      success: true,
      message: "user created successfully",
      token,
      user: newUser,
    });
  } catch (error) {
    return next(new ErrorHandler(error.message, 400));
  }
});

exports.login = catchAsyncError(async (req, res, next) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return next(new ErrorHandler("Please provide email and password", 400));
  }

  const user = await User.findOne({ email }).select("+password");

  if (!user || !(await user.correctPassword(password, user.password))) {
    return next(new ErrorHandler("Incorrect email or password", 401));
  }

  const token = signToken(user._id);
  res.status(200).json({
    success: true,
    token,
  });
});

exports.protect = catchAsyncError(async (req, res, next) => {
  let token;
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    token = req.headers.authorization.split(" ")[1];
  }

  if (!token) {
    return next(
      new ErrorHandler("You are not logged in! pls log in to get access", 401)
    );
  }
  const decoded = await promisify(jwt.verify)(token, process.env.JWT_SECRET);
  const freshUser = await User.findById(decoded.id);

  if (!freshUser) {
    return next(new ErrorHandler("The token user is no longer exist", 401));
  }
  req.user = freshUser;
  next();
});
