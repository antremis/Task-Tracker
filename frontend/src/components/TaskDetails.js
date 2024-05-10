import { useTasksContext } from '../hooks/useTasksContext'
import { useAuthContext } from '../hooks/useAuthContext'

// date fns
import formatDistanceToNow from 'date-fns/formatDistanceToNow'

const TaskDetails = ({ task }) => {
  const { dispatch } = useTasksContext()
  const { user } = useAuthContext()
  const serverURL = process.env.PROD ? "https://task-tracker-8ew8.onrender.com" : "http://127.0.0.1:5000"

  const handleClick = async () => {
    if (!user) {
      return
    }

    const response = await fetch(`${serverURL}/api/tasks/` + task._id, {
      method: 'DELETE',
      headers: {
        'Authorization': `Bearer ${user.token}`
      }
    })
    const json = await response.json()

    if (response.ok) {
      dispatch({type: 'DELETE_TASK', payload: json})
    }
  }

  return (
    <div className="task-details">
      <h4>{task.title}</h4>
      <p>{formatDistanceToNow(new Date(task.createdAt), { addSuffix: true })}</p>
      <span className="material-symbols-outlined" onClick={handleClick}>delete</span>
    </div>
  )
}

export default TaskDetails