import { useEffect, useState } from 'react'
import addIcon from '../../assets/media/icons/add.svg'
import trashIcon from '../../assets/media/icons/trash.svg'
import boxCheckedIcon from '../../assets/media/icons/boxChecked.svg'
import style from './task.module.scss'


const Main = () => {
  const [inputValue, setInputValue] = useState("")
  const [tasks, setTasks] = useState([])
  const [isDone, setIsDone] = useState(false)
  const [list, setList] = useState(tasks)
  const [message, setMessage] = useState("")

  const addTask = (e) => {
    e.preventDefault()
    let id = tasks.length > 0 ? (tasks[tasks.length - 1].id + 1) : 1


    if (inputValue.length === 0) {
      setMessage("Enter task")
    } else {
      setTasks([...tasks, {
        "id": id,
        "name": inputValue,
        "isDone": isDone
      }])
      setMessage("")
      setInputValue("")
    }

  }

  const handelStatus = (id) => {
    const newStatus = tasks.map(task => {

      if (task.id === id) {
        let newStatus = !task.isDone
        return { ...task, isDone: newStatus };
      }
      return task
    })
    setTasks(newStatus)
  }

  const deleteAllDone = () => {

    const tasksToDelete = tasks.filter((task) => {
      return task.isDone === false;
    });
    setTasks(tasksToDelete)

  }
  const checkAll = () => {
    const newStatus = tasks.map(task => {
      let newStatus = true

      return { ...task, isDone: newStatus };
    })
    setTasks(newStatus)
  }
  useEffect(() => {
    setList(tasks)
  }, [tasks])

  useEffect(() => {

  }, [message])

  
  return (
    <>
      <form onSubmit={e => addTask(e)}>
        <input type="text" onChange={event => setInputValue(event.target.value)} value={inputValue} />
        <button type="submit"><img src={addIcon} width={20} alt="" /></button>
        <p style={{ color: "red" }}>{message}</p>
      </form>

      <ul>
        {(list.length !== 0 ? list.map((task, i) => {
          return (
            <li
              key={i}
              value={task.id}
            > <button onClick={() => { handelStatus(task.id) }} className={`${style.taskBtn} ${task.isDone === true ? style.taskboxChecked : style.taskbox} `}>

              </button >
              <p className={`${style.task} ${task.isDone === true ? style.taskIsDone : ""} `}>{task.name}</p></li>
          )
        }) : "No hay tareas"
        )}

      </ul>

      <button onClick={deleteAllDone}>
        <img src={trashIcon} alt="Delete done tasks" /> Delete done
      </button>
      <button onClick={checkAll}>
        <img src={boxCheckedIcon} alt="Check all tasks" />Check all Tasks
      </button>
    </>
  )
}

export default Main