const express = require("express");
const Project = require("../models/projectModels");

//router
const router = express.Router();
//routes
router.get("/", (req, res) => {
  res.json({ message: "GET ALL PROJECTS" });
});
//GET a single project
router.get("/:id", (req, res) => {
  res.json({ message: "GET a single project" });
});
//post
router.post("/", async (req, res) => {
  const data = req.body;
  try {
    const project = await Project.create({
      ...data,
    });
    res.status(200).json(project);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

//delete
router.delete("/:id", (req, res) => {
  res.json({ message: "DELETE a PROJECTS" });
});
//update

router.patch("/:id", (req, res) => {
  res.json({ message: "PATCh a PROJECTS" });
});

module.exports = router;
