import {useState, useEffect} from 'react';
import useForm from '../util/useForm';
import {Redirect} from 'react-router-dom';
import ShortNavBar from '../components/NavBar/ShortNavBar';
import InputField from '../components/InputField/InputField';
import Button from '../components/Button/Button';
import propsInfo from '../assets/propsinformation.json';
import checkFieldCompletion, {validateLoginForm, validateRegistrationForm} from '../util/formValidation';
import axios from 'axios';

const axiosURL=process.env.REACT_APP_AXIOSURL

function ForgotPassword () {
    const [values, handleOnChange] = useForm({email:"",verificationCode:"",password:"",confirmPassword:""})
    const [redirectState, setRedirectState] = useState(false)
    const [buttonStatus, setButtonStatus] = useState(true)
    const [requestButtonStatus, setRequestButtonStatus] = useState(true)
    const [validationStatus, setValidationStatus] = useState(true)
    const [validationMsg, setValidationMsg] = useState(null)
    const [getCode, setCode] = useState(false)

    //this is the list of props used to populate the input labels and fields
    const propsArray = [
        { ...propsInfo.emailLabel, changeFunc:handleOnChange, values:values['email']}
    ]
    const propsArrayTwo = [
        { ...propsInfo.verificationCodeLabel, changeFunc:handleOnChange, values:values['verificationCode']},
        { ...propsInfo.passwordLabel, changeFunc:handleOnChange, values:values['password']},
        { ...propsInfo.confirmPasswordLabel, changeFunc:handleOnChange, values:values['confirmPassword']}
    ]
    
    //everytime the value in the input field is updated, check to see if all fields are filled and change the status of the login button from disabled to enabled
    useEffect(()=> {
        setButtonStatus(checkFieldCompletion(values))
        if (values['email'].length !== 0) {
            setRequestButtonStatus(false)
        } else {
            setRequestButtonStatus(true)
        }
    }, [values])

    //this is the axios call to the server to reset the password
    const callAxiosForPasswordReset = () => {
        const verifyAccount = {
            email:values['email'],
            passwordVerificationCode:values['verificationCode'],
            newPassword:values['password'],
            confirmNewPassword:values['confirmPassword']
        }

        axios.patch(`${axiosURL}/user/forgot-password`, verifyAccount)
        .then(response => {
            setValidationMsg(response.data)
            setValidationStatus(false)
            setTimeout(() => {
                setRedirectState(true)
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

    //this is the axios call to the server to request a verification code for password reset
    const callAxiosForResetCode = () => {
        axios.get(`${axiosURL}/user/forgot-password?email=${values['email']}`)
        .then(response => {
            setValidationMsg(response.data)
            setValidationStatus(false)
            setCode(true)
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

    //verify that the email address provided meets certain criteria and checks that the passwords match. if the criteria is good, then make the axios call, otherwise populate the error message.
    const clickPasswordReset = (event) => {
        event.preventDefault()
        const {status, message} = validateRegistrationForm(values)
        setValidationStatus(status)
        setValidationMsg(message)

        if (status) {
            callAxiosForPasswordReset()
        }
    }

    //similar to clickPasswordReset - but only checks email address.
    const clickRequestCode = (event) => {
        event.preventDefault()
        const {status, message} = validateLoginForm(values)
        setValidationStatus(status)
        setValidationMsg(message)
        
        if (status) {
            callAxiosForResetCode()
        }
    }

    return (<>
        <ShortNavBar />
        <main>
            <h1 className="main-heading">Verify your Email</h1>
            <section className='section-container'>
                <form>
                    {propsArray.map( 
                        oneItem => <InputField key={oneItem.name} fieldData={oneItem} />
                    )}
                </form>
                <div className='button-container'>
                    <Button 
                        content="Back to Log In" 
                        clickFunc={
                            () => setRedirectState(true)
                        }
                        buttonEnabled={false} 
                    />
                    <Button 
                        content="Request Password Reset Code" 
                        clickFunc={
                            (event) => clickRequestCode(event)
                        }
                        buttonEnabled={requestButtonStatus} 
                    />
                    {!getCode && (
                        <Button 
                            content="I already have a Reset Code" 
                            clickFunc={
                                () => setCode(true)
                            }
                            buttonEnabled={false} 
                        />
                    )}
                </div>
                {getCode && (
                    <form>
                        {propsArrayTwo.map( 
                            oneItem => <InputField key={oneItem.name} fieldData={oneItem} />
                        )}
                    </form>    
                )}
                {getCode && (
                    <div className='button-container'>
                        <Button 
                            content="Reset Password" 
                            clickFunc={(event) => clickPasswordReset(event)} 
                            buttonEnabled={buttonStatus}
                        />
                    </div>
                )}
            </section>
        </main>

        {/* populates the error message */}
        {!validationStatus && <p className='validation-message'>{validationMsg}</p>}
        {/* redirects back to login page */}
        {redirectState && <Redirect to='/' />}
    </>)
}

export default ForgotPassword;