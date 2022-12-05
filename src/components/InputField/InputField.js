import style from './input.module.scss'
const InputField = ({ value, setValue }) => {

    return (
        <input
        className={style.newTeskInput}
            type="text"
            onChange={(e) => setValue(e.target.value)}
            value={value} />
    )
}

export default InputField