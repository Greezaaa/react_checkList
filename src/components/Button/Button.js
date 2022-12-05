import style from './button.module.scss'
const Button = ({ mainClass,
    secondaryClass,
    func,
    id
}) => {
    return (
        <button
            className={`${style[mainClass]} ${style[secondaryClass]}`}
            onClick={(e) => func(e, id)}
        >
            
        </button>

    )
}

export default Button