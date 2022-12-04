import { useState } from 'react'
const TaskInput = ({ id, name, editFunc}) => {    
    let [changeName, setChangeName] = useState(name)
    return (
        <input
            type="text"
            onChange={(e) => setChangeName(e.target.value)}
            value={changeName} 
            name="item"
            onKeyDown={(event)=>editFunc(event, changeName, id)}
            />
    )
}

export default TaskInput