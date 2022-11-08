import { useEffect }from 'react'
import { useTasksContext } from "../hooks/useTasksContext"
import { useAuthContext } from "../hooks/useAuthContext"

// components
import TaskDetails from '../components/TaskDetails'
import TaskForm from '../components/TaskForm'
const Home = () => {
  const {tasks, dispatch} = useTasksContext()
  const {user} = useAuthContext()
  const serverURL = process.env.PROD ? "www.google.com" : "http://127.0.0.1:5000"

  useEffect(() => {
    const fetchTasks = async () => {
      const response = await fetch(`${serverURL}/api/tasks`, {
        headers: {'Authorization': `Bearer ${user.token}`},
      })
      const json = await response.json()

      if (response.ok) {
        dispatch({type: 'SET_TASKS', payload: json})
      }
    }

    if (user) {
      fetchTasks()
    }
  }, [dispatch, user, serverURL])

  return (
    <div className="home">
      <div className="tasks">
        {tasks && tasks.length > 0
        ? tasks.map((task) => (
          <TaskDetails key={task._id} task={task} />
        ))
        : <p>No tasks left, Add some tasks to track now!</p>
        }
      </div>
      <TaskForm />
    </div>
  )
}

export default Home