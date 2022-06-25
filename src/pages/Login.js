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

    //this is the list of props used to populate the input labels and fields
    const propsArray = [
        { ...propsInfo.emailLabel, changeFunc:handleOnChange, values:values['email']},
        { ...propsInfo.passwordLabel, changeFunc:handleOnChange, values:values['password']}
    ]

    //everytime the value in the input field is updated, check to see if all fields are filled and change the status of the login button from disabled to enabled
    useEffect(()=> {
        setButtonStatus(checkFieldCompletion(values))
    }, [values])

    //checks to see if there is JWT token stored in session history. If one is saved, then automatically goes onto the next relevant page.
    useEffect(() => {
        setRedirectToISU(sessionStorage.getItem('JWT-Token'))
    },[])

    //this is the axios call to the server to login and get the token
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
        //if the acios call fails, then a one line sentence populates at the bottom of the page stating why there was a problem.
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

    //when the log in button is clicked, the format of the fields is checked and if they match certain conditions, then an axios call to server is made. otherwise it populates an error at the bottom of the page.
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

            {/* populates the error message */}
            {!validationStatus && <p className='validation-message'>{validationMsg}</p>}
            {/* redirects to the next page if log in is successful*/}
            {redirectToISU && <Redirect to='ISU'/>}
            {/* redirects to register page if 'register' button is clicked */}
            {redirectToRegister && <Redirect to='/register' />}
            
        </main>
        </>
        
    )
}

export default Login;