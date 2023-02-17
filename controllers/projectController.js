const mongoose = require("mongoose"); //is id valid check
const Project = require("../models/projectModels");

//get all projects

const getALLPRoject = async (req, res) => {
  const projects = await Project.find({}).sort({ createdAt: -1 }); //descending, newly added project on top
  res.status(200).json(projects);
};

//get a single project

const getSingleProject = async (req, res) => {
  const { id } = req.params;

  //is id valid check
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ error: "Invalide id" });
  }

  const project = await Project.findById(id);

  if (!project) {
    return res.status(404).json({ error: "No project found" });
  }

  res.status(200).json(project);
};

//post a new project
const postProject = async (req, res) => {
  const data = req.body;
  try {
    const project = await Project.create({
      ...data,
    });
    res.status(200).json(project);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

//delete a project

const deleteProject = async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ error: "Invalid id" });
  }

  const project = await Project.findByIdAndDelete({ _id: id });
  if (!project) {
    return res.status(400).json({ error: "No project found" });
  }

  res.status(200).json(project);
};

//update a project

const updateProject = async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ error: "Invalid id" });
  }

  const project = await Project.findOneAndUpdate({ _id: id }, { ...req.body });
  if (!project) {
    return res.status(400).json({ error: "No project found" });
  }

  res.status(200).json(project);
};

module.exports = {
  postProject,
  getALLPRoject,
  getSingleProject,
  deleteProject,
  updateProject,
};
