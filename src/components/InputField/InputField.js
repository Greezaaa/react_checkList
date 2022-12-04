
const InputField = ({ value, setValue }) => {

    return (
        <input
            type="text"
            onChange={(e) => setValue(e.target.value)}
            value={value} />
    )
}

export default InputField