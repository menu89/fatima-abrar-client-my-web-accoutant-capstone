import './InputField.scss';

function InputField ({fieldData}) {
    const {name, labelText, changeFunc,values} = fieldData
    
    return (
        <div className='input__container'>
            <label className='input__label'>
                {labelText}
                <input 
                    className='input__field' 
                    name={name}
                    type='text'
                    placeholder={name}
                    onChange={changeFunc}
                    value={values}
                />
            </label>
        </div>
    )
}

export default InputField;