import {useState, useEffect} from 'react';
import {Redirect} from 'react-router-dom';
import useForm from '../util/useForm';
import checkFieldCompletion, {validateLoginForm} from '../util/formValidation';
import InputField from '../components/InputField/InputField';
import Button from '../components/Button/Button';
import ShortNavBar from '../components/NavBar/ShortNavBar';
import axios from 'axios';
import propsInfo from '../assets/propsinformation.json';

const axiosURL=process.env.REACT_APP_AXIOSURL

function Login () {
    const [values, handleOnChange] = useForm({email:"",password:""})
    const [redirectToRegister, setRedirectToRegister] = useState(false)
    const [redirectToISU, setRedirectToISU] = useState(false)
    const [buttonStatus, setButtonStatus] = useState(true)
    const [validationStatus, setValidationStatus] = useState(null)
    const [validationMsg, setValidationMsg] = useState(null)

    const propsArray = [
        { ...propsInfo.emailLabel, changeFunc:handleOnChange, values:values['email']},
        { ...propsInfo.passwordLabel, changeFunc:handleOnChange, values:values['password']}
    ]

    useEffect(()=> {
        setButtonStatus(checkFieldCompletion(values))
    }, [values])

    useEffect(() => {
        setRedirectToISU(sessionStorage.getItem('JWT-Token'))
    },[])

    const callAxios = () => {
        const userLogin = {
            email: values['email'],
            password: values['password']
        }
      
        axios.post(`${axiosURL}/user/login`,userLogin)
        .then(response => {
            sessionStorage.setItem('JWT-Token', JSON.stringify(response.data.token))
            setTimeout(()=>{
                setRedirectToISU(true)
            },1000)
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

    const login = (event) => {
        event.preventDefault()
        const {status, message} = validateLoginForm(values)
        setValidationStatus(status)
        setValidationMsg(message)
        
        if (status) {
            callAxios()
        }
    }

    return ( 
        <>
        <ShortNavBar />
        <main>
            <h1 className="main-heading">My Web Accountant</h1>
            <section className='section-container'>
                <form>
                    {propsArray.map(oneItem => <InputField key={oneItem.name} fieldData={oneItem} />)}
                </form>
                <div className='button-container'>
                    <Button content="Register" clickFunc={()=>setRedirectToRegister(true)} buttonEnabled={false} />
                    <Button content="Log In" clickFunc={(event)=>login(event)} buttonEnabled={buttonStatus} />
                </div>
            </section>

            {!validationStatus && <p className='validation-message'>{validationMsg}</p>}
            {redirectToISU && <Redirect to='ISU'/>}
            {redirectToRegister && <Redirect to='/register' />}
            
        </main>
        </>
        
    )
}

export default Login;