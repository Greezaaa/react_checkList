import { useState } from 'react'
import Button from '../Button/Button'
import style from './task.module.scss'
const TaskInput = ({ id, name, isChecked, editFunc, statusFunc, deleteOne }) => {
    let [changeName, setChangeName] = useState(name)
    return (

        <div className={style.task}>
            <Button
                mainClass={"taskBtn"}
                secondaryClass={isChecked ? "taskboxChecked" : "taskbox"}
                func={statusFunc}
                id={id}
                />
            <input
                type="text"
                className={isChecked ? `${style.task} ${style.taskIsDone}` : `${style.task} `}
                onChange={(e) => setChangeName(e.target.value)}
                value={changeName}
                name="item"
                onKeyDown={(event) => editFunc(event, changeName, id)}
            />
            <Button
                mainClass={"trashBtn"}
                secondaryClass={isChecked ? "trashMe" : ""}
                func={deleteOne}
                id={id}
                />
        </div>
    )
}

export default TaskInput