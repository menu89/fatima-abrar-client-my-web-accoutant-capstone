import {useState, useEffect} from 'react';
import useForm from '../util/useForm';
import {Redirect} from 'react-router-dom';
import ShortNavBar from '../components/NavBar/ShortNavBar';
import InputField from '../components/InputField/InputField';
import Button from '../components/Button/Button';
import ResendCode from '../components/ResendCode/ResendCode';
import propsInfo from '../assets/propsinformation.json';
import checkFieldCompletion, {validateLoginForm} from '../util/formValidation';
import axios from 'axios';

const axiosURL=process.env.REACT_APP_AXIOSURL

function VerifyEmail() {
    const [values, handleOnChange] = useForm({email:"",verificationCode:""})
    const [redirectState, setRedirectState] = useState(false)
    const [buttonStatus, setButtonStatus] = useState(true)
    const [validationStatus, setValidationStatus] = useState(true)
    const [validationMsg, setValidationMsg] = useState(null)
    const [getNewCode, setNewCode] = useState(false)

    //this is the list of props used to populate the input labels and fields
    const propsArray = [
        { ...propsInfo.emailLabel, changeFunc:handleOnChange, values:values['email']},
        { ...propsInfo.verificationCodeLabel, changeFunc:handleOnChange, values:values['verificationCode']}
    ]
    
    //everytime the value in the input field is updated, check to see if all fields are filled and change the status of the submit button from disabled to enabled
    useEffect(()=> {
        setButtonStatus(checkFieldCompletion(values))
    }, [values])

    //this is the axios call to the server to verify the email address.
    const callAxios = () => {
        const verifyAccount = {
            email:values['email'],
            verificationCode:values['verificationCode']
        }

        axios.post(`${axiosURL}/user/verify-email`, verifyAccount)
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

    //verify that the email address provided meets certain criteria. if the criteria is good, then make the axios call, otherwise populate the error message.
    const verifyEmailEvent = (event) => {
        event.preventDefault()
        const {status, message} = validateLoginForm(values)
        setValidationStatus(status)
        setValidationMsg(message)

        if (status) {
            callAxios()
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
                            content="Submit" 
                            clickFunc={(event) => verifyEmailEvent(event)} 
                            buttonEnabled={buttonStatus}
                        />
                        <Button 
                            content="Back to Log In" 
                            clickFunc={
                                () => setRedirectState(true)
                            }
                            buttonEnabled={false} 
                        />
                        <Button 
                            content="Request New Code" 
                            clickFunc={
                                () => setNewCode(true)
                            }
                            buttonEnabled={false} 
                        />
                    </div>
            </section>
        </main>

        {/* populates the error message */}
        {!validationStatus && <p className='validation-message'>{validationMsg}</p>}
        {/* redirects back to login page */}
        {redirectState && <Redirect to='/' />}
        {/* opens a new component to resend the email verification code */}
        {getNewCode && <ResendCode listFunc={setNewCode} />}
    </>)
}

export default VerifyEmail;