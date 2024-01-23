const express = require("express");

const taskController = require("../Controller/taskController");
const authController = require("../Controller/authController");

const router = express.Router();

router.post("/", authController.protect, taskController.createTask);
router.get("/", authController.protect, taskController.getAllTasks);
router.get("/:id", authController.protect, taskController.getTask);
router.put("/:id", authController.protect, taskController.UpdateTask);
router.patch(
  "/:id/status",
  authController.protect,
  taskController.UpdateTaskStatus
);
router.delete("/:id", authController.protect, taskController.deleteTask);

module.exports = router;
