const mongoose = require("mongoose");
const validator = require("validator");
const bcrypt = require("bcryptjs");

const userSchema = new mongoose.Schema({
  firstName: {
    type: String,
    require: [true, "please enter your firstName"],
  },
  lastName: {
    type: String,
    require: [true, "please enter your lastName"],
  },
  email: {
    type: String,
    require: [true, "please enter your email"],
    unique: true,
    lowercase: true,
    validate: [validator.isEmail, "please enter a valid email"],
  },
  password: {
    type: String,
    require: [true, "please enter your password"],
    minLength: 8,
    select: false,
  },
});

userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return next();
  this.password = await bcrypt.hash(this.password, 12);
  next();
});

userSchema.methods.correctPassword = async function (
  candidatePassword,
  userPassword
) {
  return await bcrypt.compare(candidatePassword, userPassword);
};

const User = mongoose.model("User", userSchema);

module.exports = User;
