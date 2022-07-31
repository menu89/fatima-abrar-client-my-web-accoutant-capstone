import './InputField.scss';

function InputField ({fieldData}) {
    const {name, labelText, changeFunc,values,type, componentClasses} = fieldData
    
    return (
        <div className={`${componentClasses}__container`}>
            <label className={`${componentClasses}__label`}>
                {labelText}
                <input 
                    className={`${componentClasses}__field`} 
                    name={name}
                    type={type}
                    placeholder={labelText}
                    onChange={changeFunc}
                    value={values}
                />
            </label>
        </div>
    )
}

export default InputField;