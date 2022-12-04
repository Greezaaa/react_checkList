import { useState, useEffect } from 'react'
import addIcon from '../../assets/media/icons/add.svg'
import Button from "../Button/Button"
import InputField from '../InputField/InputField'
import TaskInput from '../TaskInput/TaskInput'


const Main = () => {
    // useStates

    const [value, setValue] = useState("")
    const [tasks, setTasks] = useState([])
    const [message, setMessage] = useState("")
    const [messageVisible, setMessageVisible] = useState(false)
    const [isChecked, setIsChecked] = useState(false)

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
               if(task.id === id) {
                let newName = changeName
                    return {...task, name: newName}
                }
                return task
            })
            setTasks(newName)
        }
    }

    useEffect(() => {
        console.log(tasks); // temporal use
    }, [tasks]);
    return (
        <>

            <form onSubmit={e => addNewTask(e)}>
                <InputField
                    value={value}
                    setValue={setValue}
                />
                <Button
                    mainClass={"btn"}
                    secondaryClass={"btnAdd"}
                    text={"add"}
                    func={addNewTask}
                    img={addIcon}
                />
                {messageVisible ? <p style={{ color: "red" }}>{message}</p> : ""}
            </form>
            <ul>
                {tasks.length !== 0 ? tasks.map((task, i) => {
                    return (
                        <li key={i}>
                            <TaskInput
                                id={task.id}
                                name={task.name}
                                setValue={setValue}
                                editFunc={editTask}
                            />
                        </li>
                    )
                }) : (<li><p>Add new task</p></li>)
                }
            </ul>
        </>
    )
}

export default Main