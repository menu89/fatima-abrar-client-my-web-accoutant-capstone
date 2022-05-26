import {useState} from 'react';

function useForm (inputValues) {
    const [values, setValues] = useState(inputValues);

    return [
        values,
        (event) => {
            setValues({
                ...values,
                [event.target.name]: event.target.value
            })
        }
    ]
}

export default useForm;