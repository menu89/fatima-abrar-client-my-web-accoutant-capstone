import './ResendCode.scss';
import {useState, useEffect} from 'react';
import useForm from '../../util/useForm';
import checkFieldCompletion, {validateLoginForm} from '../../util/formValidation';
import InputField from '../../components/InputField/InputField';
import Button from '../../components/Button/Button';
import propsInfo from '../../assets/propsinformation.json';
import axios from 'axios';

const axiosURL=process.env.REACT_APP_AXIOSURL

function ResendCode ({listFunc}) {
    const [values, handleOnChange] = useForm({email:""})
    const [buttonStatus, setButtonStatus] = useState(true)
    const [validationStatus, setValidationStatus] = useState(true)
    const [validationMsg, setValidationMsg] = useState(null)
    
    //this is the list of props used to populate the input labels and fields
    const propsArray = [
        { ...propsInfo.emailLabel, changeFunc:handleOnChange, values:values['email']}
    ]

    //everytime the value in the input field is updated, check to see if all fields are filled and change the status of the login button from disabled to enabled
    useEffect(()=> {
        setButtonStatus(checkFieldCompletion(values))
    }, [values])

    //this is the axios call to resend the code
    const callAxios = () => {
        axios.get(`${axiosURL}/user/resend-code?email=${values['email']}`)
        .then(response => {
            setValidationMsg(response.data)
            setValidationStatus(false)
            setTimeout(() => {
                listFunc(false)
            },3000)
        })
        .catch((err) => {
            let message = ""
            if (err.response.status === 404) {
                message = err.message
            } else {
                message = err.response.data
            }
            setValidationMsg(message)
            setValidationStatus(false)
        })
    }

    //verify that the email address provided meets certain criteria. if the criteria is good, then make the axios call, otherwise populate the error message.
    const clickSubmit = (event) => {
        event.preventDefault()
        const {status, message} = validateLoginForm(values)
        setValidationStatus(status)
        setValidationMsg(message)

        if (status) {
            callAxios()
        }
    }

    return (<>
        <div className='resend-code-component'>
            <aside>
                <h2 className="main-heading">Request New Code</h2>
                <section className='section-container section-container--small'>
                    <form>
                        {propsArray.map( 
                            oneItem => <InputField key={oneItem.name} fieldData={oneItem} />
                        )}
                    </form>
                    <div className='button-container'>
                            <Button 
                                content="Submit" 
                                clickFunc={(event) => clickSubmit(event)} 
                                buttonEnabled={buttonStatus}
                            />
                            <Button 
                                content="Cancel" 
                                clickFunc={
                                    () => listFunc(false)
                                }
                                buttonEnabled={false} 
                            />
                        </div>
                </section>
            </aside>
        </div>
        {/* populates the error message */}
        {!validationStatus && <p className='validation-message'>{validationMsg}</p>}
    </>)
}

export default ResendCode;