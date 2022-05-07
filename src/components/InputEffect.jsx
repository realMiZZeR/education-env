

const InputEffect = ({name, value, handler, type, placeholder, checked}) => {
    return (
        <label htmlFor={name} className='input-effect'>
            <input 
            name={name}
            value={value} 
            onChange={handler}
            type={type} 
            className='input-effect__input input' 
            placeholder='&nbsp;'
            defaultChecked={checked} />
            <span>{placeholder}</span>
        </label>
    )
}

export default InputEffect;