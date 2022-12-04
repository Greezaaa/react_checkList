import style from './button.module.scss'
const Button = ({ mainClass, 
    secondaryClass, 
    func, 
    text, 
    img }) => {
    return (
        <button
            className={`${style[mainClass]} ${style[secondaryClass]}`}
            onClick={(e) => func(e)}
        >
            {img !== null ? <img src={img} atl={text} />:  text }
        </button>

    )
}

export default Button