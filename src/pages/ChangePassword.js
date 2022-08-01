import { useState, useEffect } from "react";
import useForm from "../util/useForm";
import NavBar from "../components/NavBar/NavBar";
import InputField from "../components/InputField/InputField";
import Button from "../components/Button/Button";
import propsInfo from '../assets/propsinformation.json';
import checkFieldCompletion, {validateRegistrationForm} from "../util/formValidation";
import axios from 'axios';
import { API_URL } from "../config";

const axiosURL= API_URL

function ChangePassword () {
    const email = JSON.parse(sessionStorage.getItem('email'))
    const [values, handleOnChange] = useForm({email:email, oldPassword:"",password:"",confirmPassword:""})
    const [buttonStatus, setButtonStatus] = useState(true)
    const [validationStatus, setValidationStatus] = useState(true)
    const [validationMsg, setValidationMsg] = useState(null)

    // this is the list of props used to populate the input labels and fields.
    const propsArray = [
        {...propsInfo.emailLabel, changeFunc:handleOnChange, values:values['email']},
        {...propsInfo.oldPasswordLabel, changeFunc:handleOnChange, values:values['oldPassword']},
        {...propsInfo.passwordLabel, changeFunc:handleOnChange, values:values['password']},
        {...propsInfo.confirmPasswordLabel, changeFunc:handleOnChange, values: values['confirmPassword']}
    ]

    //checks to see if all fields are completed and sets the button status accordingly.
    useEffect(()=> {
        setButtonStatus(checkFieldCompletion(values))
    }, [values])

    //axios function call to reset the password
    const callAxiosForPasswordReset = () => {
        const verifyAccount = {
            email:values['email'],
            password:values['oldPassword'],
            newPassword:values['password'],
            confirmNewPassword:values['confirmPassword']
        }

        axios.patch(`${axiosURL}/user/change-password`, verifyAccount)
        .then(response => {
            setValidationMsg(response.data)
            setValidationStatus(false)
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

    //checks to see if the fields meet certain criterion and makes the axios call if they do, otherwise it populates an error message.
    const clickPasswordReset = (event) => {
        event.preventDefault()
        const {status, message} = validateRegistrationForm(values)
        setValidationStatus(status)
        setValidationMsg(message)

        if (status) {
            callAxiosForPasswordReset()
        }
    }

    return (<>
        <NavBar />
        <main>
            <h1 className="main-heading">My Web Accountant</h1>
            <section className="section-container section-container--small">
                <h2>Change your password</h2>
                <form>
                    {propsArray.map( 
                        oneItem => <InputField key={oneItem.name} fieldData={oneItem} />
                    )}
                </form>
                <div className="button-container">
                    <Button 
                        content="Change Password"
                        clickFunc={(event)=>{clickPasswordReset(event)}}
                        buttonEnabled={buttonStatus}
                    />
                </div>
            </section>
        </main>

        {/* populates the error message */}
        {!validationStatus && <p className='validation-message'>{validationMsg}</p>}
    </>)
}

export default ChangePassword;