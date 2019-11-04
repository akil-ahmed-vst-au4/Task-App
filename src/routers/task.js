const express = require("express");
const Task = require("../models/task");
const router = new express.Router();

//===========================//
//TASK ROUTES AND OPERATIONS//
//=========================//

//CREATE TASK
router.post("/tasks", async (req, res) => {
  const task = new Task(req.body);

  try {
    await task.save();
    return res.status(201).send(task);
  } catch {
    res.status(400).send(error);
  }
});

//READ TASK
router.get("/tasks", async (req, res) => {
  try {
    const tasks = await Task.find({});
    return res.send(tasks);
  } catch (e) {
    res.status(500).send(e);
  }
});

router.get("/tasks/:id", async (req, res) => {
  const _id = req.params.id;

  try {
    const task = await Task.findById(_id);
    if (!task) {
      return res.status(404).send("there is no task");
    }
    res.send(task);
  } catch (e) {
    res.status(500).send(e);
  }
});

//UPDATE TASK
router.patch("/tasks/:id", async (req, res) => {
  const updates = Object.keys(req.body);
  const allowedUpdates = ["completed", "description"];
  const isValidateOperation = updates.every(update =>
    allowedUpdates.includes(update)
  );

  if (!isValidateOperation) {
    return res.status(400).send({ error: "invalid updates" });
  }

  try {
    const task = await Task.findById(req.params.id);
    updates.forEach(update => (task[update] = req.body[update]));
    await task.save();
    if (!task) {
      return res.status(404).send();
    }
    res.send(task);
  } catch (e) {
    res.status(400).send(e);
  }
});

//DELETE TASK
router.delete("/tasks/:id", async (req, res) => {
  try {
    const task = await Task.findByIdAndDelete(req.params.id);

    if (!task) {
      return res.status(404).send("Task does not exist");
    }
    res.send(task);
  } catch (e) {
    res.status(500).send(e);
  }
});

module.exports = router;
