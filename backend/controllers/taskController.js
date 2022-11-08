const Task = require('../models/taskModel')
const mongoose = require('mongoose')

// get all workouts
const getTasks = async (req, res) => {
  const user_id = req.user._id

  const tasks = await Task.find({user_id}).sort({createdAt: -1})

  res.status(200).json(tasks)
}

// get a single workout
const getTask = async (req, res) => {
  const { id } = req.params

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({error: 'No such task'})
  }

  const task = await Task.findById(id)

  if (!task) {
    return res.status(404).json({error: 'No such task'})
  }
  
  res.status(200).json(task)
}


// create new workout
const CreateTask = async (req, res) => {
  const {title} = req.body

  let emptyFields = []

  if(!title) {
    emptyFields.push('title')
  }

  if(emptyFields.length > 0) {
    return res.status(400).json({ error: 'Please fill in all the fields', emptyFields })
  }

  // add doc to db
  try {
    const user_id = req.user._id
    const task = await Task.create({title, user_id})
    res.status(200).json(task)
  } catch (error) {
    res.status(400).json({error: error.message})
  }
}

// delete a workout
const deleteTask = async (req, res) => {
  const { id } = req.params

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({error: 'No such task'})
  }

  const task = await Task.findOneAndDelete({_id: id})

  if (!task) {
    return res.status(400).json({error: 'No such task'})
  }

  res.status(200).json(task)
}

// update a workout
const updateTask = async (req, res) => {
  const { id } = req.params

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({error: 'No such task'})
  }

  const task = await Task.findOneAndUpdate({_id: id}, {
    ...req.body
  })

  if (!task) {
    return res.status(400).json({error: 'No such task'})
  }

  res.status(200).json(task)
}


module.exports = {
  getTasks,
  getTask,
  CreateTask,
  deleteTask,
  updateTask
}