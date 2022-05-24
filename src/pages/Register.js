import '../styles/Register.scss';
import {useState, useEffect} from 'react';
import {Redirect} from 'react-router-dom';
import useForm from '../util/useForm';
import checkFieldCompletion, {validateRegistrationForm} from '../util/formValidation';
import InputField from '../components/InputField/InputField';
import Button from '../components/Button/Button';
import axios from 'axios';

const axiosURL = process.env.REACT_APP_AXIOSURL

function Register () {
    const [values, handleOnChange] = useForm({username:"",email:"",password:"",confirmPassword:""})
    const [redirectState, setRedirectState] = useState(false)
    const [buttonStatus, setButtonStatus] = useState(true)
    const [validationStatus, setValidationStatus] = useState(null)
    const [validationMsg, setValidationMsg] = useState(null)

    const propsArray = [
        { name:'username', labelText: 'User Name', changeFunc:handleOnChange, values:values['username'], type:'text'},
        { name:'email', labelText: "Email", changeFunc:handleOnChange, values:values['email'], type:'text'},
        { name:'password', labelText: "Password", changeFunc:handleOnChange, values:values['password'],type:'password'},
        { name:'confirmPassword', labelText: "Confirm Password", changeFunc:handleOnChange, values:values['confirmPassword'], type:'password'}
    ]

    useEffect(()=> {
        setButtonStatus(checkFieldCompletion(values))
    }, [values])

    const callAxios = () => {
        const newUser = {
            username: values['username'],
            email: values['email'],
            password: values['password'],
            confirmpassword: values['confirmPassword']
        }

        axios.post(`${axiosURL}/user/register`,newUser)
        .then((response) => {
            setValidationMsg(response.data)
            setValidationStatus(false)
            setTimeout(()=>{
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

    const register = (event) => {
        event.preventDefault()
        const {status, message} = validateRegistrationForm(values)
        setValidationStatus(status)
        setValidationMsg(message)
        
        if (status) {
            callAxios()
        }
        
    }

    return (
        <main>
            <h1 className="main-heading">My Web Accountant</h1>
            <form>
                {propsArray.map( 
                    oneItem => <InputField key={oneItem.name} fieldData={oneItem} />
                )}
                            
                <div className='button-container'>
                    <Button 
                        content="Register" 
                        clickFunc={(event) => register(event)} 
                        buttonEnabled={buttonStatus}
                    />
                    <Button 
                        content="Back to Log In" 
                        clickFunc={
                            () => setRedirectState(true)
                        }
                        buttonEnabled={false} 
                    />
                </div>
            </form>
            
            {}
            {!validationStatus && <p>{validationMsg}</p>}
            {redirectState && <Redirect to='/' />}
            <p>.</p>
        </main>
    )
}

export default Register;