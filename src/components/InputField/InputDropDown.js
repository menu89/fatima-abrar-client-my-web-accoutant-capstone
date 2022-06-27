import './InputField.scss';
import {v4} from 'uuid';

function InputDropDown ({fieldData}) {
    const {name, labelText,values,changeFunc,options, componentClasses, componentClassesTwo} = fieldData
    return (
        <div className={`${componentClasses}__contianer`}>
            <label className={`${componentClasses}__label`}>
                {labelText}
                <select 
                    className={`${componentClasses}__field ${componentClassesTwo}`}
                    name={name}
                    onChange={changeFunc}
                    value={values}
                >
                    <option value=''></option>
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