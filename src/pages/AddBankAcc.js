import {useState, useEffect} from 'react';
import {Redirect} from 'react-router-dom';
import useForm from '../util/useForm';
import checkFieldCompletion, {validateBankInfo} from '../util/formValidation';
import InputField from '../components/InputField/InputField';
import InputDropDown from '../components/InputField/InputDropDown';
import Button from '../components/Button/Button';
import axios from 'axios';

const axiosURL=process.env.REACT_APP_AXIOSURL

function AddBankAcc() {
    const [values, handleOnChange] = useForm({acc_des:"",amount:"",acc_type:'chequeing'})
    const [redirectToISU, setRedirectToISU] = useState(false)
    const [buttonStatus, setButtonStatus] = useState(true)
    const [validationStatus, setValidationStatus] = useState(null)
    const [validationMsg, setValidationMsg] = useState(null)

    const optionArray =[
        {name:'acc_type', labelText: 'Account Type',values:values['acc_type'],changeFunc:handleOnChange, options:['chequeing','credit-card','line-of-credit']}
    ]

    const propsArray = [
        { name:'acc_des', labelText: "Account Description", changeFunc:handleOnChange, values:values['acc_des'], type:'text'},
        { name:'amount', labelText: "Amount", changeFunc:handleOnChange, values:values['amount'],type:'text'}
    ]

    useEffect(()=> {
        setButtonStatus(checkFieldCompletion(values))
    }, [values])

    const callAxios = () => {
        const token = JSON.parse(sessionStorage.getItem('JWT-Token'))

        const isuInfo = {
            accType:values['acc_type'],
            accDesc:values['acc_des'],
            amount:values['amount']
        }
        axios.post(`${axiosURL}/user/initial-set-up`,isuInfo, {headers: {
            "Content-type": "application/json",
            'authorization': `Bearer ${token}`
        }})
        .then(response => {
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

    const addAccFunc = (event) => {
        event.preventDefault()
        const {status, message} = validateBankInfo(values)
        setValidationStatus(status)
        setValidationMsg(message)
        if (status) {
            callAxios()
        }
    }

    return(
        <main>
            <h1 className="main-heading">My Web Accountant</h1>
            <form>
                <InputDropDown fieldData={optionArray[0]} />
                {propsArray.map(oneItem => <InputField key={oneItem.name} fieldData={oneItem} />)}
                <div className='button-container'>
                    <Button content="Add Account" clickFunc={(event)=>{addAccFunc(event)}} buttonEnabled={buttonStatus} />
                    <Button content="Cancel" clickFunc={()=>{setRedirectToISU(true)}} buttonEnabled={false} />
                </div>
            </form>

            {!validationStatus && <p>{validationMsg}</p>}
            {redirectToISU && <Redirect to='ISU'/>}
            <p>.</p>
        </main>
    )
}

export default AddBankAcc;