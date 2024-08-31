const express = require('express')
const {
  getTasks,
  getTask,
  CreateTask,
  deleteTask,
  updateTask
} = require('../controllers/taskController')
const requireAuth = require('../middleware/requireAuth')

const router = express.Router()

// require auth for all workout routes
router.use(requireAuth)

// GET all workouts
router.get('/', getTasks)

//GET a single workout
router.get('/:id', getTask)

// POST a new workout
router.post('/', CreateTask)

// DELETE a workout
router.delete('/:id', deleteTask)

// UPDATE a workout
router.patch('/:id', updateTask)


module.exports = router