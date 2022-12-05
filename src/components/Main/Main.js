import { useState, useEffect } from 'react'
import TaskInput from '../TaskInput/TaskInput'
import Button from "../Button/Button"
import InputField from '../InputField/InputField'
import addIcon from '../../assets/media/icons/add.svg'
import trashIcon from '../../assets/media/icons/trash.svg'
import boxCheckedIcon from '../../assets/media/icons/boxChecked.svg'
import style from './main.module.scss'

const Main = () => {
    const [value, setValue] = useState("")
    const [tasks, setTasks] = useState([])
    const [message, setMessage] = useState("")
    const [messageVisible, setMessageVisible] = useState(false)

    const addNewTask = (e) => {
        if (e) e.preventDefault();
        if (value.length === 0) {
            setMessage("Enter task")
            setMessageVisible(true)
            setTimeout(() => {
                setMessageVisible(false)
            }, 3000);

        } else {
            const id = tasks.length > 0 ? (tasks[tasks.length - 1].id + 1) : 1
            setTasks([...tasks, {
                id: id,
                name: value,
                isChecked: false
            }])
        }
        setValue("")
    }
    const editTask = (event, changeName, id) => {
        if (event.key === "Enter") {
            const newName = tasks.map(task => {
                if (task.id === id) {
                    let newName = changeName
                    return { ...task, name: newName }
                }
                return task
            })
            setTasks(newName)
        }
    }
    const deleteOne = (event, id) => {
        const tasksToLeave = tasks.filter((task) => {

            return task.id !== id;
        });
        console.log(tasksToLeave);

        setTasks(tasksToLeave)
    }

    const deleteAllDone = () => {
        const tasksToDelete = tasks.filter((task) => {
            return task.isChecked === false;
        });
        setTasks(tasksToDelete)

    }
    const checkAll = () => {
        const newStatus = tasks.map(task => {
            let newStatus = true
            return { ...task, isChecked: newStatus };
        })
        setTasks(newStatus)
    }
    const changeStatus = (e, id) => {
        console.log(id);

        const newStatus = tasks.map(task => {

            if (task.id === id) {
                let newStatus = !task.isChecked
                return { ...task, isChecked: newStatus };
            }
            return task
        })
        setTasks(newStatus)
    }
    const printData = () => {
        return (
            <>
                <form
                    className={style.form}
                    onSubmit={e => addNewTask(e)}>
                    <InputField
                        value={value}
                        setValue={setValue}
                    />
                    <Button
                        mainClass={"btn"}
                        secondaryClass={"btnAdd"}
                        func={addNewTask}
                    />
                    {messageVisible ? <p style={{ color: "red" }}>{message}</p> : ""}
                </form>
                <ul className={style.tasksList}>
                    {tasks.length !== 0 ? tasks.map((task, i) => {
                        return (
                            <li key={i}>

                                <TaskInput
                                    id={task.id}
                                    name={task.name}
                                    setValue={setValue}
                                    editFunc={editTask}
                                    statusFunc={changeStatus}
                                    isChecked={task.isChecked}
                                    deleteOne={deleteOne}
                                />
                            </li>
                        )
                    }) : (<li><p>Add new task</p></li>)
                    }
                </ul>

                <div className={style.btns}>
                    <button onClick={deleteAllDone}
                        disabled={tasks.length === 0 ? true : false}
                    >
                        <img src={trashIcon} alt="Delete done tasks" /> Delete done
                    </button>
                    <button onClick={checkAll}
                        disabled={tasks.length === 0 ? true : false}
                    >
                        <img src={boxCheckedIcon} alt="Check all tasks" />Check all Tasks
                    </button>
                </div>
            </>
        )
    }
    // useEffect(() => {
    //     printData()
    //     console.log(tasks);
        
    // }, [tasks]);
    return (
        printData()
    )
}

export default Main