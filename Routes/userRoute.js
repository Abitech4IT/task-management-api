const express = require("express");
const router = express.Router();

const authController = require("../Controller/authController");
const userController = require("../Controller/userController");

router.post("/signUp", authController.signUp);
router.post("/login", authController.login);

router.get("/", userController.getAllUser);

module.exports = router;
