import './InputField.scss';

function InputField ({fieldData}) {
    const {name, labelText, changeFunc,values,type} = fieldData
    
    return (
        <div className='input__container'>
            <label className='input__label'>
                {labelText}
                <input 
                    className='input__field' 
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