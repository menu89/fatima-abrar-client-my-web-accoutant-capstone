import { useState, useEffect } from "react";
import useForm from "../util/useForm";
import NavBar from "../components/NavBar/NavBar";
import InputField from "../components/InputField/InputField";
import Button from "../components/Button/Button";
import propsInfo from '../assets/propsinformation.json';
import checkFieldCompletion, {validateLoginForm} from '../util/formValidation';
import {Redirect} from 'react-router-dom';
import axios from 'axios';

const axiosURL=process.env.REACT_APP_AXIOSURL

function DeleteUser () {
    const email = JSON.parse(sessionStorage.getItem('email'))
    const [values, handleOnChange] = useForm({email:email, password:""})
    const [buttonStatus, setButtonStatus] = useState(true)
    const [validationStatus, setValidationStatus] = useState(true)
    const [validationMsg, setValidationMsg] = useState(null)
    const [logout, setLogout] = useState(false)

    // this is the list of props used to populate the input labels and fields.
    const propsArray = [
        {...propsInfo.emailLabel, changeFunc:handleOnChange, values:values['email']},
        {...propsInfo.passwordLabel, changeFunc:handleOnChange, values:values['password']}
    ]

    //checks to see if all fields are completed and sets the button status accordingly.
    useEffect(()=> {
        setButtonStatus(checkFieldCompletion(values))
    }, [values])

    //remove token on logout
    const removeToken = () => {
        sessionStorage.removeItem('JWT-Token')
        sessionStorage.removeItem('username')
        sessionStorage.removeItem('email')
        sessionStorage.removeItem('edit-transaction-info')
        sessionStorage.removeItem('edit-transfer-info') 
        setLogout(true)
    }

    //axios function call to reset the password
    const callAxiosToDeleteUser = () => {
        const userCredentials = {
            email:values['email'],
            password:values['password']
        }

        axios.delete(`${axiosURL}/user/single`, {data:userCredentials})
        .then(response => {
            setValidationMsg(response.data)
            setValidationStatus(false)
            setTimeout(() => {removeToken()},1500)
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
    const clickDeleteUser = (event) => {
        event.preventDefault()
        const {status, message} = validateLoginForm(values)
        setValidationStatus(status)
        setValidationMsg(message)

        if (status) {
            callAxiosToDeleteUser()
        }
    }

    return (<>
        <NavBar />
        <main>
            <h1 className="main-heading">My Web Accountant</h1>
            <section className="section-container">
                <h2>Delete My User</h2>
                <p>Please note that deleteing your user will also delete all other information {`(i.e. transactions, transfers, etc)`} permanently. This action cannot be reversed. Are you sure you want to permanently delete your user and all related information?</p>
                <form>
                    {propsArray.map( 
                        oneItem => <InputField key={oneItem.name} fieldData={oneItem} />
                    )}
                </form>
                <div className="button-container">
                    <Button 
                        content="Delete User"
                        clickFunc={(event)=>{clickDeleteUser(event)}}
                        buttonEnabled={buttonStatus}
                    />
                </div>
            </section>
        </main>

        {/* populates the error message */}
        {!validationStatus && <p className='validation-message'>{validationMsg}</p>}
        {logout && <Redirect to='/' />}        
    </>)
}

export default DeleteUser;