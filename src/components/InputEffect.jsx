

const InputEffect = ({name, value, handler, type, placeholder, checked, isError}) => {
    return (
        <label htmlFor={name} className='input-effect'>
            <input 
            name={name}
            value={value} 
            onChange={handler}
            type={type} 
            className={`input-effect__input input ${isError ? 'input_error' : ''}`} 
            placeholder='&nbsp;'
            defaultChecked={checked} />
            <span>{placeholder}</span>
        </label>
    )
}

export default InputEffect;