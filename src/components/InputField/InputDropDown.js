import './InputField.scss';
import {v4} from 'uuid';

function InputDropDown ({fieldData}) {
    const {name, labelText,values,changeFunc,options} = fieldData
    return (
        <div className='input__contianer'>
            <label className='input__label'>
                {labelText}
                <select 
                    className='input__field'
                    name={name}
                    onChange={changeFunc}
                    value={values}
                >
                    {options.map(oneOption => {
                        return <option 
                            key={v4()}
                            value={oneOption}
                        >
                            {oneOption}
                        </option>
                    })}

                </select>
            </label>

        </div>
    )
}

export default InputDropDown